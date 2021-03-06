<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\AssignController;



Route::post('requestform',[AssignController::class, 'requestform']);

Route::get('getprofile/{id}',[ProfileController::class, 'getprofile']);
Route::get('faculties',[AuthController::class, 'Faculties']);

Route::get('requestprof',[AssignController::class, 'requesprof']);
Route::post('profile',[AuthController::class, 'profile']);

Route::put('faculty_profile/{id}',[ProfileController::class, 'faculty_profile']);
Route::put('faculty_signature/{id}',[ProfileController::class, 'faculty_signature']);
Route::put('student_profile/{id}',[ProfileController::class, 'student_profile']);
Route::put('student_signature/{id}',[ProfileController::class, 'student_signature']);
Route::put('admin_signature/{id}',[ProfileController::class, 'admin_signature']);
Route::post('register',[AuthController::class, 'register']);
Route::post('register_admin',[AuthController::class, 'register_admin']);
Route::post('register_faculty',[AuthController::class, 'faculty']);
Route::post('login',[AuthController::class, 'login']);
Route::post('admin_login',[AuthController::class, 'logins']);

Route::get('pendingfaculty',[AuthController::class, 'index']); // eto sa view student kaliwa sa url kanan sa function
Route::put('update/{id}',[AuthController::class, 'update']);// eto sa updating na pending faculty
Route::put('updated/{id}',[AuthController::class, 'updated']);// eto sa updating na pending faculty

Route::put('processed/{id}',[AuthController::class, 'updating']);// eto sa updating na pending faculty

Route::put('updating/{id}',[AssignController::class, 'updatestudent']);
Route::delete('delete-faculty/{id}',[AuthController::class, 'delete']);
Route::delete('delete-students/{id}',[ProfileController::class, 'deletestudents']);

Route::put('save',[ProfileController::class, 'save']);// eto sa updating na pending faculty

Route::get('getprof/{id}',[ProfileController::class, 'getprof']);
Route::delete('delete-student/{id}', [ProfileController::class, 'destroy']);
Route::get('acceptedfaculty',[AuthController::class, 'accepted']);
Route::delete('delete-faculties/{id}',[AuthController::class, 'deletefaculty']);

Route::get('student',[AuthController::class, 'student']);

Route::get('onprocessed',[AuthController::class, 'onprocessed']);

Route::get('done',[AuthController::class, 'done']);
Route::get('pendingstudent',[AssignController::class, 'pendingstudent']);
Route::get('acceptedstudent',[AssignController::class, 'acceptedstudents']);
Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('logout',[AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

