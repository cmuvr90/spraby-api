<?php

namespace App\Models;

use App\Http\Resources\BrandResource;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection as LaravelCollection;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Brand
 * @package App\Models
 *
 * @property int $id
 * @property int $user_id
 * @property int $image_id
 * @property string $name
 * @property string $description
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property User $user
 * @property Image $image
 * @property LaravelCollection $collections
 *
 * @mixin Builder
 */
class Brand extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'brands';

    /**
     * @var array
     */
    protected $guarded = [];

    /**
     * @var array
     */
    protected $hidden = ['pivot', 'updated_at', 'user_id'];

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
    public const RESOURCE_FIELDS = [
        'id',
        'name',
        'description'
    ];


    public static function list(array $params = [])
    {
        return (new Brand())->index($params)->paginate();
    }



//    /**
//     * @return BelongsTo
//     */
//    public function user(): BelongsTo
//    {
//        return $this->belongsTo(User::class);
//    }
//
//    /**
//     * @return BelongsTo
//     */
//    public function image(): BelongsTo
//    {
//        return $this->belongsTo(Image::class);
//    }
//
//    /**
//     * @return BelongsToMany
//     */
//    public function collections(): BelongsToMany
//    {
//        return $this->belongsToMany(Collection::class, 'collections_brands');
//    }
//
//    /**
//     * @param array $params
//     * @return array
//     */
//    public static function getBrandData(array $params): array
//    {
//        return [
//            'name' => $params['name'],
//            'description' => $params['description'],
//            'user_id' => $params['user'],
//        ];
//    }
//
//    /**
//     * @param array $params
//     * @return Brand
//     */
//    public static function createBrand(array $params): Brand
//    {
//        $brand = (new Brand)->create(self::getBrandData($params));
//        $brand->updateCollections($params);
//        return $brand;
//    }
//
//    /**
//     * @param array $params
//     * @return Brand
//     */
//    public function updateBrand(array $params): Brand
//    {
//        $this->updateOrCreate(['id' => $params['id']], self::getBrandData($params));
//        $this->updateCollections($params);
//        return $this;
//    }
//
//    /**
//     * @param array $params
//     * @param string $prefix
//     * @return LengthAwarePaginator|LaravelCollection
//     */
//    public static function getBrands(array $params = [], string $prefix = 'brands')
//    {
//        return parent::index($params, $prefix);
//    }
//
//    /**
//     * @param int $id
//     * @param array $params
//     * @return BaseModel|BaseModel[]|Builder|Builder[]|LaravelCollection|Model|null
//     */
//    public static function getBrandById(int $id, array $params)
//    {
//        $fields = isset($params['fields']) ? self::getPrepareFields($params['fields']) : null;
//        return (new Brand)->customSelect($fields)->withRelations($params['with'] ?? null)->find($id);
//    }
//
//    /**
//     * @param array $params
//     * @return array[]
//     */
//    public function updateCollections(array $params): array
//    {
//        if (isset($params['collections'])) {
//            return $this->collections()->sync($params['collections']);
//        }
//        return [
//            "attached" => [],
//            "detached" => [],
//            "updated" => [],
//        ];
//    }
}
