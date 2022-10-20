<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection as LaravelCollection;

/**
 * Class Product
 * @package App\Models
 *
 * @property int $id
 * @property string $name
 * @property int $brand_id
 * @property int $image_id
 * @property int $collection_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Image $image
 * @property Collection $collection
 * @property LaravelCollection $options
 * @property LaravelCollection $images
 * @property LaravelCollection $variants
 *
 * @mixin Builder
 */
class Product extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'products';

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
    public const FIELDS = [
        'id',
        'name',
        'brand_id',
        'image_id',
        'collection_id',
        'created_at',
        'updated_at'
    ];

    /**
     * @var array
     */
    public const DEFAULT_RELATIONS = [
        'options',
        'image',
        'images',
        'collection.options',
        'variants.values.option',
        'variants.image'
    ];

    /**
     * @return BelongsTo
     */
    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    /**
     * @return HasMany
     */
    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    /**
     * @return BelongsToMany
     */
    public function options(): BelongsToMany
    {
        return $this->belongsToMany(Option::class, 'products_options');
    }

    /**
     * @return BelongsTo
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

    /**
     * @return BelongsToMany
     */
    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class, 'products_images');
    }

    /**
     * @param array $params
     * @return $this
     */
    public function updateProduct(array $params): Product
    {
        $this->updateOrCreate(['id' => $params['id']], self::getProductData($params));
        return $this;
    }

    /**
     * @param array $optionIds
     * @return $this
     */
    public function updateOptions(array $optionIds): Product
    {
        $this->options()->sync($optionIds);
        return $this;
    }

    /**
     * @param array $params
     * @param string $prefix
     * @return LengthAwarePaginator|LaravelCollection
     */
    public static function getProducts(array $params = [], string $prefix = 'products')
    {
        return self::getByDefaultParams($params, $prefix)
            ->whereBrand($params['brand_id'] ?? null)
            ->customPaginate($params['limit'] ?? null);
    }

    /**
     * @param int $id
     * @param array $params
     * @return BaseModel|BaseModel[]|Product|Builder|Builder[]|LaravelCollection|\Illuminate\Database\Eloquent\Model
     */
    public static function getProductById(int $id, array $params = [])
    {
        return self::customSelect($params['fields'] ?? null)
            ->whereBrand($params['brand_id'] ?? null)
            ->withRelations($params['with'] ?? self::DEFAULT_RELATIONS)
            ->find($id);
    }

    /**
     * @param array $params
     * @return array
     */
    public static function getProductData(array $params): array
    {
        return self::getModelData($params, self::FIELDS);
    }

    /**
     * @param array $params
     * @return Product
     */
    public static function createProduct(array $params): Product
    {
        return self::create(self::getProductData($params));
    }

    /**
     * @param array $productIds
     * @return Image[]|LaravelCollection
     */
    public static function getProductsImages(array $productIds = [])
    {
        return Image::select('images.*')->join('products_images', static function ($join) use ($productIds) {
            $join->on('products_images.image_id', 'images.id')
                ->whereIn('products_images.product_id', $productIds);
        })->get();
    }
}