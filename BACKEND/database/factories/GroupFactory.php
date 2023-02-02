<?php

namespace Database\Factories;

use App\Models\Club;
use App\Models\Conversation;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $conversations=Club::all()->each(function ($club){
            $club->conversations()->attach($this);
        });
        return [
            'name'=>$this->faker->title(),
            'club_id'=>Club::factory(),
            'conversation_id'=>Conversation::factory(),
            'joined_at'=>now(),
            'left_at'=>$this->faker->randomElement([null,Carbon::now()->addHour()]),
        ];
    }
}
