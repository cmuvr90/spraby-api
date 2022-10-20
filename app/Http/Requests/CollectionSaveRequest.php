<?php

namespace App\Http\Requests;

/**
 *
 */
class CollectionSaveRequest extends WithUserIdRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'title' => 'max:255',
            'description' => 'max:1000'
        ];
    }
}