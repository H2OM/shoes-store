<?php

namespace app\repositories;

use app\core\Db;

/** Репозиторий для управления фильтрами */
class FiltersRepository {
    public function __construct(private readonly Db $db) {}

    /**
     * Получение всех фильтров
     *
     * @param array $filters
     * @return array
     */
    public function getFilters(array $filters): array {
        $sqlPartCondition = "";

        if(isset($filters['category'])) {
            $sqlPartCondition .= match (strtolower($filters['category'])) {
                "man" => "AND (categories.code = 'man' OR categories.code = 'all')",
                "woman" => "AND (categories.code = 'woman' OR categories.code = 'all')",
                "kids" => "AND categories.code = 'kids'",
                "all" => "AND (categories.code = 'man' OR categories.code = 'woman' OR categories.code = 'all')",
                default => ''
            };
        }

        return $this->db->fetchAll("SELECT filters.filter, filters.code, filters.type, filters_values.id,
                                IF(filters.type = 'multi' AND filters_goods.filter_value_id = filters_values.id, filters_values.value, 
                                IF(filters.type = 'multi', null, IF(filters.code = 'price', null, COALESCE(filters_values.value, categories.title)))) AS name, 
                                IF(filters.type = 'multi' AND filters_goods.filter_value_id = filters_values.id, COALESCE(filters_values.code, filters_values.id), 
                                IF(filters.type = 'multi', null, IF(filters.code = 'price', CONCAT(MIN(goods.price), ',', MAX(goods.price)), 
                                COALESCE(filters_values.code, filters_values.id, categories.code)))) AS value_code 
                                FROM filters JOIN categories LEFT JOIN filters_values ON filters.id = filters_values.filter_id JOIN goods 
                                LEFT JOIN filters_goods ON filters_values.id = filters_goods.filter_value_id AND goods.id = filters_goods.goods_id 
                                AND categories.id = goods.category_id ".$sqlPartCondition." 
                                WHERE IF(filters.code = 'price', goods.category_id = categories.id ".$sqlPartCondition.", filters.code is NOT null) 
                                GROUP BY Name, code ORDER BY Type, id ASC, Name DESC;");
    }
}