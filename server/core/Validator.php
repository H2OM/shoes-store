<?php

namespace app\core;

/** Валидация данных */
class Validator {
    private array $errors = [];

    /**
     * Валидирует входные данные по заданным правилам.
     *
     * @param array $data  Входные данные (обычно $_POST)
     * @param array $rules Правила валидации в формате:
     *
     *                     [
     *                         'field' => ['rule1', 'rule2'],
     *                     ]
     *
     * Доступные правила:
     *
     *                     - required   Поле обязательно
     *                     - name       Только буквы (2-100)
     *                     - phone      Проверка телефона (RU)
     *                     - password   Проверка сложности пароля
     *                     - confirmed  Совпадение с field_confirmation
     *                     - age        Возраст (14–100)
     *                     - gender     Проверка допустимых значений
     *                     - email      Валидный email
     *                     - text       текст/сообщение (5-300)
     *
     * @return array|false Возвращает валидированные данные или false при ошибке
     */
    public function validate(array $data, array $rules): array|false {
        $this->errors = [];
        $validated = [];

        foreach ($rules as $field => $fieldRules) {
            $value = trim($data[$field] ?? '');

            foreach ($fieldRules as $rule) {
                $result = $this->applyRule($field, $value, $rule, $data);

                if ($result === false) {
                    break;
                }
            }

            if (!isset($this->errors[$field])) {
                $validated[$field] = $value;
            }
        }

        return empty($this->errors) ? $validated : false;
    }

    /**
     * Определитель правил валидации
     *
     * @param string $field
     * @param mixed $value
     * @param string $rule
     * @param array $data
     * @return bool
     */
    private function applyRule(string $field, mixed $value, string $rule, array $data): bool {
        switch ($rule) {
            case 'required':
                if ($value === '' || $value === null) {
                    $this->errors[$field] = 'Поле обязательно для заполнения';
                    return false;
                }
                break;

            case 'email':
                if (!filter_var($value, FILTER_VALIDATE_EMAIL) || str_contains($value, "'")) {
                    $this->errors[$field] = 'Некорректная почта';
                    return false;
                }
                break;

            case 'phone':
                if (!$this->phoneRUS($value)) {
                    $this->errors[$field] = 'Некорректный номер телефона';
                    return false;
                }
                break;

            case 'password':
                if (!$this->password($value)) {
                    $this->errors[$field] = 'Некорректный пароль';
                    return false;
                }
                break;

            case 'confirmed':
                if (($data[$field . '_confirmed'] ?? null) !== $value) {
                    $this->errors[$field] = 'Пароли не совпадают';
                    return false;
                }
                break;

            case 'name':
                if (iconv_strlen($value) < 2 || iconv_strlen($value) > 100 || !preg_match("/^[А-я]+$/u", $value)) {
                    $this->errors[$field] = 'Некорректное значение';
                    return false;
                }
                break;

            case 'age':
                if (!is_numeric($value) || $value < 14 || $value > 100) {
                    $this->errors[$field] = 'Некорректный возраст';
                    return false;
                }
                break;

            case 'gender':
                if (!$this->gender($value)) {
                    $this->errors[$field] = 'Некорректный пол';
                    return false;
                }
                break;

            case 'boolean':
                if ($value !== 'on') {
                    $this->errors[$field] = 'Должно быть подтвержденно';
                    return false;
                }
                break;

            case "text":
                if(iconv_strlen($value) > 300) {
                    $this->errors[$field] = 'Некорректная длинна';
                    return false;
                }
                break;
        }

        return true;
    }

    /**
     * Получение ошибок валидации
     *
     * @return array
     */
    public function errors(): array {
        return $this->errors;
    }


    /**
     * Формирование ошибок в строковый формат
     *
     * @return string
     */
    public function formatErrors(): string {
        $errors = '';

        foreach ($this->errors as $field => $error) {
            $errors .= "$field: $error\n";
        }

        return $errors;
    }

    /**
     * Проверка на Российский номер
     *
     * @param string $phone
     * @return bool|array
     */
    public function phoneRUS(string $phone): bool|int {
        return preg_match("/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/", $phone);
    }

    /**
     * Проверка на международный номер
     *
     * @param string $phone
     * @return bool|array
     */
    public function phone(string $phone): bool|int {
        return preg_match("/^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/", $phone);
    }

    /**
     * Валидация пароля
     *
     * @param string $password
     * @return bool
     */
    public function password(string $password): bool {
        $isValidPassword = (preg_match("/\D+/", $password) && strtolower($password) != $password && strtoupper($password) != $password);

        if(iconv_strlen($password) < 6 || !$isValidPassword) {
            return false;
        }

        return true;
    }

    /**
     * Определение гендера
     *
     * @param string $gender
     * @return bool
     */
    public function gender(string $gender): bool {
        return match ($gender) {
            "female", "male" => true,
            default => false,
        };
    }
}