<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salle>
 */
class SalleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name'=>$this->faker->unique()->name(),
            'description'=>$this->faker->text(),
            'isDisponible'=>$this->faker->randomElement([true,false]    ),
            'isReserved'=>$this->faker->randomElement([true,false]    ),
        ];
    }
}
