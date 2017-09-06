<?php

require_once 'Url.php';
require_once 'Request.php';

class Route
{
    // Holds all the routes depending on their method request
    public static $routes = [
        'GET' => ['uris' => [], 'methods' => []],
        'POST' => ['uris' => [], 'methods' => []],
        'PUT' => ['uris' => [], 'methods' => []],
        'DELETE' => ['uris' => [], 'methods' => []],
    ];

    public static function get($uri, $method)
    {
        static::addRoute('GET', $uri, $method);
    }

    public static function post($uri, $method)
    {
        static::addRoute('POST', $uri, $method);
    }

    public static function put($uri, $method)
    {
        static::addRoute('PUT', $uri, $method);
    }

    public static function delete($uri, $method)
    {
        static::addRoute('DELETE', $uri, $method);
    }

    private static function addRoute($method, $uri, $function)
    {
        static::$routes[$method]['uris'][] = $uri;
        static::$routes[$method]['methods'][] = $function;
    }

    // Makes the routes run
    public static function run()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        // Checks if the REQUEST_METHOD is available in our routes
        if (array_key_exists($method, static::$routes)) {
            $isExecuted = static::executeRoutes(static::$routes[$method]);
            if ($isExecuted) return;
        }

        echo 'Page not found.';
    }

    private static function executeRoutes($routes)
    {
        $url = new Url($_SERVER['REQUEST_URI']);

        foreach ($routes['uris'] as $key => $value) {
            // Matches the REQUEST_URI in our routes
            if (preg_match('#^' . $value . '$#', $url->path)) {
                // If there's a match get the method to be executed
                $method = $routes['methods'][$key];

                if (is_string($method)) {
                    // If $method is string, it means that it's a class with a method
                    list($class, $func) = explode('@', $method);
                    $method = [new $class(), $func];
                    $reflection = new ReflectionMethod($class, $func);
                } else {
                    // Our $method is a closure
                    $reflection = new ReflectionFunction($method);
                }

                // Get the right parameters to be supplied to the method
                $parameters = static::getParameters($reflection, $url);
                call_user_func_array($method, $parameters);
                return true;
            }
        }

        return false;
    }

    private static function getParameters($reflection, $url)
    {
        $parameters = [];

        foreach ($reflection->getParameters() as $index => $parameter) {
            $class = $parameter->getClass();
            if (!is_null($class)) {
                // Parameter is a class, so we need to instantiate it
                $parameters[$index] = new $class->name();
            } else {
                // We assumes that this parameter is in the url
                $parameters[$index] = $url->parameter;
            }
        }

        return $parameters;
    }
}
