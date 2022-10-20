<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateOptionsTable
 */
class CreateOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('options', static function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['select', 'text', 'color']);
            $table->string('title', 255);
            $table->string('name', 255);
            $table->string('description', 500)->nullable();
            $table->jsonb('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('options');
    }
}