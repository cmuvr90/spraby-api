<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;

/**
 *
 */
class ProductResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var Product $product
         */
        $product = $this->resource;

        $data = [];
        foreach (Product::FIELDS as $field) {
            $data[$field] = $product->{$field};
        }

        if ($product->relationLoaded('collection')) {
            $data['collection'] = CollectionResource::make($product->collection);
        }

        if ($product->relationLoaded('image')) {
            $data['image'] = ImageResource::make($product->image);
        }

        if ($product->relationLoaded('variants')) {
            $data['variants'] = VariantResource::collection($product->variants);
        }

        if ($product->relationLoaded('options')) {
            $data['options'] = OptionResource::collection($product->options);
        }

        if ($product->relationLoaded('images')) {
            $data['images'] = ImageResource::collection($product->images);
        }

        return $data;
    }
}