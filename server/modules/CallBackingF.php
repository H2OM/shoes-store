<?php
    namespace app\modules;
    class CallBackingF extends Runner {
        private $data;
        public function __construct() {
            if(empty($_POST)) header("HTTP/1.0 400 Bad request");
            $this->data = HcheckUserInput();
        }
        protected function mailSubscribe() {
            if(empty($this->data) || count($this->data) != 1) header("HTTP/1.0 400 Bad request");
            exit(json_encode(true));
        }
        protected function formCallback() {
            sleep(1);
            if(empty($this->data) || count($this->data) != 4) header("HTTP/1.0 400 Bad request");
            exit(json_encode(true));
        }
    }