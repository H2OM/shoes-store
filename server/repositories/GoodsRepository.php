<?php

namespace app\repositories;

use app\core\Db;

/** Репозиторий для управления товарами */
class GoodsRepository {
    public function __construct(private readonly Db $db) {}

    /**
     * Получение популярных и скидочных товаров
     *
     * @return array
     */
    public function getHitAndSales(): array {
        return $this->db->fetchAll("SELECT goods.*, GROUP_CONCAT(filters_values.value SEPARATOR '.') AS size, 
                                    IF(goods.price_old > 0, 1, 0) AS sale, categories.code AS category 
                                    FROM goods JOIN filters_goods JOIN filters_values JOIN filters ON filters_values.filter_id = filters.id 
                                    AND filters.code = 'size' AND filters_goods.goods_id = goods.id AND filters_goods.goods_id = goods.id 
                                    AND filters_goods.filter_value_id = filters_values.id JOIN categories ON goods.category_id = categories.id 
                                    WHERE (goods.hit = '1' OR goods.price_old > 0) GROUP BY goods.id");
    }

    /**
     * Получение товаров по фильтрам
     *
     * @param array $filters
     * @return array
     */
    public function getByFilters(array $filters): array {
        $sqlPartSelect = "";
        $sqlPartCondition = "";
        $prepareSelectedValue = [];
        $prepareConditionedValue = [];

        $index = 1;

        foreach ($filters as $key => $value) {
            if($key === 'sort') continue;

            switch($key) {
                case "category":
                    $sqlPartCondition .= match (strtolower($value)) {
                        "man" => "(categories.code = 'man' OR categories.code = 'all') AND ",
                        "woman" => "(categories.code = 'woman' OR categories.code = 'all') AND ",
                        "kids" => "categories.Code = 'kids' AND ",
                        "all" => "categories.Code = 'all' AND ",
                        default => ''
                    };

                    break;
                case "price":
                    $price = explode(",", $value);

                    if(count($price) == 2 && is_numeric($price[0]) && is_numeric($price[1])) {
                        $sqlPartCondition .= "goods.price <= ? AND goods.price >= ? AND ";

                        array_push($prepareConditionedValue, $price[1], $price[0]);
                    }

                    break;
                case "sale":
                    switch($value) {
                        case "Yes":
                            $sqlPartCondition .= "goods.price <= (goods.price_old * 1) AND ";

                            break;
                        case "More10":
                            $sqlPartCondition .= "goods.price <= (goods.price_old * 0.9) AND ";

                            break;
                        case "More30":
                            $sqlPartCondition .= "goods.price <= (goods.price_old * 0.7) AND ";

                            break;
                        case "More50":
                            $sqlPartCondition .= "goods.price <= (goods.price_old * 0.5) AND ";

                            break;
                        default:
                            break;
                    }

                    break;
                case "brand":
                case "size":
                case "color":
                case "type":
                    $filter = explode(",", $value);

                    if(count($filter) >= 1) {
                        $sqlPartSelect .= "(SELECT goods.id AS ID FROM goods JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                                    JOIN filters_values ON filters_values.id = filters_goods.filter_value_id JOIN filters 
                                                    ON filters.id = filters_values.filter_id WHERE (";

                        foreach($filter as $field) {
                            $sqlPartSelect .= "COALESCE(filters_values.code, filters_values.id) = ? OR ";

                            $prepareSelectedValue[] = $field;
                        }

                        $sqlPartSelect = substr_replace($sqlPartSelect, ")", -4);
                        $sqlPartSelect .= " AND filters.code = ? GROUP BY goods.id) AS {$index}s, ";

                        $prepareSelectedValue[] = $key;

                        $sqlPartCondition .= "goods.id = {$index}s.ID AND ";
                    }

                    break;
                default:
                    break;
            }

            $index++;
        }

        if(strlen($sqlPartCondition) > 0) {
            $sqlPartCondition = " WHERE ". substr_replace($sqlPartCondition, "", -5);
        }

        $sqlPartCondition .= " GROUP BY goods.id";

        if(isset($filters['sort'])) {
            $sqlPartCondition .= match ($filters['sort']) {
                'low_to_high' => ' ORDER BY goods.price ASC',
                'high_to_low' => ' ORDER BY goods.price DESC',
                default => ''
            };
        }

        return $this->db->fetchAll("SELECT goods.*, categories.code AS category, GROUP_CONCAT(filters_values.value SEPARATOR '.') AS size 
                                            FROM ".$sqlPartSelect."filters_goods JOIN goods 
                                            JOIN filters_values ON filters_goods.goods_id = goods.id 
                                            AND filters_goods.filter_value_id = filters_values.id 
                                            JOIN filters ON filters_values.filter_id = filters.id AND filters.code = 'size' JOIN 
                                            categories ON goods.category_id = categories.id".$sqlPartCondition,
        [...$prepareSelectedValue, ...$prepareConditionedValue]);
    }

    /**
     * Получение отдельного товара с подробностями по id
     *
     * @param int $id
     * @return array|null
     */
    public function getProductDetailsById(int $id): array|null {
       return $this->db->fetchOne("SELECT goods.*, base.value AS color, categories.code AS category, 
                                        GROUP_CONCAT(filters_values.value SEPARATOR '.') AS size, mods.colors 
                                        FROM (SELECT GROUP_CONCAT(CONCAT(goods.id, ';', goods.article, ';', categories.code, ';', goods.image) SEPARATOR ',') AS colors 
                                        FROM goods_variations JOIN goods ON (goods_variations.base_id = goods.id OR goods_variations.variation_id = goods.id) 
                                        JOIN categories ON goods.category_id = categories.id 
                                        WHERE (goods_variations.base_id = ? OR goods_variations.variation_id = ?) ORDER BY goods_variations.base_article DESC) AS mods, 
                                        (SELECT filters_values.value FROM goods JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                        JOIN filters_values ON filters_goods.filter_value_id = filters_values.id JOIN filters ON filters_values.filter_id = filters.id 
                                        AND filters.code = 'color' WHERE goods.id = ?) AS base, 
                                        goods JOIN categories ON goods.category_id = categories.id JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                        JOIN filters_values ON filters_goods.filter_value_id = filters_values.id 
                                        JOIN filters ON filters_values.filter_id = filters.id AND filters.code = 'size' 
                                        WHERE goods.id = ?",
            array_fill(0, 4, $id));
    }

    /**
     * Получение товаров по id
     *
     * @param array $id
     * @return array
     */
    public function getProductsById(array $id): array {
        return $this->db->fetchAll($this->prepareProductsById([$id]), [$id]);
    }

    /**
     * Получение отдельного товара по id
     *
     * @param int $id
     * @return array|null
     */
    public function getProductById(int $id): array|null {
        return $this->db->fetchOne($this->prepareProductsById([$id]), [$id]);
    }

    /**
     * Получение товара по id и размеру
     *
     * @param string $id
     * @param string $size
     * @return array|null
     */
    public function getProductByIdAndSize(string $id, string $size): array|null {
        return $this->db->fetchOne("SELECT goods.*, categories.code AS category 
                                        FROM goods JOIN filters_goods ON filters_goods.goods_id = goods.id 
                                        JOIN filters_values ON filters_goods.filter_value_id = filters_values.id AND filters_values.value = ?
                                        JOIN filters ON filters_values.filter_id = filters.id JOIN categories ON goods.category_id = categories.id
                                        WHERE goods.id = ? AND filters.code = 'size'",
            [$size, $id]);
    }

    /**
     * Получение связанных товаров по id
     *
     * @param int $id
     * @return array
     */
    public function getRelatedById(int $id): array {
        return $this->db->fetchAll("SELECT goods.*, categories.code AS category, 
                                        GROUP_CONCAT(filters_values.value SEPARATOR '.') AS size FROM goods_related 
                                        JOIN goods ON goods_related.goods_id = goods.id OR goods_related.related_id = goods.id 
                                        JOIN filters_goods JOIN filters_values JOIN filters ON filters_values.filter_id = filters.id 
                                        AND filters.code = 'size' AND filters_goods.goods_id = goods.id AND filters_goods.filter_value_id = filters_values.id 
                                        JOIN categories ON goods.category_id = categories.id 
                                        WHERE (goods_related.goods_id = ? OR goods_related.related_id = ?) 
                                        AND goods.id != ? GROUP BY goods.id",
            array_fill(0, 3, $id));
    }

    /**
     * Получение наличия товара по id
     *
     * @param int $id
     * @return int
     */
    public function getProductId(int $id): int {
        return $this->db->query()
            ->table('goods')
            ->where('id', $id)
            ->value('id');
    }

    /**
     * Подготовка запроса на получения товара/товаров по id
     *
     * @param array $ids
     * @return string
     */
    private function prepareProductsById(array $ids): string {
        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        return "SELECT goods.*, GROUP_CONCAT(filters_values.value SEPARATOR '.') AS size, categories.code AS category 
                FROM goods JOIN filters_goods JOIN filters_values JOIN filters ON filters_values.filter_id = filters.id 
                AND filters.code = 'size' AND filters_goods.goods_id = goods.id AND filters_goods.goods_id = goods.id 
                AND filters_goods.filter_value_id = filters_values.id JOIN categories ON goods.category_id = categories.id 
                WHERE goods.id IN ($placeholders) GROUP BY goods.id";
    }
}