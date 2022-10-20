<?php

namespace App\Http\Resources;

use App\Models\Option;
use Illuminate\Http\Request;

/**
 *
 */
class OptionResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var Option $option
         */
        $option = $this->resource;

        $data = [];
        foreach (Option::RESOURCE_FIELDS as $field) {
            $data[$field] = $option->{$field};
        }
        return $data;
    }
}