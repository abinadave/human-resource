<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;
use App\Designation as Designation;

class DesignationController extends Controller
{   

    public function edit(Request $request)
    {
        $this->validate($request, [
            'name' => 'unique:designations'
        ]);

        $model = Designation::findOrFail($request->input('id'));
        $model->name = $request->input('name');
        $rs = $model->save();
        return response()->json([
            'response' => $rs
        ]);
        
    }

    public function delete($id)
    {
        $rs = Designation::destroy($id);
        return response()->json([
            'removed' => ($rs === 1) ? true : false
        ]);
    }

    public function insert(Request $request)
    {
        $desig = new Designation;
        $desig->name = $request->input('name');
        $rs = $desig->save();
        return response()->json([
            'lastInsertId' => $desig->id,
            'saved'        => $rs
        ]);
    }

    public function getDesignations()
    {
        $data = Designation::all();
        echo json_encode($data);
    }
}
