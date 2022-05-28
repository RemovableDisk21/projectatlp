<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    use HasFactory;


    protected $fillable = [
        'userid',
        'name',
        'lastname',
        'student_id',
        'employee_id',
        'number',
        'course',
        'year',
        'section',
        'email',
        'password',
        'role',
        'status',
        'e_signature'
    ];
}
