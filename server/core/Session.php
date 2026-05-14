<?php

namespace app\core;

/** Управление сессией */
class Session {
    /**
     * Получение значения из сессии
     *
     * @param string $key
     * @param mixed|null $default
     * @return mixed
     */
    public function get(string $key, mixed $default = null): mixed {
        return $_SESSION[$key] ?? $default;
    }

    /**
     * Установка значения в сессию
     *
     * @param string $key
     * @param mixed $value
     * @return void
     */
    public function set(string $key, mixed $value): void {
        $_SESSION[$key] = $value;
    }

    /**
     * Проверка на наличии в сессии
     *
     * @param string $key
     * @return bool
     */
    public function has(string $key): bool {
        return isset($_SESSION[$key]);
    }

    /**
     * Удаление из сессии
     *
     * @param string $key
     * @return void
     */
    public function remove(string $key): void {
        unset($_SESSION[$key]);
    }
    /**
     * Уничтожение сессии
     *
     * @return void
     */
    public function destroy(): void {
        $_SESSION = [];

        if (session_id() != "" || isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time() - 2592000, '/');
        }

        session_destroy();
    }
}