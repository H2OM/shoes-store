<?php

namespace app\services;

use app\core\Validator;
use Exception;

/** Сервис по управлению формами */
class CallbackService {
    public function __construct(private readonly Validator $validator) {}

    /**
     * Обработка подписки по email
     *
     * @param string $email
     * @return bool
     * @throws Exception
     */
    public function subscribe(string $email): bool {
        $data = $this->validator->validate(data: [
            'email' => $email
        ], rules: [
            'email' => ['required', 'email'],
        ]);

        if(!$data) {
            throw new Exception(message: $this->validator->formatErrors(), code: 403);
        }

        //TODO обработка подписки

        return true;
    }

    /**
     * Обработка заполнения формы обратной связи
     *
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public function form(array $data): bool {
        $validateData = $this->validator->validate(data: $data, rules: [
            'email'      => ['required', 'email'],
            'first_name' => ['required', 'name'],
            'title'      => ['required', 'text'],
            'message'    => ['text'],
        ]);

        if(!$validateData) {
            throw new Exception(message: $this->validator->formatErrors(), code: 403);
        }

        //TODO обработка формы

        return true;
    }
}