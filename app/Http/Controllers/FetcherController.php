<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Payrollemp as Payrollemp;
use App\Payroll as Payroll;
use App\Employee as Employee;
use App\Designation as Designation;
use App\Department as Department;

class FetcherController extends Controller
{
    public function forPayrollTable()
    {
    	$payrolls = collect(Payroll::all());
    	$sortedPayrolls = $payrolls->sortByDesc('id');
    	return response()->json([
    		'employees'   => Employee::all(),
    		'payrolls'    => $sortedPayrolls->values()->all(),
    		'payrollemps' => Payrollemp::all(),
            'designations'=> Designation::all()
    	]);
    }

    public function forEmployeeTable()
    {
    	return response()->json([
    		'designations' => Designation::all(),
    		'departments'  => Department::all(),
    		'employees'    => Employee::all()
    	]);
    }
}
