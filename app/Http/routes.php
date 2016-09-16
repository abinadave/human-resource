 <?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => 'web'], function(){
	
	Route::get('/', 'HomeController@root');
	Route::auth();
	Route::get('/home', 'HomeController@index');
	Route::post('processLogin', 'UserController@login');
	Route::post('employee', 'EmployeeController@insert');
	Route::post('department', 'DepartmentController@insert');
	Route::post('designation', 'DesignationController@insert');
	Route::get('department', 'DepartmentController@getDepartments');
	Route::get('designation', 'DesignationController@getDesignations');
	Route::delete('employee/{id}', 'EmployeeController@delete');
	Route::put('employee/{id}', 'EmployeeController@update');
	Route::delete('department/{id}', 'DepartmentController@delete');
	Route::delete('designation/{id}', 'DesignationController@delete');
	Route::post('account', 'AccountController@create');
	Route::get('account', 'AccountController@fetch');
	Route::delete('account/{id}', 'AccountController@destroy');
	Route::post('decrypt_pass', 'AccountController@decrypt');
	Route::put('account', 'AccountController@update');
	Route::get('emps_with_department/{id}', 'EmployeeController@getEmpsWithDept');
	Route::get('get_emps_with_desig/{id}', 'EmployeeController@getEmpsWithDesig');
	Route::put('department', 'DepartmentController@edit');
	Route::post('resignation_reason', 'ResignationReasonController@save');
	Route::get('upload_employee_image/{id}', 'FilesController@renderUploadView');
	Route::post('uploadFile', 'FilesController@uploadFile');
	Route::post('payroll', 'PayrollController@insert');
	Route::post('payrollemps', 'PayrollempController@insert');

	Route::get('payroll_list_route', 'FetcherController@forPayrollTable');
	Route::get('route_employee_tbl', 'FetcherController@forEmployeeTable');

});

