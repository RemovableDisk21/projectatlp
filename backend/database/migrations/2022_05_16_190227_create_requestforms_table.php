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
        Schema::create('requestforms', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('student_id')->nullable();
            $table->string('faculty');
            $table->string('subject_code');
            $table->string('semester');
            $table->string('school_year');
            $table->string('cys');
            $table->string('reason')->nullable();
            $table->longText('e_signature', 8000000)->nullable();
            $table->string('status');
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
        Schema::dropIfExists('requestforms');
    }
};
