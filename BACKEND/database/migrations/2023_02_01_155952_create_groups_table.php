<?php

use App\Models\Club;
use App\Models\Conversation;
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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('isGroupAdmin')->default(false);
            $table->foreignIdFor(Club::class)->constrained();
            $table->foreignIdFor(Conversation::class)->constrained();
            $table->dateTimeTz('joined_at');
            $table->dateTimeTz('left_at')->nullable();
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
        Schema::dropIfExists('groups');
    }
};
