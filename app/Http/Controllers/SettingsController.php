<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;

/**
 * Class BrandController
 * @package App\Http\Controllers
 */
class SettingsController extends BaseController
{

    public function getMenu()
    {
        $menu = Settings::first()->menu;
        return response($menu ?: [], 200);
    }

    /**
     * @param Request $request
     */
    public function saveMenu(Request $request)
    {
        $menu = $request->get('menu');

        $responce = Settings::saveMenu($menu);


        return response($responce, 200);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function createMenu(Request $request)
    {
        $menu = $request->get('menu');

        $responce = Settings::createMenu($menu);

        return response($responce, 200);
    }


    public function removeMenu(Request $request)
    {
    }

}
