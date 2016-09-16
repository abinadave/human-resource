<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Payroll as Payroll;

class PayrollController extends Controller
{
    
    public function insert(Request $request)
    {
    	$payroll = new Payroll;
    	$payroll->date_from = $request->input('date_from');
    	$payroll->date_to = $request->input('date_to');
    	$rs = $payroll->save();
    	return response()->json([
    		'success' => $rs,
            'id'      => $payroll->id
    	]);
    }

}
