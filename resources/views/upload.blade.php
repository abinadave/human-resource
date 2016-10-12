@extends('layouts.uploadmaster')
@section('content')
  
   <div class="container">
	   <h2 class="page-header">Upload picture for: {{ $emp_name }} </h2>
	   @if (count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>

  @endif
	   <form enctype="multipart/form-data" action="/uploadFile" method="POST">
	   	  <input type="file" name="file">
	   	  <input type="hidden" name="id" value="{{ $id }}">
	   	  <input type="hidden" name="_token" value="{{ csrf_token() }}"><br/>
	   	  <input style="display: inline" type="submit" class="btn btn-md btn-warning" value="Upload" />
	   </form>
   </div>
   
@endsection
