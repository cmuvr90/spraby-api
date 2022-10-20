<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateVariantValuesTable
 */
class CreateVariantValuesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(): void
	{
		Schema::create('variant_values', static function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('variant_id');
			$table->foreign('variant_id')->references('id')->on('variants')->onDelete('cascade');
			$table->unsignedBigInteger('option_id');
			$table->foreign('option_id')->references('id')->on('options')->onDelete('cascade');
			$table->string('value', 255);
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
		Schema::dropIfExists('variant_values');
	}
}