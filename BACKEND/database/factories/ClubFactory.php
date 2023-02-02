<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Club>
 */
class ClubFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $verified=$this->faker->randomElement([true,false]);
        $suspended= $verified=$this->faker->randomElement([true,false]);
        $verified_at=$verified ? now():null;
        $suspended_at=$suspended ? now():null ;
        return [
            'name'=>$this->faker->company(),
            'activity_domaine'=>$this->faker->sentence(),
            'description'=>$this->faker->text(),
            'supervisor'=>$this->faker->name(),
            'slugon'=>$this->faker->sentence(),
            'verified'=>$verified,
            'user_id'=>User::factory(),
            'bureau_members_file'=>'http://exo7.emath.fr/cours/livre-algebre-1.pdf',
            'suspended'=>$suspended,
            'logo'=>'https://s2.qwant.com/thumbr/0x380/f/2/692cabf4c3c466449043fd4ba1af6d68bc73234f1b8d1a7389da8997b0b6e1/maxresdefault.jpg?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fz-JfMtSollE%2Fmaxresdefault.jpg&q=0&b=1&p=0&a=0',
            'isGroupAdmin'=>false,
            'verified_at'=>$verified_at,
            'suspended_at'=>$suspended_at,
        ];
    }
}
