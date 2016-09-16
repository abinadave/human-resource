<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\ResignationReason as ResignationReason;

class ResignationReasonController extends Controller
{
    public function save(Request $request)
    {
    	$resignation = new ResignationReason;
    	$resignation->reason = $request->input('reason');
    	$resignation->emp_id = $request->input('emp_id');
    	$rs = $resignation->save();
    	return response()->json([
    		'id' => $resignation->id,
    		'success' => $rs
    	]);
    }
}
