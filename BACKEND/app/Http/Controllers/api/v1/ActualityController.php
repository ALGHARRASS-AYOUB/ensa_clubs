<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Requests\StoreactualityRequest;
use App\Http\Requests\UpdateactualityRequest;
use App\Models\actuality;

class ActualityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        //
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
