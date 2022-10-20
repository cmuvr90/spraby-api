<?php

namespace App\Helpers;

use Illuminate\Http\Request;

class RequestHelper
{

    const PARAMS_KEY = [
        'FIELDS' => 'fields'
    ];

    public static function getQueryParams(Request $request, $prefix = '')
    {
        return [
            self::PARAMS_KEY['FIELDS'] => self::getQueryFields($request, $prefix)
        ];
    }


    public static function getQueryFields(Request $request, $prefix = '')
    {
        $fields = $request->get(self::PARAMS_KEY['FIELDS']);
        if ($fields === null) return [];

        return array_map(static function ($field) use ($prefix) {
            return $prefix . trim($field);
        }, explode(',', $fields));
    }


}
