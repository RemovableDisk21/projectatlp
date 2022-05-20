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
        'faculty',
        'subject_code',
        'semester',
        'school_year',
        'reason',
        'e_sign_student',
        'e_sign_faculty',
        'e_sign_admin',
        'grades',
        'cys',
        'remarks',
        'status',
        'dean'

    ];
}
