<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\onprocessed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\profile;
use App\Models\user_faculty;

use App\Models\requestform;

class AuthController extends Controller
{

    public function register_admin(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'registered'=>true,
            ]);
        }
        else{
            $user = User::create([ //admin register
                'name'=> 'admin',
                'email'=> 'admin@example.com',
                'role'=>'admin',
                'password'=>Hash::make('admin'),

            ]);

            $profile = Profile::create([ //admin
                'name'=>"",
                'userid'=> $user->id,
                'email'=>$user->email,
                'e_signature'=>"",
                'student_id'=>"",
                'employee_id'=>"",
                'number'=> '',
                'course'=>'',
                'year'=>'',
                'section'=>'',

            ]);
         $token = $user->createToken($user->email.'_Token')->plainTextToken;
         return response()->json([
            'status'=>200,
            'username'=>$user->name,
            'token'=>$token,
            'message'=>'Registered Successfully'
        ]);
    }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'student_id'=>'required',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8'

        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = User::create([ //student register
                'name'=> $request->name,
                'student_id'=> $request->student_id,
                'email'=> $request->email,
                'role'=>'student',
                'password'=>Hash::make($request->password),

            ]);

            $profile = Profile::create([ //student profile
                'name'=>$user->name,
                'userid'=> $user->id,
                'student_id'=> $user->student_id,
                'employee_id'=> $user->employee_id,
                 'number'=> '',
                 'course'=>'',
                 'year'=>'',
                 'section'=>'',
                'email'=>$user->email,
                'e_signature'=>"",


            ]);
         $token = $user->createToken($user->email.'_Token')->plainTextToken;
         return response()->json([
            'status'=>200,
            'username'=>$user->name,
            'token'=>$token,
            'message'=>'Registered Successfully'
        ]);
        }

    }

    public function faculty (Request $request)
    {
        $validator = Validator::make($request ->all(),[
            'name'=>'required|max:191',
            'employee_id'=>'required',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8'


        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = User::create([ //faculty register
                'name'=> $request->name,
                'employee_id'=> $request->employee_id,
                'role'=>'faculty',
                'status'=>'pending',
                'email'=> $request->email,
                'password'=>Hash::make($request->password),

            ]);

            $profile = Profile::create([ //Faculty profile
                'name'=>$user->name,
                'userid'=> $user->id,
                'student_id'=> $user->student_id,
                'employee_id'=> $user->employee_id,
                 'number'=> '',
                 'course'=>'',
                 'year'=>'',
                 'section'=>'',
                'email'=>$user->email,
                'e_signature'=>"",


            ]);
         return response()->json([
            'status'=>200,
            'username'=>$user->name,
            'role'=>$user->role,

            'message'=>'Registered Successfully'
        ]);
    }
}

    public function logins(Request $request){
        if($request->email == 'admin' && $request->password == 'admin'){
            return response()->json([
                'status' => 200,
                'message' => 'Logged In Successfully!',
            ]);
        }
    }

    public function login(Request $request)
      {
        $validator = Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required',

        ]);
            if($validator->fails())
            {
                return response()->json([
                    'validation_error'=>$validator->messages(),
                ]);
            }else
            {
                $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                 return response()->json([
                    'status'=>'401',
                    'message'=>'Invalid Credentials'
                 ]);

                }
                else
                {
        $token = $user->createToken($user->email.'_Token')->plainTextToken;
         return response()->json([
            'status'=>200,
            'username'=>$user->name,
            'role'=>$user->role,
            'user_status'=>$user->status,
            'token'=>$token,
            'message'=>'Logged in Successfully',
            'id'=>$user->id,
        ]);

            }
      }


}
        public function logout()
        {
            auth()->user()->tokens()->delete();
            return response()->json([
                'status'=>200,
                'message' => 'Logged Out Succesfully',
            ]);
        }

        public function index()
        {
            $pending = User::where("status","pending")->get();
            return response()->json([
                'status'=> 200,
                'pending'=>$pending,
            ]);
        }


        public function update (Request $request, $id)
        {
            $faculty = User::find($id);
            if($faculty)
            {
                $faculty->status = $request-> status;
                $faculty->update();
                $profile = Profile::create([
                    'name'=>$faculty->name,
                    'userid'=> $faculty->id,
                    'student_id'=>$faculty->student_id,
                    'employee_id'=>$faculty->employee_id,
                    'number'=> '',
                    'email'=>$faculty->email,


                ]);
                return response()->json([
                    'status'=> 200,
                    'message'=>"Faculty Accepted",


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


        public function delete($id)
        {
            $faculty = User::find($id);
            if($faculty)
            {
                $faculty->delete();
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

        public function accepted()
        {
            $pending = User::where("status","accepted")->get();
            return response()->json([
                'status'=> 200,
                'pending'=>$pending,
            ]);
        }


        public function deletefaculty($id)
        {
            $faculty = User::find($id);
            if($faculty)
            {
                $faculty->delete();
                return response()->json([
                    'status'=> 200,
                    'message'=>'Faculty Deleted Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'No Employee/Student ID Found',
                ]);
            }
        }

        public function student()
        {
            $pending = User::where("role","student")->get();
            return response()->json([
                'status'=> 200,
                'pending'=>$pending,
            ]);
        }

        public function deletestudent($id)
        {
            $student = User::find($id);
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
                    'message' => 'No Employee/Student ID Found',
                ]);
            }
        }


        public function Faculties ()
        {
            $faculty = User::where("role","faculty")->get();

            return response()->json([
                'status'=> 200,
                'faculty'=>$faculty,
            ]);
        }


        public function updated (Request $request, $id)
    {
        $faculty = requestform::find($id);
        if($faculty)
        {
            $faculty->status = $request->status;
            $faculty->update();
            $profile = onprocessed::create([ // Processing Request
                    'name'=>$faculty->name,
                    'student_id'=>$faculty->student_id,
                    'faculty'=>$faculty->faculty,
                    'subject_code'=> $faculty->subject_code,
                    'semester'=> $faculty->semester,
                    'school_year'=> $faculty->school_year,
                    'reason'=> $faculty->reason,
                    'status'=>$request->status,
                    'cys'=>$request->cys,
                    'grades'=>$request->grades_value,
                    'remarks'=>$request->remarks,
                    'e_sign_student'=> $request->e_sign_student,
                    'e_sign_faculty'=>$request->e_sign_faculty,
                    'e_sign_admin'=> "",
                    'dean'=> "",
                    'student_email'=> $request->student_email,
            ]);
            return response()->json([
                'status'=> 200,
                'message'=>"Faculty Accepted",
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

    public function onprocessed()
    {
        $pending = onprocessed::where("status","on process")->get();
        return response()->json([
            'status'=> 200,
            'pending'=>$pending,
        ]);
    }



    public function done()
    {
        $pending = onprocessed::where("status","processed")->get();
        return response()->json([
            'status'=> 200,
            'pending'=>$pending,
        ]);
    }
    public function updating (Request $request, $id)
    {
        $faculty = onprocessed::find($id);
        if($faculty)
        {
            $faculty->status = $request->status;
            $faculty->update();
            $faculty->update( //Admin update status
                    array(
                        'status'=>$request->status,
                        'dean'=>$request->dean,
                        'e_sign_admin'=>$request->e_sign_admin,
                    )

            );
            return response()->json([
                'status'=> 200,
                'message'=>"Faculty Accepted",

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
