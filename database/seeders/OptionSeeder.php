<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OptionSeeder extends Seeder
{

    private const OPTIONS = [
        [
            'name' => 'Размер',
            'type' => Option::TYPES['select'],
            'value' => ["XXL", "XL", "L", "M"],
            'description' => 'Размер одежды'
        ],
        [
            'name' => 'Цвет',
            'type' => Option::TYPES['color'],
            'value' => ["#eee", "#ccc", "#000"],
            'description' => 'Цвет одежды'
        ],
        [
            'name' => 'Метериал',
            'type' => Option::TYPES['text'],
            'value' => null,
            'description' => 'Метериал одежды'
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('options')->delete();
        foreach (self::OPTIONS as $params) {
            self::createOption($params);
        }
    }

    private function createOption(array $params)
    {
        Option::create([
            'title' => $params['name'],
            'name' => $params['name'],
            'type' => $params['type'],
            'value' => $params['value'],
            'description' => $params['description']
        ]);
    }
}
