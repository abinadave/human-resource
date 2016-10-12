<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Payroll as Payroll;
use App\Payrollemp as Payrollemp;

class PayrollController extends Controller
{

    public function updatePayrollemp(){
        echo "Hit";
    }

    public function destroy($id)
    {
        $payroll = Payroll::findOrFail($id);
        $rs = $payroll->delete();
        if ($rs) {
           $deletedRows = Payrollemp::where('pid', $id)->delete();
           return response()->json([
                'success' => $rs,
                'deleted_payrollemps' => count($deletedRows)
            ]);
        }
        
    }

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
