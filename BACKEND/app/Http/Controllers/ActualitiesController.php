<?php

namespace App\Http\Controllers;

use App\Models\Actualities;
use App\Http\Requests\StoreActualitiesRequest;
use App\Http\Requests\UpdateActualitiesRequest;

class ActualitiesController extends Controller
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
     * @param  \App\Http\Requests\StoreActualitiesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreActualitiesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Actualities  $actualities
     * @return \Illuminate\Http\Response
     */
    public function show(Actualities $actualities)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Actualities  $actualities
     * @return \Illuminate\Http\Response
     */
    public function edit(Actualities $actualities)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateActualitiesRequest  $request
     * @param  \App\Models\Actualities  $actualities
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateActualitiesRequest $request, Actualities $actualities)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Actualities  $actualities
     * @return \Illuminate\Http\Response
     */
    public function destroy(Actualities $actualities)
    {
        //
    }
}
