<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Employee as Employee;
use Storage;
use App\Http\Controllers\PhotoEmployeeController as PhotoEmployeeController;

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

    public function uploadFile(Request $request){
        $id = $request->input('id');
        $destinationPath = $destinationPath = config('app.fileDestinationPath').'/'. $id.'-'.$file->getClientOriginalName();;
        $file = $request->file('file');
        if($file->isValid()){
            $rs = $file->move($destinationPath, $file->getClientOriginalName());
            echo $rs;
        }
    }

    public function renderUploadView($id){
    	// $directory = config('app.fileDestinationPath');
    	// $files = Storage::get($directory);
    	$employee = Employee::findOrFail($id);
    	return view('upload', [
    		'emp_name' => $employee->fullname,
    		'id' => $id,
    		'base_path' => base_path()
    	]);
    }
}
