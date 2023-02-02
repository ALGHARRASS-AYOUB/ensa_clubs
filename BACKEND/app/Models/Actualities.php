<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actualities extends Model
{
    use HasFactory;

    public function evenement(){
        return $this->hasOne(Evenement::class);
    }


}
