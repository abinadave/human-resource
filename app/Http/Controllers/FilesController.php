<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Employee as Employee;
use Storage;
use App\Http\Controllers\PhotoEmployeeController as PhotoEmployeeController;
use App\PhotoEmployee as PhotoEmp;
class FilesController extends Controller
{
   
    public function handleUpload(Request $request){
	   $file = $request->file('file');
	   $id = $request->input('id');
	   $fileName = $file->getClientOriginalName();
	   $destinationPath = config('app.fileDestinationPath').'/'. $id.'-'.$fileName;
	   $uploaded = Storage::put($destinationPath, file_get_contents($file->getRealPath())); 
	   if($uploaded){
	   		$classPhoto = new PhotoEmployeeController;
	   		$classPhoto->insert($id, $fileName);
	   		return redirect()->to('/');	   
	   }
    }

    public function renderUploadView($id){
    	$employee = Employee::findOrFail($id);
    	return view('upload', [
    		'emp_name' => $employee->fullname,
    		'id' => $id,
    		'base_path' => base_path()
    	]);
    }

}
