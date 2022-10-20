<?php

namespace App\Http\Resources;

use App\Models\BaseModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class BaseResource
 * @package App\Http\Resources
 */
class BaseResource extends JsonResource
{
    /**
     *
     */
    public function boot()
    {
        JsonResource::withoutWrapping();
    }

    /**
     * @param LengthAwarePaginator $resource
     * @return array
     */
    public static function paginate(LengthAwarePaginator $resource): array
    {
        $total = $resource->total();
        $limit = $resource->perPage();
        $pages = (int)ceil($total / $limit);
        $current = $resource->currentPage();

        return [
            'items' => self::collection($resource->items()),
            'pagination' => [
                'total' => $total,
                'limit' => $limit,
                'pages' => $pages,
                'current' => $current,
                'next' => $resource->nextPageUrl() ? $current + 1 : null,
                'previous' => $resource->previousPageUrl() ? $current - 1 : null,
            ]
        ];
    }

    /**
     * @param Request $request
     * @param array $defaultFields
     * @param array $withItems
     * @return array
     */
    public static function getData(Request $request, array $defaultFields = [], array $withItems = []): array
    {
        $fields = self::getFields($request, $defaultFields);
        $with = self::getWithItems($request, $withItems);
        return array_merge($fields, $with);
    }

    /**
     * @param Request $request
     * @param array $defaultFields
     * @return array
     */
    private static function getFields(Request $request, array $defaultFields): array
    {
        $fields = $request->get('fields');
        if (!$fields) return $defaultFields;

        return array_reduce(BaseModel::getPrepareFields($fields), function ($acc, $item) use ($defaultFields) {
            if (in_array($item, $defaultFields)) $acc[] = $item;
            return $acc;
        }, []);
    }

    /**
     * @param Request $request
     * @param array $withItems
     * @return array
     */
    private static function getWithItems(Request $request, array $withItems): array
    {
        $withData = $request->get('with');
        if (!$withData) return [];

        $with = array_reduce(explode(',', $withData), function ($acc, $item) {
            return array_unique(array_merge($acc, explode('.', $item)));
        }, []);

        return array_reduce($with, function ($acc, $item) use ($withItems) {
            if (in_array($item, $withItems)) $acc[] = $item;
            return $acc;
        }, []);
    }
}
