<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\ActualityFilter;
use App\Http\Requests\StoreactualityRequest;
use App\Http\Requests\UpdateactualityRequest;
use App\Http\Resources\api\v1\ActualityCollection;
use App\Http\Resources\api\v1\ActualityResource;
use App\Models\Actuality;
use App\Models\Evenement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ActualityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request )
    {
        $filter=new ActualityFilter();
        $queryItems=$filter->transform($request);
        $includeEvent=$request->query('includeEvent');

        if(count($queryItems)==0){
            $actualities= ($includeEvent)?Actuality::with('evenement')->latest('created_at')->paginate():Actuality::latest('created_at')->paginate();
            return  new ActualityCollection($actualities);
        }
        else{
            $actualities= ($includeEvent)?Actuality::with('evenement')->where($queryItems)->paginate():Actuality::where($queryItems)->paginate();
            return  new ClubCollection($actualities->appends($request->query()));
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreactualityRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreactualityRequest $request)
    {
        if(Auth::user()->role!='admin')
            return response()->json(['error' => 'Not authorized.'],403);
        $image=null;
        $actualityToStore=null;
        try {

            if($request->hasFile('image')){
                $imageName=time().'.'.$request->file('image')->getClientOriginalExtension();
                $imageLocalPath=$request->file('image')->storeAs('/public/images',$imageName);
//                $image=env('APP_URL').Storage::url($logoLocalPath);
                $image=Storage::url($imageLocalPath);
            }

            if($request->has('evenementId')){
                $event=Evenement::findOrFail($request->evenementId);
                if($event->isApprouved=0)
                    return response()->json(['message'=>'the event you have choosen for this actuality is not approuved, you must approuve it first']);

                return new ActualityResource(Actuality::create(['evenement_id'=>$request->evenementId]));

            }else{
                $actualityToStore=[
                    'title'=>$request->title,
                    'body'=>$request->body,
                    'image'=>$image,
                    'start_at'=>$request->startAt,
                    'end_at'=>$request->endAt,
                ];
            }
            return new ActualityResource(Actuality::create($actualityToStore));

        }catch (Exception $e){
            return response()->json('failed to download');
        }
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Actuality  $actuality
     * @return \Illuminate\Http\Response
     */
    public function show(Actuality $actuality)
    {
        $a=Actuality::with('evenement')->findOrFail($actuality->id);
        return new ActualityResource($a);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateactualityRequest  $request
     * @param  \App\Models\Actuality  $actuality
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateactualityRequest $request, Actuality $actuality)
    {
        if(Auth::user()->role!='admin')
            return response()->json(['error' => 'Not authorized.'],403);
        if($request->hasFile('image')){
            $imageIn=trim(str_replace('/storage/','',$actuality->image));
            //dd('/storage/app/'.$file,'/storage/app/'.$logo);
            if(Storage::has('public/'.$imageIn))
                Storage::delete('public/'.$imageIn);

            $imageName=time().'.'.$request->file('image')->getClientOriginalExtension();
            $imageLocalPath=$request->file('images')->storeAs('/public/images',$imageName);
            $image=Storage::url($imageLocalPath);
            $request->image=$image;
        }

        $actuality->update($request->all());
        return new ActualityResource($actuality);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Actuality  $actuality
     * @return \Illuminate\Http\Response
     */
    public function destroy(Actuality $actuality)
    {
        if(Auth::user()->role!='admin')
            return response()->json(['error' => 'Not authorized.'],403);

        $image=trim(str_replace('/storage/','',$actuality->image));
        if(Storage::has('public/'.$image))
            Storage::delete('public/'.$image);
        $actuality->delete();
        return true;
    }

    public function getActualitiesToPost(){
    //this actualities may be within an evenemnet or without (indepedante) . the evenements also must be approuved by the admin.
        $actualities=Actuality::with('evenement')->where('end_at','>',now())->latest('created_at')->get();
        return new ActualityCollection($actualities);
    }


    private function isOld($id):bool{
        $actuality=Actuality::findOrFail($id);
        if($actuality->end_at<now())
            return true;
        else
            return false;
    }
}
