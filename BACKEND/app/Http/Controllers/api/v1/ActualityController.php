<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\ActualityFilter;
use App\Http\Requests\StoreactualityRequest;
use App\Http\Requests\UpdateactualityRequest;
use App\Http\Resources\api\v1\ActualityCollection;
use App\Http\Resources\api\v1\ActualityResource;
use App\Models\Actuality;
use Illuminate\Http\Request;

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
            $actualities= ($includeEvent)?Actuality::with('evenement')->paginate():Actuality::paginate();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\actuality  $actuality
     * @return \Illuminate\Http\Response
     */
    public function show(actuality $actuality)
    {
        $a=Actuality::with('evenement')->findOrFail($actuality->id);
        return new ActualityResource($a);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\actuality  $actuality
     * @return \Illuminate\Http\Response
     */
    public function edit(actuality $actuality)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateactualityRequest  $request
     * @param  \App\Models\actuality  $actuality
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateactualityRequest $request, actuality $actuality)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\actuality  $actuality
     * @return \Illuminate\Http\Response
     */
    public function destroy(actuality $actuality)
    {
        //
    }
}
