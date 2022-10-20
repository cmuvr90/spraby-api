<?php

namespace App\Http\Resources;

use App\Models\Collection;
use Illuminate\Http\Request;

/**
 *
 */
class CollectionResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var Collection $collection
         */
        $collection = $this->resource;

        $data = [];

        foreach (Collection::RESOURCE_FIELDS as $field) {
            $data[$field] = $collection->{$field};
        }

        if ($collection->relationLoaded('options')) {
            $data['options'] = OptionResource::collection($collection->options);
        }

        if ($collection->relationLoaded('categories')) {
            $data['categories'] = CategoryResource::collection($collection->categories);
        }

        return $data;
    }
}