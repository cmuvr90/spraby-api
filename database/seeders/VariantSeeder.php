<?php

namespace Database\Seeders;

use App\Models\Option;
use App\Models\Product;
use App\Models\Variant;
use App\Models\VariantValue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VariantSeeder extends Seeder
{
	/**
	 * @throws \Exception
	 */
	public function run()
	{
		DB::table('variants')->delete();
		$products = Product::with('categories.options')->get();
		self::createVariants($products);
	}

	/**
	 * @param Collection $products
	 * @throws \Exception
	 */
	private function createVariants(Collection $products)
	{
		foreach ($products as $product) {


			$count = random_int(1, 3);
			while ($count > 0) {


				$values = [];
				foreach ($product->categories as $category) {
					foreach ($category->options as $option) {
						if ($option->type !== Option::TYPES['text']) {
							$values[$option->id] = $option->value[random_int(0, count($option->value) - 1)];
						} else {
							$values[$option->id] = 'value_' . random_int(1, 25);
						}
					}
				}


				self::createVariant($product, $values);
				$count--;
			}
		}
	}

	private function createVariant(Product $product, array $values)
	{
		$variant = Variant::create([
			'product_id' => $product->id
		]);

		foreach ($values as $optionId => $value) {
			VariantValue::create([
				'variant_id' => $variant->id,
				'option_id' => $optionId,
				'value' => $value
			]);
		}


	}
}
