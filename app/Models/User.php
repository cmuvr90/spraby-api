<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Class User
 * @package App\Models
 *
 * @property int $id
 * @property string $name
 * @property string $role enum:['admin', 'manager', 'customer']
 * @property string $email
 * @property Carbon $email_verified_at
 * @property string $password
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @method Builder|User onlyManagers()
 * @method Builder|User free(?bool $isFree)
 * @method Builder|User search(string $field, ?string $value)
 * @method Builder|User sort(?string $value)
 * @method LengthAwarePaginator|Collection customPaginate(?int $limit)
 *
 * @property Brand $brand
 *
 * @mixin Builder
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * @return HasOne
     */
    public function brand(): HasOne
    {
        return $this->hasOne(Brand::class);
    }

    /**
     * @var array
     */
    public const RESOURCE_FIELDS = ['id', 'role', 'name', 'email'];

    /**
     * @var array
     */
    public const ROLES = [
        'admin' => 'admin',
        'manager' => 'manager',
        'customer' => 'customer'
    ];

    /**
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->role === self::ROLES['admin'];
    }

    /**
     * @return bool
     */
    public function isManager(): bool
    {
        return $this->role === self::ROLES['manager'];
    }

    /**
     * @return User|null
     */
    public static function getAdmin(): ?User
    {
        return self::where('role', self::ROLES['admin'])->first();
    }

    /**
     * @param array $params
     * @return LengthAwarePaginator|Collection
     */
    public static function getUsers(array $params = [])
    {
        return self::select(['users.id', 'users.name', 'users.email', 'users.role'])
            ->onlyManagers()
            ->free($params['free'] ?? 10)
            ->search('users.name', $params['search'] ?? null)
            ->sort($params['sort'] ?? null)
            ->customPaginate($params['limit'] ?? 10);
    }

    /**
     * @param Builder $query
     * @param string $field
     * @param string|null $value
     * @return Builder
     */
    public function scopeSearch(Builder $query, string $field, ?string $value = ''): Builder
    {
        if ($value) {
            return $query->where($field, 'LIKE', '%' . $value . '%');
        }
        return $query;
    }

    /**
     * @param Builder $query
     * @param string|null $value
     * @return Builder
     */
    public function scopeSort(Builder $query, ?string $value = ''): Builder
    {
        if ($value && strpos($value, ':') !== false) {
            $valueData = explode(':', $value);
            return $query->orderBy($valueData[0], $valueData[1]);
        }
        return $query;
    }

    /**
     * @param Builder $query
     * @return Builder
     */
    public function scopeOnlyManagers(Builder $query): Builder
    {
        return $query->where('role', self::ROLES['manager']);
    }

    /**
     * @param Builder $query
     * @param int|null $limit
     * @return LengthAwarePaginator|Builder[]|Collection
     */
    public function scopeCustomPaginate(Builder $query, ?int $limit = null)
    {
        return $limit ? $query->paginate($limit) : $query->get();
    }

    /**
     * @param Builder $query
     * @param bool|null $isFree
     * @return Builder
     */
    public function scopeFree(Builder $query, bool $isFree = null): Builder
    {
        return $isFree ? $query->leftJoin('brands', 'brands.user_id', 'users.id')
            ->whereNull('brands.user_id') : $query;
    }
}
