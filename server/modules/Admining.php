<?php
    namespace app\modules;
    use app\Db;
    class Admining extends Runner { 
        public function __construct() {
            if(!isset($_SESSION['admin']) && empty($_SESSION['admin'])) {
                // header("HTTP/1.0 401 Unauthorized");die;
            }
        }
        protected function setFilters() {
            try {
                $result = Db::getQuery("SELECT Code FROM filters");
                Hdebug($result);
                $filters["Code"] = [];
                foreach($result as $key=>$value) {
                    foreach($value as $k =>$v) {
                        array_push($filters["Code"], $v);
                    }
                }
                file_put_contents("./App/api/settings/Filters.json", json_encode($filters), LOCK_EX);
                exit(HgetCodeFilters());
            } catch (\Exception $e) {
                header("HTTP/1.0 500 Internal Server Error");
                die;
            }
        }
    }



