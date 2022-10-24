<?php

namespace App\Observers;

use Illuminate\Support\Facades\Cache;

class BrandsObserver
{
    public function created()
    {
        Cache::forget('api');
    }
}
