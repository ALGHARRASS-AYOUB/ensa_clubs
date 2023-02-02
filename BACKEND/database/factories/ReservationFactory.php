<?php

namespace Database\Factories;

use App\Models\Evenement;
use App\Models\Salle;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'evenement_id'=>Evenement::factory(),
            'salle_id'=>Salle::factory(),
            'start_at'=>now(),
            'end_at'=>Carbon::now()->addDays(10),
        ];
    }
}
