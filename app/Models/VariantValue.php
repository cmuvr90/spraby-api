<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

/**
 * Class VariantValue
 * @package App\Models
 *
 * @property int $id
 * @property int $variant_id
 * @property int $option_id
 * @property string $value
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Option $option
 *
 * @mixin Builder
 */
class VariantValue extends Model
{
    /**
     * @var string
     */
    protected $table = 'variant_values';

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
     * @return BelongsTo
     */
    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class);
    }

    /**
     * @return BelongsTo
     */
    public function option(): BelongsTo
    {
        return $this->belongsTo(Option::class);
    }

    /**
     * @param array $params
     * @return array
     */
    public static function getValueData(array $params): array
    {
        return [
            'variant_id' => $params['variant_id'],
            'option_id' => $params['option_id'],
            'value' => $params['value']
        ];
    }

    /**
     * @param array $params
     * @return VariantValue
     */
    public static function createValue(array $params): VariantValue
    {
        return (new VariantValue())->create(self::getValueData($params));
    }

    /**
     * @param array $params
     * @return $this
     */
    public function updateValue(array $params): VariantValue
    {
        return $this->updateOrCreate(['id' => $params['id']], self::getValueData($params));
    }

    /**
     * @return bool|null
     */
    public static function removeUnusedValues(): ?bool
    {
        return self::select('variant_values.id')
            ->join('variants', function ($join) {
                $join->on('variants.id', 'variant_values.variant_id')
                    ->join('products', function ($join) {
                        $join->on('products.id', 'variants.product_id')
                            ->join('products_options', 'products_options.product_id', 'products.id')
                            ->join('options', 'options.id', 'products_options.option_id')
                            ->leftJoin('collections_options', function ($join) {
                                $join->on('collections_options.option_id', 'options.id')
                                    ->whereRaw('collections_options.collection_id = products.collection_id');
                            })
                            ->whereNull('collections_options.option_id');
                    })
                    ->whereRaw('variant_values.option_id = options.id');
            })->delete();
    }
}