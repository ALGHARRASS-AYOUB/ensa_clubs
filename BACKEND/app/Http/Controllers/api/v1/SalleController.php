<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\SalleFilter;
use App\Http\Requests\StoreSalleRequest;
use App\Http\Requests\UpdateSalleRequest;
use App\Http\Resources\api\v1\SalleCollection;
use App\Http\Resources\api\v1\SalleResource;
use App\Models\Salle;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request )
    {
        sallesUpdateReservationStatus();
        $filter=new SalleFilter();
        $queryItems=$filter->transform($request);
        $includeEvenement=$request->query('includeEvenement');

        if(count($queryItems)==0){
            $salles= ($includeEvenement)?Salle::with('evenements')->paginate():Salle::paginate();
            return  new SalleCollection($salles);
        }
        else{
            $salles= ($includeEvenement)?Salle::with('evenements')->where($queryItems)->paginate():Salle::where($queryItems)->paginate();
            return  new SalleCollection($salles->appends($request->query()));
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSalleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSalleRequest $request)
    {
        if(auth()->user()->role!='admin')
            return response()->json()->setData(['error'=>'unauthorized']);
       return new SalleResource(Salle::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Salle  $salle
     * @return \Illuminate\Http\Response
     */
    public function show(Salle $salle)
    {
        $salle=Salle::findOrFail($salle->id);
        return new SalleResource($salle);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSalleRequest  $request
     * @param  \App\Models\Salle  $salle
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSalleRequest $request, Salle $salle)
    {
        if(auth()->user()->role!='admin')
            return response()->json()->setData(['error'=>'unauthorized']);
        $salleToUpdate=Salle::findOrFail($salle->id);
        $salleToUpdate->update($request->all());
        return new SalleResource(Salle::findOrFail($salleToUpdate->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Salle  $salle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Salle $salle)
    {
        if(auth()->user()->role!='admin')
            return response()->json()->setData(['error'=>'unauthorized']);

        $salle->delete();
        return response()->json()->setData(['res'=>true]);
    }

    public function changeDisponibility($id)
    {
        if(auth()->user()->role!='admin')
            return response()->json()->setData(['error'=>'unauthorized']);
        $salleToUpdate=Salle::findOrFail($id);
        if($salleToUpdate->isDisponible==0){
            if($this->isReservedNow($id)){
                return  response()->json(['message'=>'you can not change the disponiblity of this salle because it is reserved, check events' ]);
            }
        }
        $salleToUpdate->update(['isDisponible'=>($salleToUpdate->isDisponible=='1')?false:true]);
        return new SalleResource(Salle::findOrFail($salleToUpdate->id));
    }

    private function isReservedNow($id):bool{
        $salle=Salle::where('id',$id)->first();
        $endDate=Carbon::make($salle->evenements()->first()->pivot->start_at);
        if($endDate>now())
            return false;
        else
            return true;
    }

    public function sallesUpdateReservationStatus(){
        $salles=Salle::all();
        foreach ($salles as $salle){
            if($this->isReservedNow($salle->id)){
                $salle->update(['isReserved'=>true]);
            }else{
                $salle->update(['isReserved'=>false]);
            }

        }
    }
}
