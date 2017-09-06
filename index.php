<?php

require 'src/Route.php';
require 'app/Controllers/PersonController.php';

// Declare all the application routes
Route::get('person', 'PersonController@index');
Route::get('person/{id}', 'PersonController@show');
Route::post('person', 'PersonController@store');
Route::put('person/{id}', 'PersonController@update');
Route::delete('person/{id}', 'PersonController@destroy');
Route::run();
