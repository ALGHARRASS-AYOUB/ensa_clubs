<?php

use App\Http\Controllers\api\v1\ActualityController;
use App\Http\Controllers\api\v1\ClubController;
use App\Http\Controllers\api\v1\ConversationController;
use App\Http\Controllers\api\v1\EvenementController;
use App\Http\Controllers\api\v1\SalleController;
use App\Http\Controllers\api\v1\UpdateProfileController;
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
Route::group(['prefix'=>'v1','namespace'=>'App\Http\Controllers\api\v1'],function (){

    Route::apiResource('evenements',EvenementController::class);
    Route::post('evenements',[EvenementController::class,'store'])->middleware('auth:sanctum');
    Route::put('evenements/{evenement}',[EvenementController::class,'update'])->middleware('auth:sanctum');
    Route::patch('evenements/{evenement}',[EvenementController::class,'update'])->middleware('auth:sanctum');
    Route::delete('evenements/{evenement}',[EvenementController::class,'destroy'])->middleware('auth:sanctum');
    Route::get('myEvents/evenements/',[EvenementController::class,'clubEvents'])->middleware('auth:sanctum');
    Route::patch('evenements/changeApprouvement/{id}',[EvenementController::class,'ApprouveEvent'])->middleware('auth:sanctum');

    Route::apiResource('actualities',ActualityController::class);
    Route::post('actualities',[ActualityController::class,'store'])->middleware('auth:sanctum');
    Route::put('actualities/{actuality}',[ActualityController::class,'update'])->middleware('auth:sanctum');
    Route::patch('actualities/{actuality}',[ActualityController::class,'update'])->middleware('auth:sanctum');
    Route::delete('actualities/{actuality}',[ActualityController::class,'destroy'])->middleware('auth:sanctum');
    Route::get('newest/actualities',[ActualityController::class,'getActualitiesToPost']);

    Route::apiResource('conversations',ConversationController::class)->middleware('auth:sanctum');
    Route::post('conversations',[ConversationController::class,'storeConversation'])->middleware('auth:sanctum');
    Route::post('conversations/{conversation}/adding-members',[ConversationController::class,'addToConversationGroup'])->middleware('auth:sanctum');
    Route::post('conversations/{conversation}/revoking-members',[ConversationController::class,'detachFromConversationGroup'])->middleware('auth:sanctum');
    Route::post('conversations/{conversation}/left-group',[ConversationController::class,'leftConversationGroup'])->middleware('auth:sanctum');
    Route::post('conversations/{conversation}/admins',[ConversationController::class,'makeAdmin'])->middleware('auth:sanctum');
    Route::get('conversations/{conversation}/admins',[ConversationController::class,'getAdmins'])->middleware('auth:sanctum');
    Route::get('conversations/{conversation}/messages',[ConversationController::class,'getMessagesConversation'])->middleware('auth:sanctum');
    Route::post('conversations/{conversation}/messages',[ConversationController::class,'store'])->middleware('auth:sanctum');
});



Route::patch('updateProfile',[UpdateProfileController::class,'updateProfile'])->middleware('auth:sanctum');
Route::put('updateProfile',[UpdateProfileController::class,'updateProfile'])->middleware('auth:sanctum');

Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
Route::post('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::group(['prefix'=>'v1','middleware'=>'auth:sanctum','namespace'=>'App\Http\Controllers\api\v1'],function (){
    Route::apiResource('users',UserController::class);
    Route::apiResource('clubs',ClubController::class);
    Route::get('myclub/clubs',[ClubController::class,'getClubOfAuthenticatedUser']);
    Route::patch('clubs/verified/{id}',[ClubController::class,'verifyOrNotClub']);
    Route::patch('clubs/suspended/{id}',[ClubController::class,'suspendedOrNotClub']);

    Route::apiResource('salles',SalleController::class);
    Route::patch('salles/changeDisponibility/{id}',[SalleController::class,'changeDisponibility']);

});
