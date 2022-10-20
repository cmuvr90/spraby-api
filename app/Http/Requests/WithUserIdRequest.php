<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class WithUserIdRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        /**
         * @var User $user
         */
        $user = $this->user();
        if ($user && !$user->isAdmin()) {
            $this->merge(['user_id' => $user->id]);
            $this->merge(['brand_id' => $user->brand->id]);
        }
        return (bool)$user;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
