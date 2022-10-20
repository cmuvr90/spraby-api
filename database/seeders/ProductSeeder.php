<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{


    private const PRODUCTS_COUNT = [
        [
            'categories' => ['varhnaya', 'kyrtki', 'woman'],
            'count' => 10
        ],
        [
            'categories' => ['varhnaya', 'kyrtki', 'man'],
            'count' => 10
        ],
        [
            'categories' => ['varhnaya', 'shtani', 'man'],
            'count' => 10
        ],
        [
            'categories' => ['varhnaya', 'shtani', 'woman'],
            'count' => 10
        ],
        [
            'categories' => ['obyv', 'krosovki', 'woman'],
            'count' => 10
        ],
        [
            'categories' => ['obyv', 'krosovki', 'man'],
            'count' => 10
        ]
    ];


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->delete();
        $categories = Category::get();
        self::createProducts($categories);
    }

    private function createProducts(Collection $categories)
    {
        $brandIds = Brand::get()->pluck('id')->toArray();
        $brandCount = count($brandIds);

        foreach (self::PRODUCTS_COUNT as $index => $params) {
            $count = $params['count'];

            $brand = Brand::find($brandIds[random_int(0, $brandCount - 1)]);

            if ($brand->categories->isEmpty()) {
                $categoryIds = $categories->whereIn('handle', $params['categories'])->pluck('id')->toArray();
                $brand->categories()->sync($categoryIds);
            } else {
                $categoryIds = $brand->categories->pluck('id')->toArray();
            }
            while ($count > 0) {
                $product = Product::create([
                    'name' => 'Product' . '_' . $index . '-' . $count,
                    'brand_id' => $brand->id
                ]);
                $product->categories()->sync($categoryIds);
                $count--;
            }
        }
    }
}
