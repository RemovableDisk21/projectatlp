<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('userid')->nullable();
            $table->string('name')->nullable();
            $table->string('lastname')->nullable();
            $table->string('student_id')->nullable();
            $table->string('employee_id')->nullable();
            $table->string('email')->nullable();
            $table->string('number')->nullable();
            $table->string('course')->nullable();
            $table->string('year')->nullable();
            $table->string('section')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};
