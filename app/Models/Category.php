<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * @var array
     */
    public const RESOURCE_FIELDS = ['id', 'name', 'handle', 'created_at', 'updated_at'];

    /**
     * @param string $id
     * @param array $params
     * @return Model|null
     */
    public static function retrieve(string $id, array $params = []): ?Model
    {
        return (new Category())->index($params)->findOrFail($id);
    }

    /**
     * @param array $params
     * @return LengthAwarePaginator
     */
    public static function list(array $params = []): LengthAwarePaginator
    {
        return (new Category())->index($params)->paginate();
    }
}
