<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'description',
        'date_event',
        'isApprouved',
        'image',
        'club_id',
    ];

    public function actuality(){
        return $this->belongsTo(actuality::class  );
    }

    public function salles(){
        return $this->belongsToMany(Salle::class)
            ->withPivot(['start_at','end_at'])
            ->withTimestamps();
    }

    public function club(){
        return $this->belongsTo(Club::class);
    }
}
