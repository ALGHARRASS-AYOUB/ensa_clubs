<?php

namespace App\Http\Controllers;

use App\Http\Controllers\api\v1\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\api\v1\AuthResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return abort('403','Unauthorized');
        }
        $user=auth('sanctum')->user();
        $tokenOptions=[
            'name'=>'',
            'abilities'=>[],
            'dateExpiration'=>null
        ];
        if($user->role=='admin'){
            $tokenOptions['name']='adminToken';
            $tokenOptions['abilities']=['read','create','update','delete'];
            //$tokenOptions['dateExpiration=1;
            $token = $user->createToken($tokenOptions['name']);
            $token_plain_text=$token->plainTextToken;
        }

        if($user->role=='president'){
            $tokenOptions['name']='token';
            $tokenOptions['abilities']=['read'];
            //$tokenOptions['dateExpiration=1;
            $token = $user->createToken($tokenOptions['name'],  $tokenOptions['abilities'],$tokenOptions['dateExpiration']);
            $token_plain_text=$token->plainTextToken;
        }

        return new AuthResource(['userInfo'=>$user, 'tokenName'=>$tokenOptions['name'],'token'=>$token_plain_text]);
    }




    public function register(StoreUserRequest $request){

        $user=new User();
        $user->first_name=$request->firstName;
        $user->last_name=$request->lastName;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);
        $user->created_at=$user->updated_at =Carbon::now();
        $user->role=$request->role;
        $user->save();
        $tokenOptions=[
            'name'=>'',
            'abilities'=>[],
            'dateExpiration'=>null
        ];
        if($user->role=='admin'){
            $tokenOptions['name']='adminToken';
            $tokenOptions['abilities']=['read'];
            //$tokenOptions['dateExpiration=1;
            $token = $user->createToken($tokenOptions['name']);
            $token_plain_text=$token->plainTextToken;
        }

        if($user->role=='president'){
            $tokenOptions['name']='token';
            $tokenOptions['abilities']=['read','create','update'];
            //$tokenOptions['dateExpiration=1;
            $token = $user->createToken($tokenOptions['name'],  $tokenOptions['abilities'],$tokenOptions['dateExpiration']);
            $token_plain_text=$token->plainTextToken;
        }
//     return ([
//            'user'=>$user,
//            $tokenOptions['name']=>$token_plain_text,
//        ]);
        return new AuthResource(['userInfo'=>$user, 'tokenName'=>$tokenOptions['name'],'token'=>$token_plain_text]);
    }

    public function logout(){
        auth('sanctum')->user()->tokens()->delete();
        return 'logged out succesfully';
    }
}
