<?php

namespace Database\Seeders;

use App\Models\actuality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActualitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Actuality::factory()->count(20)->create();
    }
}
