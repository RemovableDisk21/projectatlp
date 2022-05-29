<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\requestform;

class AssignController extends Controller
{

    public function requestform(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'student_id'=>'required',
            'faculty'=>'required',
            'subject_code'=>'required',
            'semester'=>'required',
            'school_year'=>'required',


        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = requestform::create([
                'name'=> $request->name,
                'student_id'=> $request->student_id,
                'faculty'=>$request->faculty,
                'subject_code'=>$request->subject_code,
                'semester'=>$request->semester,
                'school_year'=>$request->school_year,
                'reason'=>$request->reason,
                'cys'=>$request->cys,
                'status'=>'pending',
                'e_signature'=>$request->esig,
                'student_email'=>$request->student_email
            ]);



         return response()->json([
            'status'=>200,
            'username'=>$user->name,

            'message'=>'Requests Successfully'
        ]);
        }

    }

    public function pendingstudent()
        {
            $pending = requestform::where("status","pending")->get();
            return response()->json([
                'status'=> 200,
                'pending'=>$pending,
            ]);
        }

        public function deletestudent($id)
        {
            $students = requestform::find($id);
            if($students)
            {
                $students->delete();
                return response()->json([
                    'status'=> 200,
                    'message'=>'Faculty Deleted Successfully',
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
