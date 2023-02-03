<?php

use App\Http\Controllers\api\v1\ActualityController;
use App\Http\Controllers\api\v1\ClubController;
use App\Http\Controllers\api\v1\EvenementController;
use App\Http\Controllers\api\v1\SalleController;
use App\Http\Controllers\api\v1\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
Route::post('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::group(['prefix'=>'v1','middleware'=>'auth:sanctum','namespace'=>'App\Http\Controllers\api\v1'],function (){
    Route::apiResource('users',UserController::class);
    Route::apiResource('clubs',ClubController::class);
    Route::apiResource('salles',SalleController::class);
    Route::apiResource('events',EvenementController::class);
    Route::apiResource('actualities',ActualityController::class);

});
