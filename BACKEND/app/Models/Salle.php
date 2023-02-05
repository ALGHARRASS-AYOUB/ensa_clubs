<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;
protected $fillable=[
    'name',
    'isDisponible',
    'description',
];

    public function evenements(){
        return $this->belongsToMany(Evenement::class)
            ->withPivot(['start_at','end_at'])
            ->withTimestamps();
    }
}
