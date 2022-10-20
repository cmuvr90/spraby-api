<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Category
 * @package App\Models
 *
 * @property int $id
 * @property string $name
 * @property string $handle
 * @property int $image_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Image $image
 *
 * @mixin Builder
 */
class Category extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'categories';

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
    public const RESOURCE_FIELDS = ['id', 'name', 'handle'];

    /**
     * @return BelongsTo
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

    /**
     * @param array $params
     * @return array
     */
    public static function getCategoryData(array $params): array
    {
        return [
            'name' => $params['name'],
            'handle' => $params['handle'],
        ];
    }

    /**
     * @param array $params
     * @return Category
     */
    public static function createCategory(array $params): Category
    {
        return (new Category)->create(self::getCategoryData($params));
    }

    /**
     * @param array $params
     * @return $this
     */
    public function updateCategory(array $params): Category
    {
        $this->updateOrCreate(['id' => $params['id']], self::getCategoryData($params));
        $this->refreshImage($params['image']['src'] ?? null);
        return $this;
    }

    /**
     * @param array $params
     * @param string $prefix
     * @return LengthAwarePaginator|Collection
     */
    public static function getCategories(array $params = [], string $prefix = 'categories')
    {
        return parent::index($params, $prefix);
    }

    /**
     * @param int $id
     * @param array $params
     * @return BaseModel|BaseModel[]|Builder|Builder[]|Collection|Model|null
     */
    public static function getCategoryById(int $id, array $params)
    {
        $fields = isset($params['fields']) ? self::getPrepareFields($params['fields']) : null;
        return (new Category)->customSelect($fields)->withRelations($params['with'] ?? null)->find($id);
    }
}