<?php

namespace App\Http\Resources\api\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'firstName'=>$this->first_name,
            'lastName'=>$this->last_name,
            'email'=>$this->email,
            'verifiedAt'=>$this->verified_at   ,
            'createdAt'=>$this->created_at,
            'updatedAt'=>$this->updated_at,
            'role'=>$this->role,
        ];
    }
}
