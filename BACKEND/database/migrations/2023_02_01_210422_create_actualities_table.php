<?php

use App\Models\Evenement;
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
        Schema::create('actualities', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable() ;
            $table->text('body')->nullable() ;
            $table->dateTimeTz('start_at')->nullable();
            $table->dateTimeTz('end_at')->nullable();
            $table->string('image')->nullable();
            $table->foreignIdFor(Evenement::class)->nullable()->constrained();
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
        Schema::dropIfExists('actualities');
    }
};
