<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property array $menu 'json'
 * @property boolean $is_preview
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @mixin Builder
 */
class Settings extends Model
{
    /**
     * @var string
     */
    protected $table = 'settings';

    /**
     * @var array
     */
    protected $guarded = [];

    /**
     * @var array
     */
    protected $casts = [
        'menu' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * @param $menu
     * @return Model|Settings
     */
    public static function createMenu($menu)
    {
        return (new Settings)->create(['menu' => $menu]);
    }

    /**
     * @param $menu
     * @return bool
     */
    public static function saveMenu($menu): bool
    {
        return (new Settings)->first()->update(['menu' => $menu]);
    }

    /**
     * @param bool $value
     * @return bool
     */
    public static function setPreview(bool $value): bool
    {
        return (new Settings)->first()->update(['is_preview' => $value]);
    }

    /**
     * @return bool
     */
    public static function isPreview(): bool
    {
        return (new Settings)->first()->is_preview;
    }
}
