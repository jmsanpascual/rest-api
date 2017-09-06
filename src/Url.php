<?php

class Url {

    public $url;
    public $dir;
    public $path;
    public $parameter;

    public function __construct($url)
    {
        $this->url = $url;
        $this->extractUrl($url);
    }

    private function extractUrl($url)
    {
        // Divide the URL by '/'
        $urlParts = explode('/', trim($url, '/'));
        list($this->dir, $this->path) = $urlParts;

        // This looks for the URL parameter
        if (isset($urlParts[2])) {
            $this->parameter = strtok($urlParts[2], '?');
            if (!empty($this->parameter)) {
                $this->path .= '/{id}';
            }
        }
    }
}
