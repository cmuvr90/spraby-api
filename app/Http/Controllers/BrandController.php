<?php

namespace App\Http\Controllers;

use App\Helpers\RequestHelper;
use App\Http\Requests\BrandSaveRequest;
use App\Http\Requests\WithUserIdRequest;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class BrandController
 * @package App\Http\Controllers
 */
class BrandController extends BaseController
{

    public function list(Request $request)
    {
        return response(BrandResource::paginate(Brand::list(RequestHelper::getQueryParams($request))));
    }


//    /**
//     * @param WithUserIdRequest $request
//     * @return Response
//     */
//    public function index(WithUserIdRequest $request): Response //get
//    {
//        $data = $request->all();
//        if (!isset($data['limit'])) $data['limit'] = 10;
//        return response(BrandResource::paginate(Brand::getBrands($data)));
//    }
//
//    /**
//     * @param int $id
//     * @param Request $request
//     * @return Response
//     */
//    public function show(int $id, Request $request): Response //get
//    {
//        $brand = Brand::getBrandById($id, $request->all());
//        $data = $brand ? BrandResource::make($brand) : null;
//        return response($data, $data ? 200 : 404);
//    }
//
//    /**
//     * @param BrandSaveRequest $request
//     * @param ImageService $imageService
//     * @return Brand
//     */
//    public function store(BrandSaveRequest $request, ImageService $imageService): Brand //post
//    {
//        $data = $request->all();
//        $brand = Brand::createBrand($request->all());
//        $imageService->setParams($brand, $data['image'])->uploadImage();
//        return $brand;
//    }
//
//    /**
//     * @param Brand $brand
//     * @param BrandSaveRequest $request
//     * @param ImageService $imageService
//     * @return int
//     */
//    public function update(Brand $brand, BrandSaveRequest $request, ImageService $imageService): int //put
//    {
//        $data = $request->all();
//        $imageService->setParams($brand, $data['image'])->uploadImage();
//        $brand->updateBrand($data);
//        return $brand->id;
//    }
//
//    /**
//     * @param Request $request
//     * @return int
//     */
//    public function remove(Request $request): int //delete
//    {
//        $ids = explode(',', $request->get('ids'));
//        return Brand::destroy($ids);
//    }
}
