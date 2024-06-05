<?php
    namespace app\modules;

    use app\Db;

    class Basket extends Runner {

        public function __construct() {

            if(!isset($_SESSION['basket'])) {

                $_SESSION['basket'] = [];
                // setcookie(session_name(), $_COOKIE[session_name()], time()+60, '/');
            }
        }
        protected function getBasket() {

            exit(json_encode($_SESSION['basket']));
            // exit(json_encode([["id"=>5, "someitem"=>"reebok"]]));
        }
        protected function addBasket() {

            if(!isset($_POST['article']) || !isset($_POST['size'])) {

                header("HTTP/1.0 403 Bad request");

                die;
            }

            try {

                $userQueryPart = ($this->isUserSessionIsset ? ", IF(favorites.Goods_id = goods.id, true, false) AS 'Fav'" : "");

                $result = Db::getPreparedQuery("SELECT goods.*, categories.Code AS 'Category' $userQueryPart
                                                FROM goods JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                                JOIN filters_values ON filters_goods.filter_value_id = filters_values.id AND  filters_values.value = ?
                                                JOIN filters ON filters_values.filter_id = filters.id JOIN categories ON goods.Category_id = categories.id
                                                LEFT JOIN favorites ON goods.id = favorites.Goods_id
                                                WHERE goods.Article = ? AND filters.Code = 'size'", 
                                                [["VALUE"=>$_POST['size'], "PARAMVALUE"=>4],["VALUE"=>$_POST['article'], "PARAMVALUE"=>13]]);
            

                if(empty($result)) {

                    header("HTTP/1.0 403 Bad request");

                    die;
                }

                $result['Size'] = $_POST['size'];

                $result['Value'] = 1;

                if(!empty($_SESSION['basket'])) {

                    $index = "";

                    foreach($_SESSION['basket'] as $k=>$v) {

                        if($v['Article'] == $_POST['article'] && $v['Size'] == $_POST['size']) {

                            $index = $k; 
                            break;
                        }
                    }

                    if($index !== "") {

                        $_SESSION['basket'][$k]['Value']++;

                    } else {

                        array_push($_SESSION['basket'], $result);
                    }

                } else {
                    array_push($_SESSION['basket'], $result);
                }

                exit(json_encode($_SESSION['basket']));

            } catch(\PDOException $e) {

                header("HTTP/1.0 403 Bad request");

                die;
            }
        }

        protected function setCount() {

            if(!isset($_POST['article']) || !isset($_POST['type']) || !isset($_POST['size'])) {

                header("HTTP/1.0 403 Bad request");

                die;
            }

            foreach($_SESSION['basket'] as $k=>$v) {

                $isArticleAndSizeEqual = ($v['Article'] == $_POST['article'] && $v['Size'] == $_POST['size']);

                if($isArticleAndSizeEqual) {

                    switch($_POST['type']) {

                        case "less":

                            if((string)$_SESSION['basket'][$k]['Value'] === (string)1) {

                                array_splice($_SESSION['basket'], $k, 1);

                            }  else {

                                $_SESSION['basket'][$k]['Value']--;
                            }
                            break;

                        case "more":
                            $_SESSION['basket'][$k]['Value']++;

                        default: 
                            break;
                    }
                    break;
                }
            }

            exit(json_encode($_SESSION['basket']));
        }
        
        protected function removeProd() {

            if(!isset($_POST['article']) || !isset($_POST['size'])) {

                header("HTTP/1.0 403 Bad request");
                die;
            }

            foreach($_SESSION['basket'] as $k=>$v) {

                $isArticleAndSizeEqual = ($_SESSION['basket'][$k]['Article'] == $_POST['article'] && $_SESSION['basket'][$k]['Size'] == $_POST['size']);

                if($isArticleAndSizeEqual) {

                    array_splice($_SESSION['basket'], $k, 1);
                    break;
                }
            }

            exit(json_encode($_SESSION['basket']));
        }

        protected function fullClear() {

            $_SESSION['basket'] = [];

            exit(json_encode([]));
        }

        protected function confOrder() {

            exit(json_encode(true));
        }
    }