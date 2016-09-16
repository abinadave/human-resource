<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;
use App\Department as Department;
use Illuminate\Database\Query\Builder;

class DepartmentController extends Controller
{

    public function edit(Request $request)
    {
        $model = Department::findOrFail($request->input('id'));
        $model->name = $request->input('name');
        $rs = $model->save();
        echo json_encode(array('response' => $rs));
    }


    public function delete($id){
       $rs = Department::destroy($id);
       return response()->json(['deleted' => $rs]);
    }

    public function insert(Request $request, Builder $query){
        $rs = DB::insert("INSERT INTO departments (name) VALUES(?)", [
            $request->input('name')
        ]);
        $id = $query->getConnection()->getPdo()->lastInsertId();
        // echo json_encode(array('saved' => $rs));
        echo json_encode(array(
            'lastInsertId' => $id, 
            'saved' => $rs
        ));
    }

    public function getDepartments(){
        $deps = Department::all();
        echo json_encode($deps);
    }

}
