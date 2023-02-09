<?php

namespace Database\Factories;

use App\Models\Evenement;
use App\Models\Salle;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Actuality>
 */
class ActualityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $salles=Salle::factory(6)->create();
        return [
            'title'=>$this->faker->title(),
            'body'=>$this->faker->text(),
            'start_at'=>now(),
            'end_at'=>Carbon::now()->addDays(10),
            'evenement_id'=>$this->faker->randomElement([
                null,
                Evenement::factory()->hasAttached($salles->random(3),[
                'start_at'=>now(),
                'end_at'=>Carbon::now()->addDays(10)
            ])
            ->create()]),
            'image'=>'https://s2.qwant.com/thumbr/0x380/f/2/692cabf4c3c466449043fd4ba1af6d68bc73234f1b8d1a7389da8997b0b6e1/maxresdefault.jpg?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fz-JfMtSollE%2Fmaxresdefault.jpg&q=0&b=1&p=0&a=0',
        ];
    }
}
