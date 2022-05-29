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
            $table->longText('e_sign_student',8000000);
            $table->longText('e_sign_faculty',8000000);
            $table->longText('e_sign_admin',8000000);
            $table->string('dean');
            $table->string('status');
            $table->string('grades');
            $table->string('cys');
            $table->string('remarks');
            $table->string('student_email');
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
