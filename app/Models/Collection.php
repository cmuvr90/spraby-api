<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as LaravelCollection;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Class Collection
 * @package App\Models
 *
 * @property int $id
 * @property string $name
 * @property string $title
 * @property string $description
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Collection $categories
 * @property Collection $options
 *
 * @mixin Builder
 */
class Collection extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'collections';

    /**
     * @var array
     */
    protected $guarded = [];

    /**
     * @var array
     */
    protected $hidden = ['pivot', 'created_at', 'updated_at'];

    /**
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * @var array
     */
    public const RESOURCE_FIELDS = ['id', 'name', 'title', 'description'];


//    /**
//     * @return BelongsToMany
//     */
//    public function options(): BelongsToMany
//    {
//        return $this->belongsToMany(Option::class, 'collections_options');
//    }
//
//    /**
//     * @return BelongsToMany
//     */
//    public function categories(): BelongsToMany
//    {
//        return $this->belongsToMany(Category::class, 'collections_categories');
//    }
//
//    /**
//     * @param array $params
//     * @return array
//     */
//    public static function getCollectionData(array $params): array
//    {
//        return [
//            'name' => $params['name'],
//            'title' => $params['title'],
//            'description' => $params['description'],
//        ];
//    }
//
//    /**
//     * @param array $params
//     * @return Collection
//     */
//    public static function createCollection(array $params): Collection
//    {
//        $collection = (new Collection)->create(self::getCollectionData($params));
//        $collection->updateOptions($params);
//        $collection->updateCategories($params);
//        return $collection;
//    }
//
//    /**
//     * @param array $params
//     * @return $this
//     */
//    public function updateCollection(array $params): Collection
//    {
//        $this->updateOrCreate(['id' => $params['id']], self::getCollectionData($params));
//        $this->updateOptions($params);
//        $this->updateCategories($params);
//        return $this;
//    }
//
//    /**
//     * @param array $params
//     * @param string $prefix
//     * @return LengthAwarePaginator|LaravelCollection
//     */
//    public static function getCollections(array $params = [], string $prefix = 'collections')
//    {
//        $limit = $params['limit'] ?? null;
//        $userId = $params['user_id'] ?? null;
//
//        $query = self::select('collections.*')->getByDefaultParams($params, $prefix);
//
//        if ($userId) {
//            $query->join('collections_brands', 'collections_brands.collection_id', 'collections.id')
//                ->whereBrandByUserId($userId, 'collections_brands');
//        }
//        return $query->customPaginate($limit);
//    }
//
//    /**
//     * @param int $id
//     * @param array $params
//     * @return BaseModel|BaseModel[]|Builder|Builder[]|LaravelCollection|\Illuminate\Database\Eloquent\Model|null
//     */
//    public static function getCollectionById(int $id, array $params)
//    {
//        $fields = isset($params['fields']) ? self::getPrepareFields($params['fields']) : null;
//        $with = $params['with'] ?? null;
//        return (new Collection)->customSelect($fields)->withRelations($with)->find($id);
//    }
//
//    /**
//     * @param array $params
//     * @return array
//     */
//    public function updateOptions(array $params): array
//    {
//        if (isset($params['options'])) {
//            return $this->options()->sync($params['options']);
//        }
//        return [
//            "attached" => [],
//            "detached" => [],
//            "updated" => [],
//        ];
//    }
//
//    /**
//     * @param array $params
//     * @return array
//     */
//    public function updateCategories(array $params): array
//    {
//        if (isset($params['categories'])) {
//            return $this->categories()->sync($params['categories']);
//        }
//        return [
//            "attached" => [],
//            "detached" => [],
//            "updated" => [],
//        ];
//    }
}
