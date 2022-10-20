<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends BaseController
{
    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $data = $request->all();
        if (!isset($data['limit'])) $data['limit'] = 10;
        $data['free'] = true;
        return response(UserResource::paginate(User::getUsers($data)));
    }
}
