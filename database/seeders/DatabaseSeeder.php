<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(SettingsSeeder::class);
        $this->call(OptionSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(BrandSeeder::class);
//        $this->call(ProductSeeder::class);
//        $this->call(VariantSeeder::class);
    }
}
