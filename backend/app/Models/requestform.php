<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class requestform extends Model
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
        'cys',
        'e_signature',
        'status',
    ];

}
