<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Collection as LaravelCollection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Option
 * @package App\Models
 *
 * @property int $id
 * @property string $title
 * @property string $name
 * @property string $description
 * @property string $type ['select','text','color']
 * @property null|array $value
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @method Builder|BaseModel getByCategoryIds(array $ids)
 *
 * @mixin Builder
 */
class Option extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'options';

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
        'value' => 'array'
    ];

    /**
     * @var array
     */
    public const TYPES = [
        'select' => 'select',
        'text' => 'text',
        'color' => 'color'
    ];

    /**
     * @var array
     */
    public const RESOURCE_FIELDS = ['id', 'title', 'name', 'description', 'type', 'value'];

    /**
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'categories_options');
    }

    /**
     * @param array $params
     * @param string $prefix
     * @return LengthAwarePaginator|LaravelCollection
     */
    public static function getOptions(array $params = [], string $prefix = 'options')
    {
        return (new Option)->index($params, $prefix);
    }

    /**
     * @param int $id
     * @param array $params
     * @return BaseModel|BaseModel[]|Builder|Builder[]|LaravelCollection|Model|null
     */
    public static function getOptionById(int $id, array $params)
    {
        $fields = isset($params['fields']) ? self::getPrepareFields($params['fields']) : null;
        return (new Option)->customSelect($fields)->withRelations($params['with'] ?? null)->find($id);
    }

    /**
     * @param array $params
     * @return array
     */
    public static function getOptionData(array $params): array
    {
        return [
            'title' => $params['title'],
            'name' => $params['name'],
            'description' => $params['description'],
            'type' => $params['type'],
            'value' => $params['type'] === self::TYPES['select'] ? $params['value'] : null
        ];
    }

    /**
     * @param array $params
     * @return Option
     */
    public static function createOption(array $params): Option
    {
        return (new Option)->create(self::getOptionData($params));
    }

    /**
     * @param array $params
     * @return $this
     */
    public function updateOption(array $params): Option
    {
        $this->updateOrCreate(['id' => $params['id']], self::getOptionData($params));
        return $this;
    }

    //scopes

    /**
     * @param Builder $query
     * @param array|null $ids
     * @return Builder
     */
    public function scopeGetByCategoryIds(Builder $query, array $ids = null): Builder
    {
        return $ids ? $query->select('options.*')->join('categories_options', static function ($join) use ($ids) {
            $join->on('categories_options.option_id', 'options.id')
                ->whereIn('categories_options.category_id', $ids);
        })->groupBy('options.id') : $query;
    }
}
