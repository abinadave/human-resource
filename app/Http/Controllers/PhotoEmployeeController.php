<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\PhotoEmployee as Photo;

class PhotoEmployeeController extends Controller
{
    
    public function insert($id, $filename)
    {
    	$photo = new Photo;
    	$photo->emp_id = $id;
    	$photo->filename = $filename;
    	$photo->save();
    }

}
