<?php

namespace App\Http\Resources\api\v1;

use App\Models\Club;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'body'=>$this->body,
            'from'=>ClubResource::make(Club::where('id',$this->from)->first()),
            'sentAt'=>$this->sent_at,
            'conversationId'=>$this->conversation_id,
        ];
    }
}
