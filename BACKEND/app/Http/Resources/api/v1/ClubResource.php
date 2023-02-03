<?php

namespace App\Http\Resources\api\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class ClubResource extends JsonResource
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
            'activityDomaine'=>$this->activity_domaine,
            'description'=>$this->description,
            'email'=>$this->email,
            'verifiedAt'=>$this->verified_at   ,
            'createdAt'=>$this->created_at,
            'updatedAt'=>$this->updated_at,
            'suspendedAt'=>$this->suspended_at,
            'suspended'=>$this->suspended,
            'verified'=>$this->verified,
            'president'=>UserResource::make($this->user),
            'bureauMembersFile'=>$this->bureau_members_file,
            'spervisor'=>$this->supervisor,
            'logo'=>$this->logo,
            'slugon'=>$this->slugon,

        ];
    }
}
