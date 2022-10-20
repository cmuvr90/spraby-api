<?php

namespace App\Http\Controllers;

use App\Http\Requests\CollectionSaveRequest;
use App\Http\Requests\WithUserIdRequest;
use App\Http\Resources\CollectionResource;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CollectionController extends BaseController
{
    /**
     * @param WithUserIdRequest $request
     * @return Response
     */
    public function index(WithUserIdRequest $request): Response //get
    {
        $data = $request->has('limit') ? CollectionResource::paginate(Collection::getCollections($request->all())) :
            CollectionResource::collection(Collection::getCollections($request->all()));
        return response($data);
    }

    /**
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function show(int $id, Request $request): Response //get
    {
        $collection = Collection::getCollectionById($id, $request->all());
        $data = $collection ? CollectionResource::make($collection) : null;
        return response($data, $data ? 200 : 404);
    }

    /**
     * @param CollectionSaveRequest $request
     * @return Collection
     */
    public function store(CollectionSaveRequest $request): Collection //post
    {
        return Collection::createCollection($request->all());
    }

    /**
     * @param Collection $collection
     * @param CollectionSaveRequest $request
     * @return int
     */
    public function update(Collection $collection, CollectionSaveRequest $request): int //put
    {
        $collection->updateCollection($request->all());
        return $collection->id;
    }

    /**
     * @param Request $request
     * @return int
     */
    public function remove(Request $request): int //delete
    {
        $ids = explode(',', $request->get('ids'));
        return Collection::destroy($ids);
    }
}