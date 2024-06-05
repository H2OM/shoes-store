<?php

    namespace app\modules;

    class Runner {

        public $isUserSessionIsset;

        public function run($action) {
            $this->isUserSessionIsset = ((isset($_SESSION['user']) && !empty($_SESSION['user'])) ? true : false);
            $this->$action();
        }
    }