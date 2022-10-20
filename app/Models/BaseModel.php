<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class BaseModel
 * @package App\Models
 *
 * @method Builder|BaseModel customSelect(?array $fields)
 * @method LengthAwarePaginator|Collection customPaginate(?int $limit)
 * @method Builder|BaseModel search(string $field, string $value)
 * @method Builder|BaseModel sort(string $value)
 * @method Builder|BaseModel whereBrand(int $brandId)
 * @method Builder|BaseModel whereBrandByUserId(int $brandId, ?string $table = '')
 * @method Builder|BaseModel withRelations(string $value)
 * @method Builder|BaseModel getByDefaultParams(array $params, string $prefix)
 */
class BaseModel extends Model
{

    /**
     * @param array $params
     * @return BaseModel|Builder
     */
    public function index(array $params = []): Builder|BaseModel
    {
        $fields = $params['fields'] ?? [];

        return $this->customSelect($fields);


//        $limit = $params['limit'] ?? null;
//        $sort = isset($params['sort']) ? $prefix . '.' . $params['sort'] : null;
//        $search = $params['search'] ?? null;
//        $fields = isset($params['fields']) ? self::getPrepareFields($params['fields'], $prefix . '.') : [$prefix . '.*'];
//        $with = $params['with'] ?? null;

//        return self::customSelect($fields)->search($prefix . '.name', $search)
//            ->sort($sort)
//            ->withRelations($with);


//        return self::getByDefaultParams($params, $prefix)->customPaginate($limit);
    }

    /**
     * @param Builder $query
     * @param null $fields
     * @return Builder
     */
    public function scopeCustomSelect(Builder $query, $fields = null): Builder
    {
        return $fields ? $query->select($fields) : $query;
    }


//    /**
//     * @param array $params
//     * @param string $prefix
//     * @return LengthAwarePaginator
//     */
//    public static function list(array $params = [], string $prefix = '')
//    {
//        $limit = $params['limit'] ?? 250;
//        return self::getByDefaultParams($params, $prefix)->paginate($limit);
//    }
//
//
//    /**
//     * @param string $fields
//     * @param string $prefix
//     * @return string[]
//     */
//    public static function getPrepareFields(string $fields = '', string $prefix = ''): array
//    {
//        return array_map(static function ($field) use ($prefix) {
//            return $prefix . trim($field);
//        }, explode(',', $fields));
//    }
//
//
//    /**
//     * @param array $params
//     * @param string $prefix
//     * @return LengthAwarePaginator|Collection
//     */
//    public static function index(array $params = [], string $prefix = '')
//    {
//        $limit = $params['limit'] ?? null;
//        return self::getByDefaultParams($params, $prefix)->customPaginate($limit);
//    }
//
//    /**
//     * @param string|null $newImageSrc
//     * @return bool
//     */
//    public function refreshImage(string $newImageSrc = null): bool
//    {
//        /**
//         * @var Image $currentImage
//         */
//        $currentImage = $this->getRelationValue('image');
//
//        if ($newImageSrc) {
//            if ($currentImage) {
//                if ($newImageSrc !== $currentImage->src) {
//                    $currentImage->updateImage(['src' => $newImageSrc]);
//                    return true;
//                }
//            } else {
//                $image = Image::createImage(['src' => $newImageSrc]);
//                $this->{'image_id'} = $image->id;
//                $this->save();
//                return true;
//            }
//        } else {
//            if ($currentImage) {
//                $currentImage->delete();
//                return true;
//            }
//        }
//        return false;
//    }
//
//    /**
//     * @param array $params
//     * @param array $fields
//     * @return array
//     */
//    public static function getModelData(array $params = [], array $fields = []): array
//    {
//        $data = [];
//        foreach ($fields as $field) {
//            if (array_key_exists($field, $params)) {
//                $data[$field] = $params[$field];
//            }
//        }
//        return $data;
//    }
//
//    //Scopes
//
//    public function scopeGetByDefaultParams(Builder $query, array $params = [], string $prefix = ''): Builder
//    {
//        $sort = isset($params['sort']) ? $prefix . '.' . $params['sort'] : null;
//        $search = $params['search'] ?? null;
//        $fields = isset($params['fields']) ? self::getPrepareFields($params['fields'], $prefix . '.') : [$prefix . '.*'];
//        $with = $params['with'] ?? null;
//
//        return self::customSelect($fields)->search($prefix . '.name', $search)
//            ->sort($sort)
//            ->withRelations($with);
//    }
//
//    /**
//     * @param Builder $query
//     * @param $field
//     * @param string|null $value
//     * @return Builder
//     */
//    public function scopeSearch(Builder $query, $field, ?string $value = ''): Builder
//    {
//        if ($value) {
//            return $query->where($field, 'LIKE', '%' . $value . '%');
//
//            //@todo:refactor
////			$conditions = [];
////			$valueItems = explode(',', $value);
////			foreach ($valueItems as $item) {
////				if (strpos($item, ':') !== false) {
////					$itemData = explode(':', $item);
////					$conditions[] = [$itemData[0], 'LIKE', '%' . $itemData[1] . '%'];
////				}
////			}
////			if ($conditions) {
////				return $query->where($conditions);
////			}
//        }
//        return $query;
//    }
//
//    /**
//     * @param Builder $query
//     * @param int|null $limit
//     * @return LengthAwarePaginator|Builder[]|Collection
//     */
//    public function scopeCustomPaginate(Builder $query, ?int $limit = null)
//    {
//        return $limit ? $query->paginate($limit) : $query->get();
//    }
//
//    /**
//     * @param Builder $query
//     * @param array|null $fields
//     * @return Builder
//     */
//    public function scopeCustomSelect(Builder $query, $fields = null): Builder
//    {
//        $fields = is_array($fields) ? $fields : (is_string($fields) ? self::getPrepareFields($fields) : null);
//        return $fields ? $query->select($fields) : $query;
//    }
//
//    /**
//     * @param Builder $query
//     * @param string|null $value
//     * @return Builder
//     */
//    public function scopeSort(Builder $query, ?string $value = ''): Builder
//    {
//        if ($value && strpos($value, ':') !== false) {
//            $valueData = explode(':', $value);
//            return $query->orderBy($valueData[0], $valueData[1]);
//        }
//        return $query;
//    }
//
//    /**
//     * @param Builder $query
//     * @param null $brandId
//     * @return Builder
//     */
//    public function scopeWhereBrand(Builder $query, $brandId = null): Builder
//    {
//        if ($brandId) {
//            return $query->where('brand_id', $brandId);
//        }
//        return $query;
//    }
//
//    /**
//     * @param Builder $query
//     * @param null $userId
//     * @param string $table
//     * @return Builder
//     */
//    public function scopeWhereBrandByUserId(Builder $query, $userId = null, string $table = 'products'): Builder
//    {
//        if ($userId) {
//            return $query->join('brands', static function ($join) use ($userId, $table) {
//                $join->on('brands.id', $table . '.brand_id')->where('brands.user_id', $userId);
//            });
//        }
//        return $query;
//    }
//
//    /**
//     * @param Builder $query
//     * @param null $value
//     * @return Builder
//     */
//    public function scopeWithRelations(Builder $query, $value = null): Builder
//    {
//        $value = is_array($value) ? $value : (is_string($value) ? explode(',', $value) : null);
//        return $value ? $query->with($value) : $query;
//    }
}
