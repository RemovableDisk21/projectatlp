<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class assignfaculty extends Model
{
    use HasFactory;
    protected $fillable = [
        'faculty',
        'code',
        
    ];
}
