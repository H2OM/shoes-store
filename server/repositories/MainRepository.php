<?php

namespace app\repositories;

use app\core\Db;

/** Репозиторий для управления главной информацией */
class MainRepository {
    public function __construct(private readonly Db $db) {}

    /**
     * Получение данных из таблицы 'новости'
     *
     * @return array
     */
    public function getNews(): array {
        return $this->db->query()->table('news')->get();
    }
}