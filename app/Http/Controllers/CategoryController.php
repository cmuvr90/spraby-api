<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategorySaveRequest;
use App\Http\Requests\WithUserIdRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class CategoryController extends BaseController
{
    /**
     * @param WithUserIdRequest $request
     * @return Response
     */
    public function index(WithUserIdRequest $request): Response //get
    {
        $data = $request->has('limit') ? CategoryResource::paginate(Category::getCategories($request->all())) :
            CategoryResource::collection(Category::getCategories($request->all()));
        return response($data);
    }

    /**
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function show(int $id, Request $request): Response //get
    {
        $category = Category::getCategoryById($id, $request->all());
        $data = $category ? CategoryResource::make($category) : null;
        return response($data, $data ? 200 : 404);
    }

    /**
     * @param CategorySaveRequest $request
     * @return Category
     */
    public function store(CategorySaveRequest $request): Category //post
    {
        return Category::createCategory($request->all());
    }

    /**
     * @param Category $category
     * @param CategorySaveRequest $request
     * @param ImageManager $imageManager
     * @return int
     */
    public function update(Category $category, CategorySaveRequest $request, ImageManager $imageManager): int //put
    {
        $data = $request->all();

        $imageSrc = $imageManager->refresh('/category/' . $category->id, $category->image->src ?? null, $data['image']['src'] ?? null);
        if (isset($data['image']['src'])) {
            $data['image']['src'] = $imageSrc;
        }

        $category->updateCategory($data);
        return $category->id;
    }

    /**
     * @param Request $request
     * @return int
     */
    public function remove(Request $request): int //delete
    {
        $ids = explode(',', $request->get('ids'));
        return Category::destroy($ids);
    }
}
