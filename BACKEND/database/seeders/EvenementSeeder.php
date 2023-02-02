<?php

namespace Database\Seeders;

use App\Models\Evenement;
use App\Models\Salle;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EvenementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        $roles = Role::factory()->count(3)->create();
//
//        $user = User::factory()
//            ->count(3)
//            ->hasAttached($roles, ['active' => true])
//            ->create();
//
        $salles=Salle::factory(30)->create();
        Evenement::factory()->count(30)
            ->hasAttached($salles->random(3),[
                'start_at'=>now(),
                'end_at'=>Carbon::now()->addDays(10),
            ])
            ->create();
    }
}
