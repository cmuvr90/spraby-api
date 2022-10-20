<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductSaveRequest;
use App\Http\Requests\WithUserIdRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ImageService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 *
 */
class ProductController extends BaseController
{
    /**
     * @param WithUserIdRequest $request
     * @return Response
     */
    public function index(WithUserIdRequest $request): Response //get
    {
        $data = $request->all();
        if (!isset($data['limit'])) $data['limit'] = 10;
        return response(ProductResource::paginate(Product::getProducts($data)));
    }

    /**
     * @param int $id
     * @param WithUserIdRequest $request
     * @return Response
     */
    public function show(int $id, WithUserIdRequest $request): Response //get
    {
        $product = Product::getProductById($id, $request->all());
        $data = $product ? ProductResource::make($product) : null;
        return response($data, $data ? 200 : 404);
    }

    /**
     * @param ProductSaveRequest $request
     * @param ProductService $productService
     * @return Product
     */
    public function store(ProductSaveRequest $request, ProductService $productService): Product
    {
        $data = $request->all();
        $product = $productService->setParams($data)->create();
        $productService->uploadImages()->updateVariants();
        return Product::getProductById($product->id, ['brand_id', $data['brand_id']]);
    }

    /**
     * @param Product $product
     * @param ProductSaveRequest $request
     * @param ProductService $productService
     * @return Product
     */
    public function update(Product $product, ProductSaveRequest $request, ProductService $productService): Product //put
    {
        $data = $request->all();
        $productService->init($product, $data)->update()->uploadImages()->updateVariants();
        return Product::getProductById($product->id, ['brand_id', $data['brand_id']]);
    }

    /**
     * @param Product $product
     * @return bool|null
     */
    public function destroy(Product $product): ?bool //delete
    {
        return $product->delete();
    }

    /**
     * @param Request $request
     * @param ImageService $imageService
     * @return int
     */
    public function remove(Request $request, ImageService $imageService): int //delete
    {
        $ids = $request->has('ids') ? explode(',', $request->get('ids')) : null;
        $imagePaths = $ids ? Product::getProductsImages($ids)->pluck('src')->toArray() : [];

        if ($imagePaths) {
            $imageService->removeImageFromDisk($imagePaths);
        }
        return Product::destroy($ids);
    }
}
