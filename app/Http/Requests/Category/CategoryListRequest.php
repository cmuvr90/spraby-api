<?php

namespace App\Http\Requests\Category;

use App\Http\Requests\WithUserIdRequest;
use App\Models\Category;

/**
 *
 */
class CategoryListRequest extends WithUserIdRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $params = $this->getQueryParams('categories.', Category::RESOURCE_FIELDS);
        $this->merge(['params' => $params]);
        return [];
    }
}
