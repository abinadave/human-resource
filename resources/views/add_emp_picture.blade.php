@extends('layouts.app')
<div id="app"></div>
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">

            <div class="panel panel-default">
                <div class="panel-heading"></div>

                <div class="panel-body">
                    <form method="POST" action="/">
                       <label>
                            <input type="file" name="picture">
                       </label><br>
                       <button class="btn btn-info btn-sm">Upload</button>
                    </form>
                </div>

            </div>

        </div>
    </div>
</div>
@endsection
