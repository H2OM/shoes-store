<?php
    use app\Db;

    function Hdebug($data) {

        if(DEBUG) {
            echo '<pre>'.print_r($data, true).'</pre>';
        }
    }

    function HdestroySession () {

        $_SESSION = array();

        if (session_id() != "" || isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time()-2592000, '/');
        }
            
        session_destroy();
    }

    function HcheckFetch() {

        if(!($_SERVER['HTTP_SEC_FETCH_SITE'] === "same-origin")) {

            // header("HTTP/1.0 400 Bad Request");
            header("HTTP/1.0 404 Not Found");

            die;
        }
    }

    function HgetSafeString($str) {
    
        return str_replace("'", '', htmlentities(strip_tags($str)));
    }

    function HprepairedQuery($data) {

        $preparedQuery = [];

        foreach($data as $k=>$v) {

            if($k === 0) {
                $k = "0";
            }

            switch($k) {

                case "password":

                    array_push($preparedQuery, ["VALUE"=>password_hash($v, PASSWORD_DEFAULT), "PARAMVALUE"=>255]);

                    break;

                case "number":

                    array_push($preparedQuery, ["VALUE"=>HgetSafeString($v), "PARAMVALUE"=>18]);

                    break;

                default:

                    if(is_numeric($v)) {

                        array_push($preparedQuery, ["VALUE"=>HgetSafeString($v), "INT"=>true]);

                    } else {

                        array_push($preparedQuery, ["VALUE"=>HgetSafeString($v), "PARAMVALUE"=>128]);
                    }

                    break;
            }
        }

        return $preparedQuery;
    }

    function HcheckUserInput() {

        $dataInputs = [];

        foreach($_POST as $key => $value) {

            $value = trim($value, " ");

            switch($key) {

                case "number": 

                    if(!preg_match("/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/", $value)) {

                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "password":

                    $isPasswordNotMultiCasesAndHasOnlyDigits = (!preg_match("/\D+/", $value) || strtolower($value) == $value || strtoupper($value) == $value);

                    if(iconv_strlen($value) < 6 || $isPasswordNotMultiCasesAndHasOnlyDigits) {
                        return false;
                    } 

                    if(isset($_POST["rePassword"]) && $_POST["rePassword"] !== $value) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "firstName":

                    if(iconv_strlen($value) < 2 || !preg_match("/^[а-яА-Я]+$/u", $value) || preg_match("/'/", $value)) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;
                    
                case "secondName":

                    if(iconv_strlen($value) < 2 || !preg_match("/^[а-яА-Я]+$/u", $value) || preg_match("/'/", $value)) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "age":

                    if(!is_numeric($value) || ($value < 6 && $value > 150)) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "gender":

                    switch($value) {

                        case "Женский":

                            $dataInputs[$key] = "female";

                            break;

                        case "Мужской":

                            $dataInputs[$key] = "male";

                            break;

                        default:

                            return false;
                    }
                    
                    break;

                case "mail":

                    if(!filter_var($value, FILTER_VALIDATE_EMAIL)  || preg_match("/'/", $value)) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                    case "rePassword":

                        $isPasswordNotMultiCasesAndHasOnlyDigits = (!preg_match("/\D+/", $value) || strtolower($value) == $value || strtoupper($value) == $value);

                        if(iconv_strlen($value) < 6 || !preg_match("/\D+/", $value) || strtolower($value) == $value || strtoupper($value) == $value) {
                            return false;
                        } 

                        if(isset($_POST["password"]) && $_POST['password'] != $value) {
                            return false;
                        }

                        break;

                case "agreement":

                    if($value !== "on") {
                        return false;
                    }

                    break;

                case "title":

                    if(iconv_strlen($value) > 30 || iconv_strlen($value) < 5) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                case "message":

                    if(iconv_strlen($value) > 300 || iconv_strlen($value) < 5) {
                        return false;
                    }

                    $dataInputs[$key] = $value;

                    break;

                    default:
                        break;
            }
        }

        ksort($dataInputs);

        return $dataInputs;
    }

    function HgetFilteredCatalog() {

        $sql_part_select = "";

        $sql_part_condition = "";

        $prepare_selected_value = [];

        $prepare_conditioned_value = [];

        if(isset($_GET) && !empty($_GET)) {

            $codes = HgetCodeFilters();

            $index = 1;

            array_push($codes, "fav");

            foreach($_GET as $k=>$v) {

                if(!in_array($k, $codes)) {
                    continue;
                }

                if($k == "sort") {
                    continue;
                }

                switch($k) {

                    case "category":

                        $v = strtolower($v);

                        switch($v) {
                            case "man":

                                $sql_part_condition .= "(categories.Code = 'Man' OR categories.Code = 'All') AND ";

                                break;

                            case "woman":

                                $sql_part_condition .= "(categories.Code = 'Woman' OR categories.Code = 'All') AND ";

                                break;

                            case "kids":

                                $sql_part_condition .= "categories.Code = 'Kids' AND ";

                                break;

                            case "all":

                                $sql_part_condition .= "categories.Code = 'All' AND ";

                                break;

                            default:
                                break;
                        }

                        break;

                    case "price":

                        $v = explode(",", $v);

                        if(count($v) == 2 && is_numeric($v[0]) && is_numeric($v[1])) {

                            $sql_part_condition .= "goods.Price <= ? AND goods.Price >= ? AND ";

                            array_push($prepare_conditioned_value, $v[1], $v[0]);
                        }

                        break;

                    case "sale":

                        switch($v) {

                            case "Yes":

                                $sql_part_condition .= "goods.Price <= (goods.Price_old * 1) AND ";

                                break;

                            case "More10":

                                $sql_part_condition .= "goods.Price <= (goods.Price_old * 0.9) AND ";

                                break;

                            case "More30":

                                $sql_part_condition .= "goods.Price <= (goods.Price_old * 0.7) AND ";

                                break;

                            case "More50":

                                $sql_part_condition .= "goods.Price <= (goods.Price_old * 0.5) AND ";

                                break;

                            default:
                                break;
                        }

                        break;

                    case "fav":

                        if(!isset($_SESSION['user']) || empty($_SESSION['user'])) {
                            break;
                        }

                        switch($v) {

                            case "true":

                                $sql_part_condition .= "favorites.User_id = '".$_SESSION['user']['id']."' AND ";

                                break;

                            default:
                                break;
                        }

                        break;

                    default:

                        $v = explode(",", $v);

                        if(count($v) >= 1) {

                            $sql_part_select .= "(SELECT goods.id AS ID FROM goods JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                                    JOIN filters_values ON filters_values.id = filters_goods.filter_value_id JOIN filters 
                                                    ON filters.id = filters_values.filter_id WHERE (";

                            foreach($v as $key=>$value) {

                                $sql_part_select .= "COALESCE(filters_values.Code, filters_values.id) = ? OR ";
                                
                                array_push($prepare_selected_value, $value);
                            }

                            $sql_part_select = substr_replace($sql_part_select, ")", -4);

                            $sql_part_select .= " AND filters.Code = ? GROUP BY goods.id) AS ".$index."s".", ";

                            array_push($prepare_selected_value, $k);

                            $sql_part_condition .= "goods.id = ".$index."s".".ID AND ";

                        }

                        break;
                }

                $index++;
            }

            if(strlen($sql_part_condition) > 0) {
                $sql_part_condition = " WHERE ". substr_replace($sql_part_condition, "", -5);
            }

            $sql_part_condition .= " GROUP BY goods.id";

            if(isset($_GET['sort'])) {

                switch($_GET['sort']) {

                    case "LowToHigh":

                        $sql_part_condition .= " ORDER BY goods.Price ASC";

                        break;

                    case "HighToLow":

                        $sql_part_condition .= " ORDER BY goods.Price DESC";

                        break;

                    default:
                        break;
                }
            }
        } else {
            $sql_part_condition .= " GROUP BY goods.id";
        }

        try {

            $attributes = HprepairedQuery(array_merge($prepare_selected_value, $prepare_conditioned_value));

            $isUserAuth = ((isset($_SESSION['user']) && !empty($_SESSION['user'])));

            $userQueryPart = ($isUserAuth ? ", IF(favorites.Goods_id = goods.id, true, false) AS 'Fav'" : "");

            $result = Db::getPreparedQuery("SELECT goods.*, categories.Code AS Category, GROUP_CONCAT(filters_values.value SEPARATOR '.') AS Size 
                                            $userQueryPart 
                                            FROM ".$sql_part_select."filters_goods JOIN goods 
                                            JOIN filters_values ON filters_goods.goods_id = goods.id 
                                            AND filters_goods.filter_value_id = filters_values.id 
                                            JOIN filters ON filters_values.filter_id = filters.id AND filters.Code = 'size' JOIN 
                                            categories ON goods.Category_id = categories.id LEFT JOIN favorites ON goods.id = favorites.Goods_id".$sql_part_condition, $attributes);
            
            return $result;

        } catch(\PDOException $e) {

            header("HTTP/1.0 403 Bad request");

            die;
        }
    }

    function HgetCodeFilters() {
        return json_decode(file_get_contents(DATA . "Filters.json", true), true)['Code'];
    }

    function HGetFilters() {

        $sql_part_condition = "";

        if(isset($_GET['category'])) {

            $v = strtolower($_GET['category']);

            switch ($v) {

                case "man":

                    $sql_part_condition .= "AND (categories.Code = 'Man' OR categories.Code = 'All')";

                    break;

                case "woman":

                    $sql_part_condition .= "AND (categories.Code = 'Woman' OR categories.Code = 'All')";

                    break;

                case "kids":

                    $sql_part_condition .= "AND categories.Code = 'Kids'";

                    break;

                case "all":

                    $sql_part_condition .= "AND (categories.Code = 'Man' OR categories.Code = 'Woman' OR categories.Code = 'All')";

                    break;

                default:
                    break;
            }
        }

        try {

            $isFavoritesParamIsset = (isset($_GET['fav']) && $_GET['fav'] == 'true');

            $userFavoritesQueryPart = ($isFavoritesParamIsset ? "JOIN favorites ON favorites.Goods_id = goods.id" : "");

            $result = Db::getQuery("SELECT filters.Filter, filters.Code, filters.Type, filters_values.id,
                                    IF(filters.Type = 'Multi' AND filters_goods.filter_value_id = filters_values.id, filters_values.value, 
                                    IF(filters.Type = 'Multi', null, IF(filters.Code = 'price', null, COALESCE(filters_values.value, categories.Title)))) AS Name, 
                                    IF(filters.Type = 'Multi' AND filters_goods.filter_value_id = filters_values.id, COALESCE(filters_values.Code, filters_values.id), 
                                    IF(filters.Type = 'Multi', null, IF(filters.Code = 'price', CONCAT(MIN(goods.Price), ',', MAX(goods.Price)), 
                                    COALESCE(filters_values.Code, filters_values.id, categories.Code)))) AS ValueCode 
                                    FROM filters JOIN categories LEFT JOIN filters_values ON filters.id = filters_values.filter_id JOIN goods 
                                    LEFT JOIN filters_goods ON filters_values.id = filters_goods.filter_value_id AND goods.id = filters_goods.goods_id 
                                    AND categories.id = goods.Category_id ".$sql_part_condition." $userFavoritesQueryPart
                                    WHERE IF(filters.Code = 'price', goods.Category_id = categories.id ".$sql_part_condition.", filters.Code is NOT null) 
                                    GROUP BY Name, Code ORDER BY Type, id ASC, Name DESC;");

            $filters = [];

            foreach($result as $key=>$value) {

                if($value['Name'] == "" && $value['ValueCode'] == "") {
                    continue;
                }

                if(!isset($filters[$value['Type']])) {
                    $filters[$value['Type']] = [];
                }

                $index = "";

                foreach($filters[$value['Type']] as $k=>$v) {

                    if(isset($v['Code']) && $v['Code'] == $value['Code']) {

                        $index = $k;
                        break;
                    }
                }

                if($index !== "") {

                    array_push($filters[$value['Type']][$index]["Values"], ["Name"=>$value["Name"], "ValueCode"=>$value['ValueCode']]);

                } else {

                    array_push($filters[$value['Type']], [
                        "Filter"=>$value['Filter'], 
                        "Code"=>$value['Code'], 
                        "Values"=>[
                            [
                                "Name"=>$value["Name"], 
                                "ValueCode"=>$value['ValueCode']
                            ]
                        ]
                    ]);
                }
            }

            return $filters;

        } catch(\PDOException $e) {

            header("HTTP/1.0 403 Bad request");

            die;
        }
    }

    function reloadBasket() {

        $isBasketSessionIsset = (isset($_SESSION['basket']) && !empty($_SESSION['basket']));

        $isUserSessionIsset = (isset($_SESSION['user']) && !empty($_SESSION['user']));

        if(!$isBasketSessionIsset || !$isUserSessionIsset) {
            return;
        }

        $sql_part = "";

        foreach($_SESSION['basket'] as $k=>$v) {

            if(!isset($v['Fav'])) {

                $_SESSION['basket'][$k]['Fav'] = 0;

                $sql_part .= "goods.Article = '".$v['Article']."' OR ";
            }
        }

        if($sql_part != "") {

            $sql_part = substr_replace($sql_part, "", -3);

            $result = Db::getQuery("SELECT goods.id, IF(favorites.Goods_id = goods.id, true, false) AS Fav 
                                    FROM goods JOIN favorites ON goods.id = favorites.Goods_id 
                                    AND favorites.User_id = ".$_SESSION['user']['id']."
                                    WHERE ".$sql_part);

            if(!empty($result)) {

                if(isset($result['id'])) {
                    $result = [$result];
                }

                foreach($_SESSION['basket'] as $k=>$v) {

                    foreach($result as $key=>$val) {

                        if($v['id'] == $val['id']) {
                            $_SESSION['basket'][$k]['Fav'] = $val['Fav'];
                        }
                    }
                }
            }

            return;

        } else {
            
            return;
        }
    }