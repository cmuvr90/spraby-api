<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait QueryScoupes
{

    /**
     * @param Builder $query
     * @param array|null $fields
     * @return Builder
     */
    public function scopeCustomSelect(Builder $query, $fields = null): Builder
    {
        $fields = is_array($fields) ? $fields : (is_string($fields) ? self::getPrepareFields($fields) : null);
        return $fields ? $query->select($fields) : $query;
    }

    /**
     * @param string $fields
     * @param string $prefix
     * @return string[]
     */
    public static function getPrepareFields(string $fields = '', string $prefix = ''): array
    {
        return array_map(static function ($field) use ($prefix) {
            return $prefix . trim($field);
        }, explode(',', $fields));
    }
}
