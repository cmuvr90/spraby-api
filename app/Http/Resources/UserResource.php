<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;

/**
 * Class UserResource
 * @package App\Http\Resources
 */
class UserResource extends BaseResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /**
         * @var User $user
         */
        $user = $this->resource;

        $data = [];

        foreach (User::RESOURCE_FIELDS as $field) {
            if ($user->{$field}) {
                $data[$field] = $user->{$field};
            }
        }

        if ($user->relationLoaded('brand')) {
            $data['brand'] = BrandResource::make($user->brand);
        }

        return $data;
    }
}
