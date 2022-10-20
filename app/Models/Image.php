<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection as LaravelCollection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Image
 * @package App\Models
 *
 * @property int $id
 * @property string $src
 * @property string $alt
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @mixin Builder
 */
class Image extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'images';

    /**
     * @var array
     */
    protected $guarded = [];

    /**
     * @var array
     */
    protected $hidden = ['pivot'];

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
    public const RESOURCE_FIELDS = ['id', 'src', 'alt'];

    /**
     * @param array $params
     * @return array
     */
    public static function getImageData(array $params): array
    {
        return [
            'src' => $params['src'],
            'alt' => $params['alt'] ?? '',
        ];
    }

    /**
     * @param array $params
     * @return Image
     */
    public static function createImage(array $params): Image
    {
        return (new Image)->create(self::getImageData($params));
    }

    /**
     * @param array $params
     * @return $this
     */
    public function updateImage(array $params): Image
    {
        $this->updateOrCreate(['id' => $this->id], self::getImageData($params));
        return $this;
    }

    /**
     * @param array $params
     * @param string $prefix
     * @return LengthAwarePaginator|LaravelCollection
     */
    public static function getImages(array $params = [], string $prefix = 'brands')
    {
        return parent::index($params, $prefix);
    }

    /**
     * @param int $id
     * @param array $params
     * @return BaseModel|BaseModel[]|Builder|Builder[]|LaravelCollection|Model|null
     */
    public static function getImageById(int $id, array $params)
    {
        $fields = isset($params['fields']) ? self::getPrepareFields($params['fields']) : null;
        return (new Brand)->customSelect($fields)->withRelations($params['with'] ?? null)->find($id);
    }
}