<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;
use App\Employee As Employee;

class EmployeeController extends Controller
{	
    public function fileUpload(Request $request)
    {
        $imageTempName = $request->file('photo')->getPathname();
        $imageName = $request->file('photo')->getClientOriginalName();
        $path = base_path() . '/public/uploads/consultants/images/';
        $request->file('photo')->move($path , $imageName);
        // DB::table('consultants')
        //     ->where('photo', $imageTempName)
        //     ->update(['photo' => $imageName]);
    }

    public function getEmpsWithDesig($id)
    {
        $emps = Employee::where('designation', $id)->get();
        return response()->json($emps);
    }

    public function getEmpsWithDept($id)
    {
        $emps = Employee::where('department', $id)->get();
        return response()->json($emps);
    }

    public function update($id, Request $request)
    {
        $emp = Employee::findOrFail($id);
        $emp->fullname = $request->input('fullname');
        $emp->rpd = $request->input('rpd');
        $emp->designation = $request->input('designation');
        $emp->department = $request->input('department');
        $rs = $emp->save();

        return response()->json([
            'updated' => $rs
        ]);
    }

    public function delete($id)
    {
        $employee = Employee::find($id);
        $rs = $employee->delete();
        return response()->json(['deleted' => $rs]);
    }
	
    public function insert(Request $request)
    {
        $emp = new Employee;
        $emp->fullname = $request->input('fullname');
        $emp->department = $request->input('department');
        $emp->designation = $request->input('designation');
        $emp->rpd = $request->input('rpd');
        $emp->save();
        return response()->json([
            'id' => $emp->id
        ]);
    }

    public function getEmployees()
    {
        $emps = Employee::all();
        echo json_encode($emps);
    }

}
