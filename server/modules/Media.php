<?php
    namespace app\modules;

    use app\Db;

    class Media extends Runner {

        protected function mainInfo() {

            try {

                $info = Db::getQuery("SELECT * FROM news");
                
                $userQueryPart = ($this->isUserSessionIsset ? " IF(favorites.Goods_id = goods.id, true, false) AS Fav, " : "");

                $userFavoritesQueryPart = ($this->isUserSessionIsset ? " AND favorites.User_id = '".$_SESSION['user']['id']."' " : "");

                $result = Db::getQuery("SELECT goods.id, goods.Title, goods.Brand, goods.Type, goods.Article, goods.Price, goods.Price_old, goods.Image, goods.SliderImages, 
                                        GROUP_CONCAT(filters_values.value SEPARATOR '.') AS Size, $userQueryPart
                                        IF(goods.Hit = '1', true, false) AS Hit, IF(goods.Price_old > 0, true, false) AS Sale, categories.Code AS Category 
                                        FROM goods JOIN filters_goods JOIN filters_values JOIN filters ON filters_values.filter_id = filters.id 
                                        AND filters.Code = 'size' AND filters_goods.goods_id = goods.id AND filters_goods.goods_id = goods.id 
                                        AND filters_goods.filter_value_id = filters_values.id JOIN categories ON goods.Category_id = categories.id 
                                        LEFT JOIN favorites ON goods.id = favorites.Goods_id 
                                        $userFavoritesQueryPart
                                        WHERE (goods.Hit = '1' OR goods.Price_old > 0) GROUP BY goods.id");

                $popular = [];

                $sales = [];

                foreach($result as $k=>$v) {

                    if($v['Hit']) {
                        array_push($popular, $v);
                    }

                    if($v['Sale']) {
                        array_push($sales, $v);
                    }
                }

                exit(json_encode(["slider"=>$info, "popular"=>$popular, "sales"=>$sales]));

            } catch(\PDOException $e) {

                header("HTTP/1.0 403 Bad request");
                
                die;
            }
        }
    }   