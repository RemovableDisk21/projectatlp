<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class onprocessed extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'student_id',
        'faculty_name',
        'subject_code',
        'semester',
        'school_year',
        'reason',
        'e-sign_student',
        'e-sign_faculty',
        'e-sign_admin',
        'grades',
        'remarks',
        'status',

    ];
}
