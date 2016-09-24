<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Contract as Contract;

class ContractController extends Controller
{
    public function create(Request $request){
    	$contract = new Contract;
    	$contract->start = $request->input('start');
    	$contract->end = $request->input('end');
    	$contract->emp_id = $request->input('emp_id');
    	$response = $contract->save();
    	return response()->json([
    		'success' => $response,
    		'id' => $contract->id
    	]);

    }
}
