<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{

    private const CATEGORIES = [
        [
            'handle' => 'varhnaya',
            'name' => 'Верхняя',
            'options' => ['Размер']
        ],
        [
            'handle' => 'obyv',
            'name' => 'Обувь',
            'options' => ['Размер']
        ],
        [
            'handle' => 'kyrtki',
            'name' => 'Куртки',
            'options' => ['Метериал']
        ],
        [
            'handle' => 'shtani',
            'name' => 'Штаны',
            'options' => ['Цвет', 'Метериал']
        ],
        [
            'handle' => 'man',
            'name' => 'Мужские',
            'options' => []
        ],
        [
            'handle' => 'woman',
            'name' => 'Женские',
            'options' => []
        ],
        [
            'handle' => 'krosovki',
            'name' => 'Кросовки',
            'options' => ['Цвет']
        ]
    ];


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->delete();

        foreach (self::CATEGORIES as $params) {
            Category::create([
                'name' => $params['name'],
                'handle' => $params['handle']
            ]);
        }
    }
}