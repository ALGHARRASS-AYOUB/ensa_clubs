<?php

use App\Models\User;
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
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('activity_domaine');
            $table->text('description')->nullable();
            $table->string('supervisor')->nullable();
            $table->string('logo')->nullable();
            $table->boolean('verified')->default(false);
            $table->foreignIdFor(User::class)->constrained();
            $table->string('bureau_members_file');
            $table->boolean('suspended')->default(false);
            $table->string('slugon')->nullable();
            $table->boolean('isGroupAdmin')->default(false);
            $table->dateTimeTz('verified_at')->nullable();
            $table->dateTimeTz('suspended_at')->nullable();
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
        Schema::dropIfExists('clubs');
    }
};
