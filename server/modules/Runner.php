<?php

    namespace app\modules;

    class Runner {

        public $isUserSessionIsset;

        protected function __construct() {
            
            $this->isUserSessionIsset = (isset($_SESSION['user']) && !empty($_SESSION['user']));
        }

        public function run ($action) {

            $this->$action();
        }
    }