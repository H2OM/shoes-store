<?php

namespace app\core;

use app\core\enums\ResponseMessage;

/** Формирование ответов сервера */
class Response {
    protected string $content;
    protected int $status;
    protected array $headers = [];

    public function __construct(string $content = '', int $status = 200, array $headers = [])
    {
        $this->content = $content;
        $this->status = $status;
        $this->headers = $headers;
    }

    /**
     * Отправка сформированного ответа
     *
     * @return void
     */
    public function send(): void {
        http_response_code($this->status);

        foreach ($this->headers as $name => $value) {
            header("$name: $value");
        }

        echo $this->content;
    }

    /**
     * Формирование успешного ответа с enum-сообщением
     *
     * @param array|null $data
     * @param ResponseMessage|null $message
     * @return Response
     */
    public static function jsonSuccess(mixed $data = null, ResponseMessage $message = null): Response {
        $response = ['success' => true];

        if($data !== null)      $response['data']    = $data;
        if($message)            $response['message'] = $message->value;

        return self::json(data: $response);
    }

    /**
     * Формирование ошибки с enum-сообщением
     *
     * @param array|null $data
     * @param ResponseMessage|null $message
     * @param int $status
     * @return Response
     */
    public static function jsonError(array $data = null, ResponseMessage $message = null, int $status = 400): Response {
        $response = ['error' => true];

        if($message) $response['message'] = $message->value;
        if($data)    $response['data']    = $data;

        return self::json(data: $response, status: $status);
    }

    /**
     * Формирование ответа с enum-сообщением
     *
     * @param array|null $data
     * @param ResponseMessage|null $message
     * @param int $status
     * @return self
     */
    public static function jsonEnum(array $data = null, ResponseMessage $message = null, int $status = 200): self {
        $response = [];

        if($message) $response['message'] = $message->value;
        if($data)    $response['data']    = $data;

        return self::json(data: $response, status: $status);
    }

    /**
     * Формирование JSON ответа
     *
     * @param mixed $data
     * @param mixed $status
     * @return self
     */
    public static function json(mixed $data, mixed $status = 200): self {
        return new self(
            json_encode($data),
            ((int)$status) ?: 500,
            ['Content-Type' => 'application/json']
        );
    }
}