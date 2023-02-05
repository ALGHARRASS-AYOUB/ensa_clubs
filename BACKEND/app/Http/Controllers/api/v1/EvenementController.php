<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\EvenementFilter;
use App\Http\Requests\StoreEvenementRequest;
use App\Http\Requests\UpdateEvenementRequest;
use App\Http\Resources\api\v1\EvenementCollection;
use App\Http\Resources\api\v1\EvenementResource;
use App\Models\Evenement;
use Illuminate\Http\Request;

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEvenementRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEvenementRequest $request)
    {
        //
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

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Evenement  $evenement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Evenement $evenement)
    {
        $file=trim(str_replace('/storage/','',$evenement->bureau_members_file));
        $logo=trim(str_replace('/storage/','',$evenement->logo));
        //dd('/storage/app/'.$file,'/storage/app/'.$logo);
        if(Storage::has('public/'.$logo))
            Storage::delete('public/'.$logo);
        Storage::delete('public/'.$file);
        if($evenement->club()->user_id==auth()->user()->id || auth()->user()->role=='admin')
            $evenement->delete();
        else
            return response()->json(['error' => 'Not authorized.'],403);
        return true;
    }
}
