<!DOCTYPE html>
<html lang="en">
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
<body id="app-layout">
        <div id="app">
            <nav class="navbar navbar-inverse navbar-static-top">
                <div class="container">
                    <div class="navbar-header">

                        <!-- Collapsed Hamburger -->
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                            <span class="sr-only">Toggle Navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>

                        <!-- Branding Image -->
                        <a class="navbar-brand" href="{{ url('/') }}">
                            HR Information System
                        </a>
                    </div>

                    <div class="collapse navbar-collapse" id="app-navbar-collapse">
                        <!-- Left Side Of Navbar -->
                        <ul class="nav navbar-nav">
                            @if (Auth::guest())
                                <li><a href="{{ url('/home') }}">Home</a></li>
                            @else
                                <li><a v-link="{ path: '/Employees' }">Employee</a></li>
                                <li><a v-link="{ path: '/Manage' }">Manage</a></li>
                                <li><a v-link="{ path: '/Payrolls'}">Payrolls</a></li>
                            @endif
                        </ul>

                        <!-- Right Side Of Navbar -->
                        <ul class="nav navbar-nav navbar-right">
                            <!-- Authentication Links -->
                            @if (Auth::guest())
                                <li><a href="{{ url('/login') }}">Login</a></li>
                                <li><a href="{{ url('/register') }}">Register</a></li>
                            @else
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                        {{ Auth::user()->name }} <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                                    </ul>
                                </li>
                            @endif
                        </ul>
                    </div>
                </div>
            </nav>
            <router-view></router-view>
        </div>

    @yield('content')     

    <!-- JavaScripts -->
    <script src="{{ url('js/libs/jquery.js') }}"></script>
    @if (Auth::guest())
        <script src="{{ url('js/libs/require.js') }}"></script>  
    @else
        <script data-main="js/main" src="{{ url('js/libs/require.js') }}"></script>  
    @endif
    <script src="{{ url('assets/dist/js/bootstrap.min.js') }}"></script>

</body>
</html>
