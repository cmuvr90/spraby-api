<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Admin;

use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::post('login', [Auth\LoginController::class, 'login'])->name('login');
//Route::post('logout', [Auth\LoginController::class, 'logout'])->name('logout');

Auth::routes();

Route::group(['prefix' => '/auth'], static function () {
    Route::get('/', [Admin\IndexController::class, 'index'])->name('index');
    Route::get('/{first}', [Admin\IndexController::class, 'index']);
    Route::get('/{first}/{second}', [Admin\IndexController::class, 'index']);
});

Route::group(['prefix' => '/manager'], static function () {
    Route::post('/{id}/login', [Controllers\Auth\LoginController::class, 'loginToManager'])->name('loginToManager');
    Route::post('/{id}/logout', [Controllers\Auth\LoginController::class, 'backToAdmin'])->name('backToAdmin');
});


//managers

Route::group(['prefix' => '/api'], static function () {

    Route::group(['prefix' => '/brands'], static function () {
        Route::get('/list', [Controllers\BrandController::class, 'list'])->name('brandsGet');
    });


//    Route::resource('brands', Controllers\BrandController::class)->except(['create', 'edit', 'destroy']);
//    Route::group(['prefix' => '/brands'], static function () {
//        Route::delete('/remove', [Controllers\BrandController::class, 'remove'])->name('removeBrands');
//    });

//    Route::resource('options', Controllers\OptionsController::class)->except(['create', 'edit', 'destroy']);
//    Route::group(['prefix' => '/options'], static function () {
//        Route::delete('/remove', [Controllers\OptionsController::class, 'remove'])->name('removeOptions');
//    });
//
//    Route::resource('products', Controllers\ProductController::class)->except(['create', 'edit', 'destroy']);
//    Route::group(['prefix' => '/products'], static function () {
//        Route::delete('/remove', [Controllers\ProductController::class, 'remove'])->name('removeProducts');
//    });
//
//    Route::resource('categories', Controllers\CategoryController::class)->except(['create', 'edit', 'destroy']);
//    Route::group(['prefix' => '/categories'], static function () {
//        Route::delete('/remove', [Controllers\CategoryController::class, 'remove'])->name('removeCategories');
//    });
//
//    Route::resource('collections', Controllers\CollectionController::class)->except(['create', 'edit', 'destroy']);
//    Route::group(['prefix' => '/collections'], static function () {
//        Route::delete('/remove', [Controllers\CollectionController::class, 'remove'])->name('removeCollections');
//    });
});
