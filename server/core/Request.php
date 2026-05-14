<?php

namespace app\core;

/** Работа с запросами */
class Request {

    protected ?array $get = null;
    protected ?array $post = null;
    protected ?array $server = null;
    protected ?string $rawBody = null;

    public function __construct(
        ?array $get = null,
        ?array $post = null,
        ?array $server = null,
        ?string $rawBody = null
    ) {
        $this->get = $get;
        $this->post = $post;
        $this->server = $server;
        $this->rawBody = $rawBody;
    }

    /**
     * Метод для получения SERVER данных
     *
     * @param string|null $key
     * @param $default
     * @return mixed
     */
    public function server(?string $key = null, $default = null): mixed {
        if ($this->server === null) {
            $this->server = $_SERVER;
        }

        if ($key === null) {
            return $this->server;
        }

        return $this->server[$key] ?? $default;
    }

    /**
     * Метод для получения GET запроса
     *
     * @param string|null $key
     * @param $default
     * @return mixed
     */
    public function get(?string $key = null, $default = null): mixed {
        if ($this->get === null) {
            $this->get = $_GET;
        }

        if ($key === null) {
            return $this->get;
        }

        return $this->get[$key] ?? $default;
    }


    /**
     * Метод для получения POST запроса
     *
     * @param string|null $key
     * @param $default
     * @return mixed
     */
    public function post(?string $key = null, $default = null): mixed {
        if ($this->post === null) {
            $this->post = $_POST;
        }

        if ($key === null) {
            return $this->post;
        }

        return $this->post[$key] ?? $default;
    }

    /**
     * Метод для получения данных из GET, POST и JSON raw body запросов
     *
     * @param string|null $key
     * @param $default
     * @return mixed
     */
    public function input(?string $key = null, $default = null): mixed {
        if ($this->isJson()) {
            return $this->json($key, $default);
        }

        $data = $this->post() + $this->get();

        if ($key === null) {
            return $data;
        }

        return $data[$key] ?? $default;
    }

    /**
     * Получение сырого json запроса
     *
     * @return string
     */
    public function raw(): string {
        if ($this->rawBody === null) {
            $this->rawBody = file_get_contents('php://input');
        }

        return $this->rawBody;
    }

    /**
     * Получение json запроса
     *
     * @param string|null $key
     * @param $default
     * @return mixed
     */
    public function json(?string $key = null, $default = null): mixed {
        $data = json_decode($this->raw(), true);

        if (!is_array($data)) {
            return $default;
        }

        if ($key === null) {
            return $data;
        }

        return $data[$key] ?? $default;
    }

    /**
     * Определение json запроса
     *
     * @return bool
     */
    public function isJson(): bool {
        return str_contains(
            $this->server('CONTENT_TYPE') ?? '',
            'application/json'
        );
    }

    /**
     * Определение метода запроса
     *
     * @return string
     */
    public function method(): string {
        return strtoupper($this->server('REQUEST_METHOD') ?? 'GET');
    }

    /**
     * Проверка на GET запрос
     *
     * @return bool
     */
    public function isGet(): bool {
        return $this->method() === 'GET';
    }

    /**
     * Проверка на POST запрос
     *
     * @return bool
     */
    public function isPost(): bool {
        return $this->method() === 'POST';
    }

    /**
     * Метод для определения Fetch-запрса
     *
     * @return bool
     */
    function isFetch(): bool {
        return $this->server('HTTP_SEC_FETCH_SITE') === "same-origin";
    }

    /**
     * Экранирование HTML тегов
     *
     * @param $str
     * @return array|string
     */
    public function sanitize($str): array|string {
        return str_replace("'", '', htmlentities(strip_tags($str)));
    }
}