<?php

namespace App\Http\Requests;

/**
 *
 */
class BrandSaveRequest extends WithUserIdRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        //@todo validate image
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|max:1500',
            'user' => 'required|integer',
            'categories' => 'array',
        ];
    }
}