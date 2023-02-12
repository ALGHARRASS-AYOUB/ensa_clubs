<?php

namespace App\Events;

use App\Http\Resources\api\v1\ClubResource;
use App\Models\Club;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewChatMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $club,$message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($club,$message)
    {
        $this->club=$club;
        $this->message=$message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('chat.'.$this->message->conversation_id);
    }

    public function broadcastAs(){
        return 'chatting-event';
    }

    public function broadcastWith()
    {
        return [
            'body' => $this->message->body,
            'startAt' => $this->message->sent_at,
            'from' => [
                ClubResource::make(Club::where('id',$this->message->from)->first()),
            ],
            'conversation_id'=>$this->message->conversation->id,
        ];
    }
}
