<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    protected $fillable=[

        'name',
        'activity_domaine',
        'email',
        'verified_at'  ,
        'created_at',
        'updated_at',
        'suspended_at',
        'suspended',
        'verified',
        'president',
        'bureau_members_file',
        'spervisor',
        'logo',
        'slugon',
        'description',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }


    public function conversations(){
        return $this->belongsToMany(Conversation::class,'groups','club_id','conversation_id')
            ->withTimestamps()
            ->withPivot(['name','isGroupAdmin','joined_at','left_at']);
    }

}
