<?php

namespace App\Http\Resources;

use App\Helpers\RequestHelper;
use App\Models\Brand;
use Illuminate\Http\Request;

/**
 * Class BrandResource
 * @package App\Http\Resources
 */
class BrandResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var Brand $brand
         */
        $brand = $this->resource;

        $data = [];

        $fields = RequestHelper::getQueryFields($request);

        foreach (Brand::RESOURCE_FIELDS as $field) {
            if (!$fields || in_array($field, $fields)) $data[$field] = $brand->{$field};
        }

//        if ($brand->relationLoaded('image')) {
//            $data['image'] = ImageResource::make($brand->image);
//        }
//
//        if ($brand->relationLoaded('user')) {
//            $data['user'] = UserResource::make($brand->user);
//        }
//
//        if ($brand->relationLoaded('collections')) {
//            $data['collections'] = CollectionResource::collection($brand->collections);
//        }

        return $data;
    }
}
