<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Services\CacheService;

/**
 * Class BaseController
 * @package App\Http\Controllers
 */
class BaseController extends Controller
{
    private CacheService $cache;

    /**
     * BaseController constructor.
     * @param CacheService $cache
     */
    public function __construct(CacheService $cache)
    {
        $this->cache = $cache;
    }

    /**
     * @param string $value
     * @return $this
     */
    public function setCacheName(string $value): self
    {
        $this->cache->setName($value);
        return $this;
    }

    /**
     * @param $function
     * @return mixed
     */
    public function cache($function): mixed
    {
        return $this->cache->cache($function);
    }
}
