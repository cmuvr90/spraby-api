<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\View\View;
use JavaScript;

/**
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class IndexController extends Controller
{
    /**
     * @param Request $request
     * @return View
     */
    public function index(Request $request): View
    {
        /**
         * @var User $user
         */

        $user = $request->user();
        if ($user->isManager()) {
            $user->load('brand.collections.options');
        }

        JavaScript::put([
            'user' => UserResource::make($user),
            'isPreview' => Settings::isPreview()
        ]);

        return view('templates.admin');
    }
}