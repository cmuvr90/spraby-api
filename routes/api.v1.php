<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\BrandController;
use App\Http\Controllers\v1\CategoriesController;

Route::group(['prefix' => '/brands'], static function () {
    Route::get('/list', [BrandController::class, 'list'])->name('brands.list');
    Route::get('/{id}', [BrandController::class, 'retrieve'])->name('brands.retrieve');
});

Route::group(['prefix' => '/categories'], static function () {
    Route::get('/list', [CategoriesController::class, 'list'])->name('categories.list');
    Route::get('/{id}', [CategoriesController::class, 'retrieve'])->name('categories.retrieve');
});
