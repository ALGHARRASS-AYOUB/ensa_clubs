<?php

use App\Models\Evenement;
use App\Models\Salle;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evenement_salle', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Evenement::class)->constrained();
            $table->foreignIdFor(Salle::class)->constrained();
            $table->dateTimeTz('start_at');
            $table->dateTimeTz('end_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};
