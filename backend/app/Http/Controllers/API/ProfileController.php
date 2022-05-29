<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\onprocessed;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\requestform;
class ProfileController extends Controller
{
    //
    public function profile(Request $request)
    {
        $validator = Validator::make($request->all(),[
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
            ]);
        }
        else
        {
            $profile = Profile::create([
                'name'=> $request->name,
                'number'=> $request->number,
                'student_id'=> $request->student_id,
                'employee_id'=> $request->employee_id,
                'email'=> $request->email,
                'course'=> $request->course,
                'year'=> $request->year,
                'section'=> $request->section,
                'e_signature'=>"",

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
            $profile = Profile::where("userid",$id)->first();
            $profile->name= $request->name;
            $profile->number= $request->number;
            $profile->email= $request->email;
            $profile->update();

         return response()->json([
            'status'=>200,
            'username'=>$profile->name,
            'message'=>'Registered Successfully',
        ]);
        }

    }

    public function faculty_signature(Request $request , $id)
    {
        $validator = Validator::make($request ->all(),[
            'e_signature'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),

            ]);
        }
        else
        {
            $profile = Profile::where("userid",$id)->first();
            $profile->e_signature= $request->e_signature;
            $profile->update();

         return response()->json([
            'status'=>200,
            'username'=>$profile->name,
            'message'=>'Signature Updated',
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
            $profile = Profile::where("userid",$id)->first();
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

     public function student_signature (Request $request, $id)
    {
        $validator = Validator::make($request ->all(),[
            'e_signature'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),

            ]);
        }
        else
        {
            $profile = Profile::where("userid",$id)->first();
            $profile->e_signature= $request->e_signature;
            $profile->update();

         return response()->json([
            'status'=>200,
            'username'=>$profile->name,
            'message'=>'Signature Updated'
        ]);
        }

    }
     public function admin_signature (Request $request, $id)
    {
        $validator = Validator::make($request ->all(),[
            'e_signature'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),

            ]);
        }
        else
        {
            $profile = Profile::where("userid",$id)->first();
            $profile->name = $request->dean;
            $profile->e_signature = $request->e_signature;
            $profile->update();

         return response()->json([
            'status'=>200,
            'username'=>$profile->name,
            'message'=>'Signature Updated'
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
