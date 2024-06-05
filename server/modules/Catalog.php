<?php
    namespace app\modules;

    use app\Db;

    class Catalog extends Runner {

        protected function getCatalog() {

            if(isset($_GET['fav']) && !$this->isUserSessionIsset) {

                header("HTTP/1.0 400 Bad request");

                die;
            }

            $catalog = HgetFilteredCatalog();

            if(isset($catalog['id'])) {
                $catalog = [$catalog];
            }

            $filters = HGetFilters();

            exit(json_encode(["goods"=>$catalog, "count"=>count($catalog),"filters"=>$filters]));
        }

        protected function getProduct() {

            if(!isset($_GET['category']) || !isset($_GET['article'])) {

                header("HTTP/1.0 400 Bad request");
                die;
            }

            $prepaired = [
                ["VALUE"=>HgetSafeString($_GET['article']), "PARAMVALUE"=>13],
                ["VALUE"=>HgetSafeString($_GET['article']), "PARAMVALUE"=>13],
                ["VALUE"=>HgetSafeString($_GET['article']), "PARAMVALUE"=>13],
                ["VALUE"=>HgetSafeString($_GET['article']), "PARAMVALUE"=>13]
            ];

            try {

                $userQueryPart = ($this->isUserSessionIsset ? " IF(favorites.Goods_id = goods.id, true, false) AS Fav, " : "");

                $product = Db::getPreparedQuery("SELECT goods.*, Base.value AS Color, categories.Code AS Category, $userQueryPart
                                                GROUP_CONCAT(filters_values.value SEPARATOR '.') AS Size, Mods.Colors 
                                                FROM (SELECT GROUP_CONCAT(CONCAT(goods.Article, '#', categories.Code, '#', goods.Image) SEPARATOR ',') AS Colors 
                                                FROM goods_variations JOIN goods ON (goods_variations.Base_id = goods.id OR goods_variations.Variation_id = goods.id) 
                                                JOIN categories ON goods.Category_id = categories.id 
                                                WHERE (goods_variations.Base_Article = ? OR goods_variations.Variation_Article = ?) ORDER BY goods_variations.Base_Article DESC) AS Mods, 
                                                (SELECT filters_values.value FROM goods JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                                JOIN filters_values ON filters_goods.filter_value_id = filters_values.id JOIN filters ON filters_values.filter_id = filters.id 
                                                AND filters.Code = 'color' WHERE goods.Article = ?) AS Base, 
                                                goods JOIN categories ON goods.Category_id = categories.id JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                                JOIN filters_values ON filters_goods.filter_value_id = filters_values.id 
                                                JOIN filters ON filters_values.filter_id = filters.id AND filters.Code = 'size' 
                                                LEFT JOIN favorites ON favorites.Goods_id = goods.id AND favorites.User_id = 5 WHERE goods.Article = ?",
                                                $prepaired);

                if(!empty($product['Colors'])) {

                    $colors = [];

                    foreach(explode(',', $product['Colors']) as $k=>$v) {

                        if(!in_array($v, $colors)) {
                            array_push($colors, $v);
                        }
                    }

                    sort($colors);

                    $product['Colors'] = implode(',', $colors);
                }

                array_pop($prepaired);

                $userFavoritesQueryPart = ($this->isUserSessionIsset ? " AND favorites.User_id = '".$_SESSION['user']['id']."' " : "");

                $related = Db::getPreparedQuery("SELECT goods.id, goods.Title, goods.Brand, goods.Type, goods.Article, goods.Price, goods.Price_old, 
                            goods.Image, goods.SliderImages, categories.Code AS Category, $userQueryPart 
                            GROUP_CONCAT(filters_values.value SEPARATOR '.') AS Size FROM goods_related 
                            JOIN goods ON goods_related.Goods_id = goods.id OR goods_related.Related_id = goods.id 
                            JOIN filters_goods JOIN filters_values JOIN filters ON filters_values.filter_id = filters.id 
                            AND filters.Code = 'size' AND filters_goods.goods_id = goods.id 
                            AND filters_goods.goods_id = goods.id AND filters_goods.filter_value_id = filters_values.id 
                            JOIN categories ON goods.Category_id = categories.id 
                            LEFT JOIN favorites ON goods.id = favorites.Goods_id 
                            $userFavoritesQueryPart
                            WHERE (goods_related.Goods_Article = ? OR goods_related.Related_Article = ?) 
                            AND goods.Article != ? GROUP BY goods.id",
                            $prepaired, false, false);
                
                
                if(isset($related['id'])) {
                    $related = [$related];
                }

                exit(json_encode(["product"=>$product,"related"=>$related]));

            } catch (\PDOException $e) {

                header("HTTP/1.0 400 Bad request");

                die;
            }
        }
    }