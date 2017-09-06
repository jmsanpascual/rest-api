<?php

class Request implements ArrayAccess {

    private $container;

    public function __construct()
    {
        $this->container = $this->getRequest($_SERVER['REQUEST_METHOD']);
    }

    // Gets the appropriate request values, then returns it
    private function getRequest($method)
    {
        $contentType = getallheaders()['Content-Type'];
        $request = [];

        switch ($method) {
            case 'POST': // Fall through
            case 'PUT':
                if (strpos($contentType, 'json') !== false) {
                    // If $contentType is json, decode it to associative array
                    $request = json_decode(file_get_contents('php://input'), true);
                } else {
                    parse_str(file_get_contents('php://input'), $request);
                }

                $request = $request + $_GET;
                break;
            default:
                // Do this for GET and DELETE request
                $request = $_GET;
        }

        return $request;
    }

    public function all()
    {
        return $this->container;
    }

    // This would allow oject access to this class
    public function &__get ($key) {
        return $this->container[$key];
    }

    // This would allow oject setting to this class
    public function __set($key, $value) {
        $this->container[$key] = $value;
    }

    // Require to be implemented by ArrayAccess
    public function offsetSet($offset, $value) {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    // Require to be implemented by ArrayAccess
    public function offsetExists($offset) {
        return isset($this->container[$offset]);
    }

    // Require to be implemented by ArrayAccess
    public function offsetUnset($offset) {
        unset($this->container[$offset]);
    }

    // Require to be implemented by ArrayAccess
    public function offsetGet($offset) {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
}
