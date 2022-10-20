<?php

namespace App\Http\Requests;

/**
 *
 */
class CategorySaveRequest extends WithUserIdRequest
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
            'handle' => 'required|string|unique:categories,handle,' . $this->id . '|max:255',
        ];
    }
}