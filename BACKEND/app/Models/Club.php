<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }


    public function conversations(){
        return $this->belongsToMany(Conversation::class,'groups','club_id','conversation_id')
            ->withTimestamps()
            ->withPivot(['name','joined_at','left_at']);
    }

}
