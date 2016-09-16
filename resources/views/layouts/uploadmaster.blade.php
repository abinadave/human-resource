<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta id="token" value="{{ csrf_token() }}">
	<title>Human Resource Management Systems</title>
	<!-- Fonts -->
	<link rel="stylesheet" type="text/css" href="{{ url('assets/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ url('assets/dist/css/bootstrap-theme.min.css') }}">
	<style>
	    body {
	        margin-right: 6px;
	    }
	</style>
</head>
<body>
<div class="container">
  @yield('content');
</div>
<script src="{{ url('js/libs/jquery.js') }}"></script>
<script src="{{ url('assets/dist/js/bootstrap.min.js') }}"></script>
</body>
</html>