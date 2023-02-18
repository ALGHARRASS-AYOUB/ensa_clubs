<?php

namespace App\Http\Controllers\api\v1;

use App\Events\NewChatMessageEvent;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateConversationRequest;
use App\Http\Resources\api\v1\ClubCollection;
use App\Http\Resources\api\v1\ConversationCollection;
use App\Http\Resources\api\v1\ConversationResource;
use App\Http\Resources\api\v1\GroupResource;
use App\Http\Resources\api\v1\MessageCollection;
use App\Http\Resources\api\v1\MessageResource;
use App\Models\Club;
use App\Models\Conversation;
use App\Models\Message;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user=Auth::user();
        $club=Club::where('user_id',$user->id)->first();
        return new ConversationCollection($club->conversations);
    }

    public function getMessagesConversation(Conversation $conversation)
    {
        $user=Auth::user();
        $club=Club::where('user_id',$user->id)->first();
       if ($club->conversations()->where('conversation_id',$conversation->id)->first()->pivot->club_id==$club->id)
             $messages=Message::where('conversation_id',$conversation->id)->oldest()->get();
        return new MessageCollection($messages);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreConversationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMessageRequest $request,Conversation $conversation)
    {
        $club=Club::where('user_id',auth()->id())->first();

        $message=Message::create([
           'body'=>$request->body,
            'sent_at'=>now(),
            'from'=>$club->id,
            'conversation_id'=>$conversation->id,
        ]);

        broadcast(new NewChatMessageEvent($club,$message))->toOthers();
        return new MessageResource($message);

    }

    public function storeConversation(StoreConversationRequest $request)
    {
        $image=null;
        $name=$request->name??'untitled room';
        if ($request->hasFile('image')) {

        }
        $conversation = Conversation::create([
            'name' => $name,
            //'image'=>$image,
        ]);

        if($request->has('clubs') && $request->clubs!=null){

            $clubs_str=str_replace(['[',']'],'',$request->clubs);
            $clubs=explode(',',$clubs_str);

            $clubOfAuthenticatedUser=Club::where('user_id',auth()->id())->first();
            $conversation->clubs()->attach($clubOfAuthenticatedUser->id,[
                'name'=>$request->name,
                'joined_at'=>now(),
                'isGroupAdmin'=>true,
            ]);
            //adding the other clubs
            foreach ($clubs as $club_id){
                $club=Club::where('id',$club_id)->first();
                $conversation->clubs()->attach($club_id,[

                    'name'=>$request->name,
                    'joined_at'=>now(),
                    'isGroupAdmin'=>false,
                ]);
            }
        }

    return new GroupResource($conversation);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Conversation  $conversation
     * @return \Illuminate\Http\Response
     */
    public function show(Conversation $conversation)
    {
        $user=Auth::user();
        $club=Club::where('user_id',$user->id)->first();
        if ($club->conversations()->where('conversation_id',$conversation->id)->first()->pivot->club_id==$club->id)
              return new ConversationResource($conversation);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateConversationRequest  $request
     * @param  \App\Models\Conversation  $conversation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateConversationRequest $request, Conversation $conversation)
    {
        //
    }

    public function getAdmins(Conversation $conversation)
    {
        $clubsAdmins=$conversation->clubs()->withPivotValue('isGroupAdmin',1)->get();
        return new ClubCollection($clubsAdmins);
    }

    public function addToConversationGroup(Request $request,Conversation $conversation)
    {
        $user=Auth::user();
        $club=Club::where('user_id',$user->id)->first();

        if($this->isAdmin($conversation,$club)){
            if($request->has('clubs') && $request->clubs!=null){

                $clubs_str=str_replace(['[',']'],'',$request->clubs);
                $clubs=explode(',',$clubs_str);


                //adding the other clubs
                foreach ($clubs as $club_id){
                    $club=Club::where('id',$club_id)->first();
                    $conversation->clubs()->attach($club_id,[

                        'name'=>$conversation->name,
                        'joined_at'=>now(),
                        'isGroupAdmin'=>false,
                    ]);
                }
            }
        }else {
            return response()->json(['message' => 'only group admins can perform such as actions']);
        }
        return new GroupResource($conversation);
    }

    public function detachFromConversationGroup(Request $request,Conversation $conversation)
    {
        $user=Auth::user();
        $club=Club::where('user_id',$user->id)->first();

        if($this->isAdmin($conversation,$club)){
            if($request->has('clubs') && $request->clubs!=null){

                $clubs_str=str_replace(['[',']'],'',$request->clubs);
                $clubs=explode(',',$clubs_str);


                //adding the other clubs
                foreach ($clubs as $club_id) {
                    $club = Club::where('id', $club_id)->first();
                    if (!$this->isAdmin($conversation, $club)) {
                        $conversation->clubs()->detach($club_id);
                    }else{
                        return response()->json(['message'=>'you can not detach an other admin from this group']);
                    }
                }
            }
        }else {
            return response()->json(['message' => 'only group admins can perform such as actions']);
        }
        return new GroupResource($conversation);
    }

    public function leftConversationGroup(Conversation $conversation)
    {
        $user=Auth::user();
        $club=Club::where('user_id',$user->id)->first();
        $conversation->clubs()->detach($club->id);
        return true;
    }

    public  function makeAdmin(Request $request,Conversation $conversation)
    {
        $user=Auth::user();
        $club=Club::where('user_id',$user->id)->first();
        if($this->isAdmin($conversation,$club)){
            if($request->has('clubs') && $request->clubs!=null){

                $clubs_str=str_replace(['[',']'],'',$request->clubs);
                $clubs=explode(',',$clubs_str);

                //adding the other clubs
                foreach ($clubs as $club_id) {
                    $club = Club::where('id', $club_id)->first();
                    if (!$this->isAdmin($conversation, $club)) {
                        $joinedAt=$conversation->clubs->where('id',$club->id)->first()->pivot->joined_at;
                        $conversation->clubs()->detach($club_id);
                        $conversation->clubs()->attach($club_id,[
                            'name'=>$conversation->name,
                            'isGroupAdmin'=>true,
                            'joined_at'=>$joinedAt,
                        ]);
                    }else{
                        return response()->json(['message'=>'you can not detach an other admin from this group']);
                    }
                }
            }
        }else {
            return response()->json(['message' => 'only  admins can perform such as actions']);
        }
        return new GroupResource($conversation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Conversation  $conversation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
    private function isAdmin(Conversation $conversation,Club $club){
        $admins=$conversation->clubs()->withPivotValue('isGroupAdmin',1)->get();
        foreach ($admins as $admin){
            if($admin->id==$club->id)
               return true;
        }
        return false;
    }

}
