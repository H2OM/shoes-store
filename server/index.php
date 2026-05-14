<?php

use app\core\Container;
use app\core\Router;
use app\core\App;

require_once "./settings/config.php";

session_start();

App::init(new Container());
App::container()->setVariable('db_config', require CONF . 'config_db.php');

Router::dispatchInit();
