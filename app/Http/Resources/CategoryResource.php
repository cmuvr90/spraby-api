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

        $data = $category->getAttributes();

        return $data;
    }
}
