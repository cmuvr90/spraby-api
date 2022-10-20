<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Brand;
use App\Models\Settings;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except(['logout', 'loginToManager', 'backToAdmin']);
    }

    /**
     * @param int $id
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function loginToManager(int $id, Request $request)
    {
        /**
         * @var User $user
         */
        $user = $request->user();
        $brand = $user->isAdmin() ? Brand::with('user')->find($id) : null;
        $manager = $brand && $brand->user ? $brand->user : null;

        if ($manager) {
            $this->logout($request);
            $request->session()->regenerate();
            $this->guard()->login($manager);
            Settings::setPreview(true);
            $user = $manager;
            $user->load('brand.collections.options');
        }

        return response(UserResource::make($user), 200);
    }

    /**
     * @param int $id
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function backToAdmin(int $id, Request $request) //@todo need middleware
    {
        /**
         * @var User $user
         */
        $manager = $request->user();
        $admin = $manager->isManager() ? User::getAdmin() : null;

        if ($admin) {
            $this->logout($request);
            $request->session()->regenerate();
            $this->guard()->login($admin);
            Settings::setPreview(false);
        }

        return response(UserResource::make($admin), 200);
    }
}