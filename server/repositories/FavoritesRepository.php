<?php

namespace app\repositories;


use app\core\Db;

/** Репозиторий по управлению избранными товарами */
class FavoritesRepository {
    public function __construct(private readonly Db $db) {}

    /**
     * Получение
     *
     * @param int $userId
     * @return array
     */
    public function get(int $userId): array {
        return $this->db->fetchAll("SELECT goods.*, GROUP_CONCAT(filters_values.value SEPARATOR '.') AS size, categories.code AS category 
                FROM goods JOIN filters_goods JOIN filters_values JOIN filters ON filters_values.filter_id = filters.id 
                AND filters.code = 'size' AND filters_goods.goods_id = goods.id AND filters_goods.goods_id = goods.id 
                AND filters_goods.filter_value_id = filters_values.id JOIN categories ON goods.category_id = categories.id 
                JOIN favorites ON goods.id = favorites.product_id WHERE favorites.user_id = ? GROUP BY goods.id",
        [$userId]);
    }

    /**
     * Добавление
     *
     * @param int $userId
     * @param int $productId
     * @return int
     */
    public function add(int $userId, int $productId): int {
        return $this->db->query()
            ->table('favorites')
            ->insert(['user_id' => $userId, 'product_id' => $productId])
            ->affectedRows();
    }

    /**
     * Удаление
     *
     * @param int $userId
     * @param int $productId
     * @return int
     */
    public function remove(int $userId, int $productId): int {
        return $this->db->query()
            ->table('favorites')
                ->where('user_id', '=', $userId)
                ->where('product_id', '=', $productId)
                ->delete()
                ->affectedRows();
    }

    /**
     * Отчистка
     *
     * @param int $userId
     * @return bool
     */
    public function clear(int $userId): bool {
        return $this->db->query()
            ->table('favorites')
                ->where('user_id', '=', $userId)
                ->delete()
                ->execute();
    }
}
