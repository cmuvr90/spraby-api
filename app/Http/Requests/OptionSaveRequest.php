<?php

namespace App\Http\Requests;

use App\Models\Option;
use App\Rules\UniqueOptionValues;
use Illuminate\Validation\Rule;

/**
 *
 */
class OptionSaveRequest extends WithUserIdRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {

        $rules = [
            'title' => 'required',
            'name' => 'required',
            'type' => [Rule::in(Option::TYPES)]
        ];

        if ($this->request->get('type') === Option::TYPES['select']) {
            $rules['value'] = 'required';
            $rules['value.*'] = ['required', new UniqueOptionValues($this->request->all())];
        }

        return $rules;
    }
}