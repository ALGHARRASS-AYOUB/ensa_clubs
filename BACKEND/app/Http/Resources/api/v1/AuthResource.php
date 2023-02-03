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
            'email'=>$this['userInfo']->email,
            'name'=>$this['userInfo']->first_name,
            'role'=>$this['userInfo']->last_name,
            $this['tokenName']=>$this['token'],
        ];
    }
}
