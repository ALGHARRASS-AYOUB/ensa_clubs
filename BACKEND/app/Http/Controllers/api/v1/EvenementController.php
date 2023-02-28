<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\EvenementFilter;
use App\Http\Requests\StoreEvenementRequest;
use App\Http\Requests\UpdateEvenementRequest;
use App\Http\Resources\api\v1\EvenementCollection;
use App\Http\Resources\api\v1\EvenementResource;
use App\Models\Club;
use App\Models\Evenement;
use App\Models\Salle;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EvenementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request )
    {
        $filter=new EvenementFilter();
        $queryItems=$filter->transform($request);
        $includeSalle=$request->query('includeSalle');

        if(count($queryItems)==0){
            $events= ($includeSalle)?Evenement::with(['salles','club'])->paginate():Evenement::paginate();
            return  new EvenementCollection($events);
        }
        else{
            $events= ($includeSalle)?Evenement::with(['salles','club'])->where($queryItems)->paginate():Evenement::where($queryItems)->paginate();
            return  new EvenementCollection($events->appends($request->query()));
        }
    }

    public function clubEvents(Request $request )
    {
        $club=Club::where('user_id',Auth::id())->first();
//     return $club->id;
        $filter=new EvenementFilter();
        $queryItems=$filter->transform($request);
        $includeSalle=$request->query('includeSalle');

        if(count($queryItems)==0){
            $events= ($includeSalle)?Evenement::with(['salles','club'])->where('club_id',$club->id)->paginate():Evenement::where('club_id',$club->id)->paginate();
            return  new EvenementCollection($events);
        }
        else{
            $events= ($includeSalle)?Evenement::with(['salles','club'])->where('club_id',$club->id)->where($queryItems)->paginate():Evenement::where('club_id',$club->id)->where($queryItems)->paginate();
            return  new EvenementCollection($events->appends($request->query()));
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEvenementRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEvenementRequest $request)
    {
        $sc=new SalleController();
        $sc->sallesUpdateReservationStatus();
        if(!Auth::check() || Auth::user()->role!='president')
            response()->json(['data'=>'only authenticated clubs could create events']);

        try {
            $image=null;
            //storing in the local folder app/storage/public/logos and app/storage/public/files
            if($request->hasFile('image')){
                $imageName=time().'.'.$request->file('image')->getClientOriginalExtension();
                $imageLocalPath=$request->file('image')->storeAs('/public/images',$imageName);
                $image=Storage::url($imageLocalPath);
            }

        }catch (Exception $e){
            return response()->json('failed to download');
        }
        $user_id=Auth::user()->id;
        $club=Club::where('user_id',$user_id)->first();
        if($club==null)
            return response()->json(['message'=>'this user has no club to post for events']);

        $eventToStore=[
            'name'=>$request->name,
            'image'=>$image ,
            'description'=>$request->description,
            'date_event'=>$request->startAt,
            'isApprouved'=>false,
            'club_id'=>$club->id,

        ];
        $e=Evenement::create($eventToStore);
        if($request->has('salles') && $request->salles!=null){

            $salles_str=str_replace(['[',']'],'',$request->salles);
            $salles=explode(',',$salles_str);

//            $e->salles()->attach($request->salles,[
//                'start_at'=>$request->startAt,
//                'end_at'=>$request->endAt,
//            ]);
            foreach ($salles as $salle_id){
                $salle=Salle::where('id',$salle_id)->first();
                //check disponibilty
                if($salle->isDisponible=0 )
                    return response()->json(['message'=>'the salle'.$salle->name.' not disponible']);
                //check if reserved
                if( $salle->isReserved=1)
                    return response()->json(['message'=>'the salle'.$salle->name.' is reserved']);
            $e->salles()->attach($salle_id,[
                'start_at'=>$request->startAt,
                'end_at'=>$request->endAt,
            ]);
            $this->changeSalleToReserved($salle_id);
            }
        }
        return new EvenementResource($e);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Evenement  $evenement
     * @return \Illuminate\Http\Response
     */
    public function show(Evenement $evenement)
    {
        $e=Evenement::findOrFail($evenement->id);
        return new EvenementResource($e);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEvenementRequest  $request
     * @param  \App\Models\Evenement  $evenement
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEvenementRequest $request, Evenement $evenement)
    {


        //$evenement=Evenement::where('id',$id)->first();
        if(!Auth::check() || Auth::user()->role!='president'){
            response()->json(['data'=>'only authenticated clubs could create events']);
            if(Auth::user()->id!=$evenement->club()->user_id)
                response()->json(['data'=>'not authorized']);

        }
            $image=null;
        try {
            //updating in the local folder app/storage/public/logos and app/storage/public/files
            if($request->hasFile('image')){
                $imageIn=trim(str_replace('/storage/','',$evenement->image));
                if(Storage::has('public/'.$imageIn))
                    Storage::delete('public/'.$imageIn);
                $imageName=time().'.'.$request->file('image')->getClientOriginalExtension();
                $imageLocalPath=$request->file('image')->storeAs('/public/images',$imageName);
                $image=Storage::url($imageLocalPath);
            }

        }catch (Exception $e){
            return response()->json('failed to download');
        }

        $user_id=Auth::user()->id;
        $club=Club::where('user_id',$user_id)->first();
        if($club==null)
            return response()->json(['message'=>'this user has no club to post for events']);

        $eventToUpdate=[
            'name'=>$request->name??$evenement->name,
            'image'=>$image ?? $evenement->image,
            'description'=>$request->description??$evenement->description,
            'date_event'=>$request->startAt??$evenement->date_event,
        ];
        $evenement->update($eventToUpdate);

        if($request->has('salles') && $request->salles!=null){
            foreach ($evenement->salles as $s){
                $this->changeSalleToNotReserved($s->id);
            }
            $salles_str=str_replace(['[',']'],'',$request->salles);
            $salles=explode(',',$salles_str);

//            $e->salles()->attach($request->salles,[
//                'start_at'=>$request->startAt,
//                'end_at'=>$request->endAt,
//            ]);
            $startDate= $evenement->salles()->first()->pivot->start_at;
            $endDate= $evenement->salles()->first()->pivot->end_at;
            $e=Evenement::where('id',$evenement->id)->first();

                foreach ($salles as $salle_id){
                $salle=Salle::where('id',$salle_id)->first();
                    if($salle->isDisponible=0 )
                        return response()->json(['message'=>'the salle'.$salle->name.' not disponible']);
                    //check if reserved
                    if( $salle->isReserved=1)
                        return response()->json(['message'=>'the salle'.$salle->name.' is reserved']);

                $this->changeSalleToReserved($salle_id);
            }
            $e->salles()->syncWithPivotValues($salles,[
                'start_at'=>$request->startAt??$startDate,
                'end_at'=>$request->endAt??$endDate,
            ]);
        }
        return new EvenementResource($e);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Evenement  $evenement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Evenement $evenement)
    {

        if(!Auth::check()){
            return response()->json()->setData(['error'=>'NOT AUTHENTICATED']);
//            if(Auth::user()->id!=$evenement->club()->user_id)
//                response()->json(['data'=>'not authorized']);
        }
        if(Auth::user()->role!='admin' && Auth::user()->role!='president' && Auth::user()->id!=$evenement->club()->user_id  )
            return response()->json()->setData(['error'=>'NOT AUTHAURIZED']);

        $image=trim(str_replace('/storage/','',$evenement->image));
        if(Storage::has('public/'.$image))
            Storage::delete('public/'.$image);
        foreach ($evenement->salles as $s){
            $this->changeSalleToNotReserved($s->id);
        }
        $evenement->salles()->detach();
        $evenement->delete();

        return true;
    }

    private function changeSalleToNotReserved(int $id)
    {
        $salleToUpdate=Salle::where('id',$id)->first();
        $salleToUpdate->update(['isReserved'=>false]);
    }

    public function approuveEvent($id){
            if(auth()->user()->role!='admin')
                return response()->json()->setData(['error'=>'unauthorized']);
            $eventToUpdate=Evenement::findOrFail($id);
            $eventToUpdate->update(['isApprouved'=>($eventToUpdate->isApprouved=='1')?false:true]);
            return new EvenementResource(Evenement::findOrFail($eventToUpdate->id));

    }


    private function changeSalleToReserved(int $id)
    {
        $salleToUpdate=Salle::where('id',$id)->first();
        $salleToUpdate->update(['isReserved'=>true]);
    }

}
