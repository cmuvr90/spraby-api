<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('brands')->delete();
		$users = User::where('role', User::ROLES['manager'])->get();
		foreach ($users as $user) {
			self::createBrand($user);
		}
	}

	private function createBrand(User $user)
	{
		Brand::create([
			'user_id' => $user->id,
			'name' => 'Brand by ' . $user->name,
			'description' => 'This brand belongs to user ' . $user->name,
		]);
	}
}