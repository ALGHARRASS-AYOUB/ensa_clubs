<?php

namespace App\Http\Resources\api\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
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

            'id'=>$this['userInfo']->id,
            'firstName'=>$this['userInfo']->first_name,
            'lastName'=>$this['userInfo']->last_name,
            'email'=>$this['userInfo']->email,
            'verifiedAt'=>$this['userInfo']->verified_at  ,
            'role'=>$this['userInfo']->role,
            $this['tokenName']=>$this['token'],
        ];
    }
}
