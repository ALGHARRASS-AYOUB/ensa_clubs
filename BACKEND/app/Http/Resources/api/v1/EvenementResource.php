<?php

namespace App\Http\Resources\api\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class EvenementResource extends JsonResource
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
            'name'=>$this->name,
            'description'=>$this->description,
            'dateEvent'=>$this->date_event,
            'image'=>$this->image,
            'isApprouved'=>$this->isApprouved,
            'salles'=>SalleResource::collection($this->salles),
            'club'=>ClubResource::make($this->club),
        ];
    }
}
