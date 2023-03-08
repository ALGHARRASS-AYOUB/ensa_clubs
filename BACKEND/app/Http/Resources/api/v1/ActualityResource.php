<?php

namespace App\Http\Resources\api\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class ActualityResource extends JsonResource
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
          'id'=>$this->id,
          'title'=>$this->title,
          'body'=>$this->body,
          'startAt'=>$this->start_at,
          'endAt'=>$this->end_at,
          'image'=>$this->image,
          'evenement'=>EvenementResource::make($this->evenement),
        ];
    }
}
