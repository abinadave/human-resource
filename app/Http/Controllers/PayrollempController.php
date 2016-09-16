<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Payrollemp as Payrollemp;

class PayrollempController extends Controller
{

    public function insert(Request $request)
    {
    	$emps = $request->input('emps');
    	$saved = 0;
    	$emp_length = count($emps);
    	foreach ($emps as $key => $emp) {
    		$payrollemp = new Payrollemp;
    		$payrollemp->pid = $request->input('pid');
    		$payrollemp->emp_id = $emp['id'];
    		$payrollemp->hrs_work = $emp['hrs_work'];
    		$payrollemp->phil = $emp['phil'];
    		$payrollemp->sss = $emp['sss'];
    		$payrollemp->advances = $emp['advances'];
            $payrollemp->rpd = $emp['rpd'];
    		$rs = $payrollemp->save();
    		if($rs){ ++$saved; }
    	}
    	return response()->json([
    		'saved' => $saved,
    		'emp_length' => $emp_length
    	]);
    }

}
