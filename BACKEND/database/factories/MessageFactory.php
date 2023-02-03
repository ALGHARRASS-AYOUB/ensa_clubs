<?php

namespace Database\Factories;

use App\Models\Club;
use App\Models\Conversation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $clubs=Club::factory()->count(2)->create();
        return [
            'from'=>$this->faker->randomElement(collect($clubs)->map(fn($c)=>$c->id)->random(2)),
            'body'=>$this->faker->sentence(),
            'sent_at'=>$this->faker->dateTimeThisMonth(),
            'conversation_id'=>Conversation::factory()->hasAttached($clubs->random(2),[
                'name'=>$this->faker->title(),
                'isGroupAdmin'=>$this->faker->randomElement([true,false]),
                'joined_at'=>now(),
                'left_at'=>$this->faker->randomElement([null,Carbon::now()->addHour()]),
            ])->create()
        ];
    }
}
