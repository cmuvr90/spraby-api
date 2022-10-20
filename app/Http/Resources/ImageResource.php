<?php

namespace App\Http\Resources;

use App\Models\Collection;
use App\Models\Image;
use Illuminate\Http\Request;

/**
 *
 */
class ImageResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var Collection $image
         */
        $image = $this->resource;

        $data = [];

        foreach (Image::RESOURCE_FIELDS as $field) {
            $data[$field] = $image->{$field};
        }

        return $data;
    }
}