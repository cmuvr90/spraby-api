<?php

namespace App\Http\Requests\Brand;

use App\Http\Requests\WithUserIdRequest;
use App\Models\Brand;

/**
 *
 */
class BrandListRequest extends WithUserIdRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $params = $this->getQueryParams('brands.', Brand::RESOURCE_FIELDS);
        $this->merge(['params' => $params]);
        return [];
    }
}
