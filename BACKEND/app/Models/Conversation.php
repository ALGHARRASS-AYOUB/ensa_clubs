<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    public function messages(){
        $this->hasMany(Message::class);
    }


    public function clubs()
    {
        return $this->belongsToMany(Club::class,'groups')
            ->withPivot(['name','joined_at','left_at'])
            ->withTimestamps();
    }
}
