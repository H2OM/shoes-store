<?php

namespace app\repositories;

use app\core\Db;

/** Репозиторий для управления пользователями */
class UserRepository {
    public function __construct(private readonly Db $db) {}

    /**
     * Получения пользователя по номеру телефона
     *
     * @param string $phone
     * @return array|null
     */
    public function getByPhone(string $phone): ?array {
        return $this->db->query()
            ->table('users')
            ->where('phone', $phone)
            ->first();
    }

    /**
     * Добавление нового пользователя
     *
     * @param array $userData
     * @return string|false
     */
    public function insert(array $userData): string|false {
        return $this->db->query()
            ->table('users')
            ->insert($userData)
            ->insertId();
    }

    /**
     * Редактирование пользователя
     *
     * @param int $userId
     * @param array $userData
     * @return bool
     */
    public function edit(int $userId, array $userData): bool {
        return $this->db->query()
            ->table('users')
            ->where('id', '=', $userId)
            ->update($userData)
            ->execute();
    }
}