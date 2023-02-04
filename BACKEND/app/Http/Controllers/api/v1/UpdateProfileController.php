<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UpdateProfileController extends Controller
{
    public function updateProfile(UpdateUserRequest $request){

        $user=User::find(Auth::user()->id);
        $user->update($request->all());
        return User::find($user->id);
    }
}
