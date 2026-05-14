<?php

namespace app\services;

use app\core\Session;

/** Сервис для управления авторизации и авторизационных данных */
class AuthService {
    public function __construct(private readonly Session $session) {}

    /**
     * Проверка существования пользователя
     *
     * @return bool
     */
    public function check(): bool {
        return !empty($this->session->has('user'));
    }

    /**
     * Получение данных пользователя
     *
     * @return array|null
     */
    public function user(): ?array {
        $user = $this->session->get('user');

        unset($user['password']);

        return $user;
    }

    /**
     * Добавление пользователя в сессию
     *
     * @param array $userData
     * @return void
     */
    public function login(array $userData): void {
        unset($userData['password']);

        $this->session->set('user', $userData);
    }

    /**
     * Удаление данных пользователя из сессии
     *
     * @return void
     */
    public function logout(): void {
        $this->session->remove('user');
    }

    /**
     * Получение id пользователя
     *
     * @return int|null
     */
    public function id(): ?int {
        return $this->session->get('user')['id'] ?? null;
    }
}