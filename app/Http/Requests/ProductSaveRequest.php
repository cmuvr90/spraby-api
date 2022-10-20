<?php

namespace App\Http\Requests;

/**
 *
 */
class ProductSaveRequest extends WithUserIdRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'collection_id' => 'required',
            'variants.*.name' => 'required',
            'variants.*.values.*.value' => 'required'
        ];
    }
}
