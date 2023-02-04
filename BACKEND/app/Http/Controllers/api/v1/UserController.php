<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\UserFilter;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\api\v1\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
      public function index(Request $request )
      {
          if(auth()->user()->role!='admin')
              return response()->json()->setData(['error'=>'unauthorized']);

          $filter=new UserFilter();
          $queryItems=$filter->transform($request);

          if(count($queryItems)==0){
              $users= User::paginate();
              return  new UserCollection($users);
          }
          else{
              $users= User::where($queryItems)->paginate();
              return  new UserCollection($users);
          }
      }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if(auth()->user()->role!='admin')
            return response()->json()->setData(['error'=>'unauthorized']);
            $user->update($request->all());
            return User::find($user->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
