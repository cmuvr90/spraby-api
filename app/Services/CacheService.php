<?php


namespace App\Services;

use Illuminate\Config\Repository;
use Illuminate\Support\Facades\Cache;

class CacheService
{
    /**
     * @var string
     */
    private string $name;

    /**
     * @var int
     */
    private int $time;

    /**
     * @var bool
     */
    protected bool $cache;

    /**
     * CacheService constructor.
     * @param Repository $config
     */
    public function __construct(Repository $config)
    {
        $this->setName('storage');
        $this->setTime(60 * 60 * 24);
        $this->cache = $config->get('cache.cache');
    }

    /**
     * @param int $value
     * @return $this
     */
    public function setTime(int $value): self
    {
        $this->time = $value;
        return $this;
    }

    /**
     * @return int
     */
    public function getTime(): int
    {
        return $this->time;
    }

    /**
     * @param string $value
     * @return $this
     */
    public function setName(string $value): self
    {
        $this->name = $value;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param $function
     * @return mixed
     */
    public function cache($function): mixed
    {
        return $this->cache ? Cache::remember($this->name, $this->time, $function) : $function();
    }
}
