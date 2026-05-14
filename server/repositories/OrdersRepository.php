<?php

namespace app\repositories;

use app\core\Db;

class OrdersRepository {
    public function __construct(private readonly Db $db) {}

    /**
     * Получение всех заказов пользователя по его id
     *
     * @param int $userId
     * @return array
     */
    public function getByUserId(int $userId): array {
        return $this->db->fetchAll("SELECT orders.*, goods.*, orders_goods.size, categories.title as category 
                                                FROM orders JOIN orders_goods ON orders.id = orders_goods.order_id 
                                                JOIN goods ON orders_goods.goods_id = goods.id JOIN categories 
                                                ON categories.id = goods.category_id 
                                                WHERE user_id = ? ORDER BY `orders`.`date` DESC",
            [$userId]);
    }
}