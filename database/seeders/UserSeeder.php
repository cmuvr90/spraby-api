<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Class UserSeeder
 * @package Database\Seeders
 */
class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('users')->delete();
		self::createAdmin();
		self::CreateManagers(10);
	}

	/**
	 * @param int $count
	 */
	private static function CreateManagers(int $count = 2)
	{
		while ($count > 0) {
			self::createManager($count . '');
			$count--;
		}
	}

	/**
	 * @param string $index
	 */
	private static function createManager(string $index = '')
	{
		User::create([
			'name' => 'Manager' . $index,
			'role' => User::ROLES['manager'],
			'email' => 'manager' . $index . '@mail.ru',
			'password' => Hash::make('12qw34er')
		]);
	}

	/**
	 *
	 */
	private static function createAdmin()
	{
		User::create([
			'name' => 'Admin',
			'role' => User::ROLES['admin'],
			'email' => 'admin@mail.ru',
			'password' => Hash::make('12qw34er')
		]);
	}
}
