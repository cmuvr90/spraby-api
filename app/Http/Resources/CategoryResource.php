<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;

/**
 *
 */
class CategoryResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var Category $category
         */
        $category = $this->resource;

        $data = [];

        foreach (Category::RESOURCE_FIELDS as $field) {
            $data[$field] = $category->{$field};
        }

        if ($category->relationLoaded('image')) {
            $data['image'] = ImageResource::make($category->image);
        }

        return $data;
    }
}