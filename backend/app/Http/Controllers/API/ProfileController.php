<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\onprocessed;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\requestform;
use App\Models\subject;
use App\Models\subjects;
class ProfileController extends Controller
{
    //
    public function profile(Request $request)
    {
        $validator = Validator::make($request ->all(),[
            'name'=>'required',
            'number'=>'required',
            'course'=>'required',
            'year'=>'required',
            'student_id'=>'required',
            'email'=>'required|email|max:191|unique:users,email',
            'section'=>'required',

        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),
                'message'=>'ano mali ko'
            ]);
        }
        else
        {
            $profile = Profile::create([ //eto sa table
                'name'=> $request->name,
                'number'=> $request->number,
                 'course'=> $request->course,
                 'year'=> $request->year,
                'student_id'=> $request->student_id,
                'employee_id'=> $request->employee_id,
                'email'=> $request->email,
                'section'=> $request->section,

            ]);

         return response()->json([
            'status'=>200,
            'username'=>$profile->name,
            'message'=>'Registered Successfully'
        ]);
        }

    }


    public function faculty_profile(Request $request , $id)
    {
        $validator = Validator::make($request ->all(),[
            'name'=>'required',
             'number'=>'required',



        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),

            ]);
        }
        else
        {
            $profile = Profile::find($id);
            $profile->name= $request->name;
            $profile->number= $request->number;
            $profile->email= $request->email;
            $profile->update();

         return response()->json([
            'status'=>200,
            'username'=>$profile->name,
            'message'=>'Registered Successfully'
        ]);
        }

    }

    public function getprofile($id)
    {
        $profile = Profile::where("userid",$id)->first();
        if($profile){
            return response()->json([
                'status'=> 200,
                'profile'=>$profile,
            ]);
        }

    }

    public function subject(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'code'=>'required|max:191',
            'name'=>'required|max:191',
            'syandsem'=>'required|max:191',

        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $user = subject::create([ //eto sa table
                'code'=> $request->code,
                'name'=> $request->name,
                'syandsem'=> $request->syandsem,
            ]);
            return response()->json([
                'status'=> 200,
                'message'=>'Student Added Successfully',
            ]);
        }

    }

    public function codes()
    {
        $subject = subject::all();
        return response()->json([
            'status'=> 200,
            'subject'=>$subject,

        ]);
    }


    public function deletestudent($id)
    {
        $student = subject::find($id);
        if($student)
        {
            $student->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Student Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Student ID Found',
            ]);
        }
    }


    public function student_profile (Request $request, $id)
    {
        $validator = Validator::make($request ->all(),[
            'name'=>'required',
            'course'=>'required',
            'year'=>'required',
            'section'=>'required',
            'number'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),

            ]);
        }
        else
        {
            $profile = Profile::find($id);
            $profile->name= $request->name;
            $profile->email= $request->email;
            $profile->course= $request->course;
            $profile->year= $request->year;
            $profile->section= $request->section;
            $profile->number= $request->number;
            $profile->update();

         return response()->json([
            'status'=>200,
            'username'=>$profile->name,
            'message'=>'Registered Successfully'
        ]);
        }

    }



    public function deletestudents($id)
    {
        $student = requestform::find($id);
        if($student)
        {
            $student->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Student Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Student ID Found',
            ]);
        }
    }



}
