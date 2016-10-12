<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\PhotoEmployee as Photo;

class PhotoEmployeeController extends Controller
{
    
    public function insert($id, $filename)
    {
    	$this->findOtherModels($id);
    	$photo = new Photo;
    	$photo->emp_id = $id;
    	$photo->filename = $filename;
    	$photo->save();
    }

    public function findOtherModels($empId){
    	$count = Photo::where('emp_id', $empId)->count();
    	if($count > 0){
    		$photo = Photo::where('emp_id', $empId)->first();
    		$photo->delete();
    	}
    }

}
