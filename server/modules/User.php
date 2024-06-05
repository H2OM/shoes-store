<?php

    namespace app\modules;

    use app\Db;

    class User extends Runner {

        protected function isAuth() {

            exit(json_encode($this->isUserSessionIsset));
        }

        protected function signIn() {

            if($this->isUserSessionIsset) {

                header("HTTP/1.0 405 Method Not Allowed");

                die;
            }

            if(count($_POST) != 2) {

                header("HTTP/1.0 400 Bad request");

                die;
            }

            $userData = HcheckUserInput();

            $isIssetNumberAndPassword = (isset($userData['number'], $userData['password']) && count($userData) == 2);

            if(empty($userData) || !$isIssetNumberAndPassword) {

                header("HTTP/1.0 400 Bad request");

                die;
            }

            $attributes = HprepairedQuery(["number"=>$userData['number']]);

            try {

                $result = Db::getPreparedQuery("SELECT * FROM `users` WHERE `Phone` = ?", $attributes);

                if(empty($result)) {
                    exit(json_encode("User not found"));
                }

                if(password_verify($userData['password'], $result['Password'])) {

                    foreach($result as $k=>$v) {

                        $k = lcfirst($k);

                        if($k == "password") {
                            continue;
                        }

                        if($k == "phone") {
                            $k = "number";
                        }

                        if($k == "email") {
                            $k = "mail";
                        }

                        $_SESSION['user'][$k] = $v;
                    }

                    reloadBasket();

                    exit(json_encode(true));

                } else {

                    exit(json_encode("Uncorected password"));
                }

            } catch(\PDOException $e) {

                header("HTTP/1.0 400 Bad request");

                die;
            }
        }

        protected function logOut() {

            if(!$this->isUserSessionIsset) {

                header("HTTP/1.0 401 Unauthorized"); 
                die;
            }

            HdestroySession();

            exit(json_encode(true));
        }
        protected function signUp() {

            if($this->isUserSessionIsset) {

                header("HTTP/1.0 405 Method Not Allowed"); 
                die;
            }

            if(count($_POST) != 9) {

                header("HTTP/1.0 400 Bad request");
                die;
            }

            $userData = HcheckUserInput();

            $isUserDataComplete = (isset($userData['firstName'], $userData['secondName'], $userData['number'], $userData['password'], $userData['age'], $userData['gender'], $userData['mail']) && count($userData) == 7);

            if(empty($userData) || !$isUserDataComplete) {

                header("HTTP/1.0 400 Bad request");
                die;
            }

            $attributes = HprepairedQuery($userData);

            try {

                Db::getPreparedQuery("INSERT INTO `users`(`Age`, `FirstName`, `Gender`, `Email`, `Phone`, `Password`, `SecondName`) VALUES (?, ?, ?, ?, ?, ?, ?)", $attributes);

                $userId = Db::getQuery("SELECT LAST_INSERT_ID()", false, true);

                $_SESSION['user']['id'] = $userId;

                foreach($userData as $k=>$v) {

                    if($k == "password") {
                        continue;
                    }

                    $_SESSION['user'][$k] = $v;
                }

                reloadBasket();

                exit(json_encode(true));

            } catch(\PDOException $e) {

                exit(json_encode("User is already registered"));
            }
        }

        protected function getUser() {

            if(!$this->isUserSessionIsset) {
                header("HTTP/1.0 401 Unauthorized"); 
                die;
            }

            exit(json_encode($_SESSION['user']));
        }

        protected function editUser() {

            if(!$this->isUserSessionIsset) {

                header("HTTP/1.0 401 Unauthorized"); 
                die;
            }

            if(count($_POST) != 6) {

                header("HTTP/1.0 400 Bad request");
                die;
            }
            $userData = HcheckUserInput();

            $isUserDataComplete = (isset($userData['firstName'], $userData['secondName'], $userData['number'], $userData['age'], $userData['gender'], $userData['mail']) && count($userData) == 6);

            if(empty($userData) || !$isUserDataComplete) {

                header("HTTP/1.0 403 Bad request");
                die;
            }

            $attributes = HprepairedQuery($userData);

            try {
                
                Db::getPreparedQuery("UPDATE `users` SET `Age` = ?, `FirstName` = ?, `Gender` = ?, `Email` = ?,   `Phone` = ?, `SecondName` = ? 
                                        WHERE `Phone` = '" .$_SESSION['user']['number'] . "'", $attributes);

                foreach($userData as $k=>$v) {

                    if($k == "password") {
                        continue;
                    }

                    $_SESSION['user'][$k] = $v;
                }

                exit(json_encode($_SESSION['user']));

            } catch(\PDOException $e) {

                header("HTTP/1.0 400 Bad request");

                die;
            }
        }

        protected function getFavs() {

            if(!$this->isUserSessionIsset) {

                header("HTTP/1.0 401 Unauthorized"); 
                die;
            }

            try {

                $favs = Db::getQuery("SELECT goods.article FROM goods 
                    JOIN favorites ON goods.id = favorites.Goods_id 
                    JOIN users ON favorites.User_id = users.id WHERE users.id = ".$_SESSION['user']['id'], false, false, true);

                exit(json_encode($favs));
                
            } catch(\PDOException $e) {

                header("HTTP/1.0 400 Bad request");

                die;
            }
        }

        protected function changeFav() {

            if(!$this->isUserSessionIsset) {

                header("HTTP/1.0 401 Unauthorized"); 
                die;
            }
            if(!isset($_GET['article']) || !isset($_GET['action'])) {

                header("HTTP/1.0 403 Bad request");
                die;
            }

            $sql = "";

            switch($_GET['action']) {

                case "set":

                    $sql = "INSERT INTO `favorites` (`User_id`, `Goods_id`) VALUES (".$_SESSION['user']['id'].",(SELECT goods.id FROM goods WHERE goods.Article = ?))";

                    break;
                case "unset":

                    $sql = "DELETE FROM `favorites` WHERE Goods_id = (SELECT goods.id FROM goods WHERE goods.Article = ?) AND User_id = ".$_SESSION['user']['id'];

                    break;

                default:
                    header("HTTP/1.0 400 Bad request");
                    die;
            }

            try {

                Db::getPreparedQuery($sql, [["VALUE"=>$_GET['article'], "PARAMVALUE"=>13]]);

                if(isset($_SESSION['basket']) && !empty($_SESSION['basket'])) {

                    foreach($_SESSION['basket'] as $k=>$v) {
                        if(($v['Article'] == $_GET['article']) && isset($_SESSION['basket'][$k]['Fav'])) {

                            $_SESSION['basket'][$k]['Fav'] = !$v['Fav'];
                        }
                    }

                    exit(json_encode($_SESSION['basket']));

                } else {

                    exit(json_encode([]));
                }

            } catch(\PDOException $e) {

                header("HTTP/1.0 400 Bad request");
                
                die;
            }
        }

        protected function getOrders() {

            if(!$this->isUserSessionIsset) {
                header("HTTP/1.0 401 Unauthorized"); 
                die;
            }

            try {

                $result = Db::getPreparedQuery("SELECT orders.*, goods.Title, goods.Brand, goods.Type, goods.Article, goods.Price, 
                                                goods.Price_old, goods.Image, orders_goods.Size, categories.Title as Category 
                                                FROM orders JOIN orders_goods ON orders.id = orders_goods.Order_id 
                                                JOIN goods ON orders_goods.Goods_id = goods.id JOIN categories 
                                                ON categories.id = goods.Category_id 
                                                WHERE user_id = ? ORDER BY `orders`.`Date` DESC", 
                                                [["VALUE"=>$_SESSION['user']['id'], "INT"=>true]]);

                if(empty($result)) {
                    exit(json_encode([]));
                }

                if(isset($result['id'])) {
                    $result = [$result];
                }

                $orders = [];

                foreach($result as $key=>$value) {

                    $orderId = $value['id'];

                    $goods = [];

                    foreach($value as $k=>$v) {

                        if($k == 'id') {
                            continue;
                        }

                        switch($k) {
                            case "Number":
                            case "Status":
                            case "User_id":
                            case "Date":
                            case "Change_date":
                            case "Delivery_date":   
                            case "Comment": 

                                $orders[$orderId][$k] = $v;

                                break;

                            default:

                                $goods[$k] = $v;

                                break; 
                        }
                    }

                    if(!isset($orders[$orderId]['goods'])) {
                        $orders[$orderId]['goods'] = [];
                    }

                    array_push($orders[$orderId]['goods'], $goods);
                }

                exit(json_encode($orders));

            } catch(\PDOException $e) {

                header("HTTP/1.0 400 Bad request");
                
                die;
            }
        }
    }