<?php

namespace App\Console\Commands;

use App\Models\Brand;
use Illuminate\Console\Command;

class testRun extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $dd = Brand::list();

        dd($dd);
    }
}
