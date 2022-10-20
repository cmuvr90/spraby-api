<?php

namespace App\Http\Controllers;

use App\Http\Requests\OptionSaveRequest;
use App\Http\Resources\OptionResource;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 *
 */
class OptionsController extends BaseController
{
    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response //get
    {
        $data = $request->all();
        if (!isset($data['limit'])) $data['limit'] = 10;
        return response(OptionResource::paginate(Option::getOptions($data)));
    }

    /**
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function show(int $id, Request $request): Response //get
    {
        $option = Option::getOptionById($id, $request->all());
        $data = $option ? OptionResource::make($option) : null;
        return response($data, $data ? 200 : 404);
    }

    /**
     * @param OptionSaveRequest $request
     * @return Option
     */
    public function store(OptionSaveRequest $request): Option //post
    {
        return Option::createOption($request->all());
    }

    /**
     * @param Option $option
     * @param OptionSaveRequest $request
     * @return int
     */
    public function update(Option $option, OptionSaveRequest $request): int //put
    {
        $option->updateOption($request->all());
        return $option->id;
    }

    /**
     * @param Request $request
     * @return int
     */
    public function remove(Request $request): int //delete
    {
        $ids = explode(',', $request->get('ids'));
        return Option::destroy($ids);
    }
}