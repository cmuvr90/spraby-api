<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\BrandController;

Route::group(['prefix' => '/brands'], static function () {
    Route::middleware('brands.list')->get('/list', [BrandController::class, 'list'])->name('brands.list');
});
