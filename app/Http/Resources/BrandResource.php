<?php

namespace App\Http\Resources;

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
        $data = $brand->getAttributes();

//        if ($brand->relationLoaded('collections')) {
//            $data['collections'] = CollectionResource::collection($brand->collections);
//        }

        return $data;
    }
}
