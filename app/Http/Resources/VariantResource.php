<?php

namespace App\Http\Resources;

use App\Models\Variant;
use Illuminate\Http\Request;

/**
 *
 */
class VariantResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var Variant $variant
         */
        $variant = $this->resource;

        $data = [];
        foreach (Variant::FIELDS as $field) {
            $data[$field] = $variant->{$field};
        }

        if ($variant->relationLoaded('image')) {
            $data['image'] = ImageResource::make($variant->image);
        }

        if ($variant->relationLoaded('values')) {
            $data['values'] = VariantValueResource::collection($variant->values);
        }

        return $data;
    }
}