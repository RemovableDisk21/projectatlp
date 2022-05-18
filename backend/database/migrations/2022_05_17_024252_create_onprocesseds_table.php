<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('onprocesseds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('reason')->nullable();
            $table->string('student_id');
            $table->string('faculty');
            $table->string('subject_code');
            $table->string('semester');
            $table->string('school_year');
            $table->string('e-sign_student')->nullable();
            $table->string('e-sign_faculty')->nullable();
            $table->string('e-sign_admin')->nullable();
            $table->string('status');
            $table->string('grades');
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
        Schema::dropIfExists('onprocesseds');
    }
};
