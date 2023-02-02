<?php

namespace Database\Seeders;

use App\Models\Actualities;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActualitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Actualities::factory()->count(40)->create();
    }
}
