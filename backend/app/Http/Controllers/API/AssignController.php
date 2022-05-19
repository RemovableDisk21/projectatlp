<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\assignfaculty;
use App\Models\requestform;

class AssignController extends Controller
{
    //


    public function subs(Request $request)
    {
        $validator = Validator::make($request ->all(),[
            'faculty'=>'required|max:191',
            'assign'=>'required',

        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = assignfaculty::create([ //eto sa table
                'faculty'=> $request->faculty,
                'code'=> $request->assign,


            ]);
            return response()->json([
            'status'=>200,
            'message'=>'Assigned Successfully'
        ]);

        }
    }


        public function AssignFac()
        {
            $subjects = assignfaculty::all();
            return response()->json([
                'status'=> 200,
                'subject'=>$subjects,

            ]);
        }


        public function deletassign($id)
    {
        $students = assignfaculty::find($id);
        if($students)
        {
            $students->delete();
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
            $user = requestform::create([ //eto sa table
                'name'=> $request->name,
                'student_id'=> $request->student_id,
                'faculty'=>$request->faculty,
                'subject_code'=>$request->subject_code,
                'semester'=>$request->semester,
                'school_year'=>$request->school_year,
                'reason'=>$request->reason,
                'cys'=>$request->cys,
                'status'=>'pending',
                'hello'=>$request->hello,
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


        public function updatestudent (Request $request, $id)
        {
            $faculty = requestform::find($id);
            if($faculty)
            {
                $faculty->status = $request-> status;
                $faculty->update();
                $profile = requestform::find([ //eto sa table
                    'name'=>$faculty->name,
                    'student_id'=>$faculty->student_id,
                    'faculty'=>$faculty->faculty,
                    'subject_code'=> $faculty->subject_code,
                    'semester'=> $faculty->semester,
                    'school_year'=> $faculty->school_year,
                    'reason'=>$faculty->reason,
                    'status'=>"accepted",
                ]);
                return response()->json([
                    'status'=> 200,
                    'message'=>"Student Accepted",


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

        public function acceptedstudents()
        {
            $accepted = requestform::where("status","accepted")->get();
            return response()->json([
                'status'=> 200,
                'accepted'=>$accepted,
            ]);
        }
}
