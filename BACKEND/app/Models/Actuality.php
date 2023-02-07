<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actuality extends Model
{
    use HasFactory;

    protected $fillable=[
        'body',
        'start_at',
        'end_at',
        'image',
        'evenement_id',
    ];

    public function evenement(){
        return $this->belongsTo(Evenement::class);
    }
}
