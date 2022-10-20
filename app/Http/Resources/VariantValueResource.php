<?php

namespace App\Http\Resources;

use App\Models\Option;
use App\Models\VariantValue;
use Illuminate\Http\Request;

/**
 *
 */
class VariantValueResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        /**
         * @var VariantValue $variantValue
         * @var Option $option
         */
        $variantValue = $this->resource;

        return [
            'id' => $variantValue->id,
            'variant_id' => $variantValue->variant_id,
            'option_id' => $variantValue->option_id,
            'value' => $variantValue->value,
            'option' => OptionResource::make($variantValue->option)
        ];
    }
}