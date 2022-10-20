<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Variant
 * @package App\Models
 *
 * @property int $id
 * @property string $name
 * @property int $product_id
 * @property int $image_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Collection $values
 * @property Image $image
 *
 * @mixin Builder
 */
class Variant extends Model
{
    /**
     * @var string
     */
    protected $table = 'variants';

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
    public const FIELDS = ['id', 'name', 'product_id', 'image_id', 'created_at', 'updated_at'];

    /**
     * @var array
     */
    public const DEFAULT_RELATIONS = ['options.values', 'image'];

    /**
     * @return HasMany
     */
    public function values(): HasMany
    {
        return $this->hasMany(VariantValue::class);
    }

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
    public static function getVariantData(array $params): array
    {
        return [
            'name' => $params['name'],
            'product_id' => $params['product_id'],
            'image_id' => $params['image_id']
        ];
    }

    /**
     * @param array $params
     * @return Variant
     */
    public static function createVariant(array $params): Variant
    {
        $variant = (new Variant())->create(self::getVariantData($params));
        $variant->updateValues($params);
        return $variant;
    }

    /**
     * @param array $params
     * @return $this
     */
    public function updateVariant(array $params): Variant
    {
        $this->updateOrCreate(['id' => $params['id']], self::getVariantData($params));
        $this->updateValues($params);
        return $this;
    }

    /**
     * @param array $params
     */
    public function updateValues(array $params)
    {
        if (isset($params['values'])) {
            if ($this->values) $this->removeUnusedValues($params['values']);
            foreach ($params['values'] as $value) {
                /**
                 * @var VariantValue $variantValue
                 */
                $prepareParams = array_merge($value, ['variant_id' => $this->id]);
                $variantValue = $this->values->where('id', $value['id'])->first();
                $variantValue ? $variantValue->updateValue($prepareParams) :
                    VariantValue::createValue($prepareParams);
            }
        }
    }

    /**
     * @param array $values
     */
    public function removeUnusedValues(array $values)
    {
        $beforeIds = $this->values->pluck('id')->toArray();
        $afterIds = array_map(function ($value) {
            return $value['id'];
        }, $values);
        $removeIds = array_diff($beforeIds, $afterIds);
        VariantValue::destroy($removeIds);
    }

    /**
     * @return bool|null
     */
    public static function removeEmptyVariants(): ?bool
    {
        return self::leftJoin('variant_values', 'variant_values.variant_id', 'variants.id')
            ->whereNull('variant_values.variant_id')
            ->delete();
    }
}
