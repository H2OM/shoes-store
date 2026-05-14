<?php

namespace app\services;

use app\core\enums\ResponseMessage;
use app\core\exceptions\ResponseException;
use app\core\Validator;
use app\repositories\OrdersRepository;
use app\repositories\UserRepository;
use Exception;

/** Сервис для управления пользователями */
class UserService {
    public function __construct(
        private readonly UserRepository   $userRepository,
        private readonly OrdersRepository $ordersRepository,
        private readonly Validator        $validator,
    ) {}

    /**
     * Авторизация пользователя
     *
     * @param string $password
     * @param string $phone
     * @return array
     * @throws ResponseException
     * @throws Exception
     */
    public function signIn(string $password, string $phone): array {
        $validateData = $this->validator->validate(
            data: [
                'password' => $password,
                'phone' => $phone
            ],
            rules: [
                'password' => ['required', 'password'],
                'phone' => ['required', 'phone'],
            ]
        );

        if (!$validateData) {
            throw new ResponseException(ResponseMessage::ERROR_AUTH);
        }

        $user = $this->userRepository->getByPhone($this->normalizePhone($phone));

        if(empty($user) || !password_verify($validateData['password'], $user['password'])) {
            throw new ResponseException(ResponseMessage::ERROR_AUTH);
        }

        return $user;
    }

    /**
     * Регистрация пользователя
     *
     * @param array $userData
     * @return array
     * @throws ResponseException
     * @throws Exception
     */
    public function signUp(array $userData): array {
        $rules = [
            'first_name'  => ['required', 'name'],
            'second_name' => ['required', 'name'],
            'phone'       => ['required', 'phone'],
            'password'    => ['required', 'password', 'confirmed'],
            'age'         => ['required', 'age'],
            'gender'      => ['required', 'gender'],
            'email'       => ['required', 'email'],
        ];

        $validateData = $this->validator->validate($userData, $rules);

        if(!$validateData) {
            throw new Exception($this->validator->formatErrors());
        }

        $prepareUserData = $this->prepareData($validateData);

        $isUserIsset = $this->userRepository->getByPhone($prepareUserData['phone']);

        if($isUserIsset) {
            throw new ResponseException(ResponseMessage::ERROR_USER_PHONE_ISSET);
        }

        $insertId = $this->userRepository->insert($prepareUserData);

        if(!$insertId) {
            throw new ResponseException(ResponseMessage::ERROR_NEW_USER);
        }

        return [
            'id' => (int)$insertId,
            ...$prepareUserData
        ];
    }

    /**
     * Редактирование пользователя
     *
     * @param array $userData
     * @param int $userId
     * @return array
     * @throws ResponseException
     * @throws Exception
     */
    public function edit(array $userData, int $userId): array {
        $validateData = $this->validator->validate(data: $userData, rules: [
            'first_name'  => ['required', 'name'],
            'second_name' => ['required', 'name'],
            'phone'       => ['required', 'phone'],
            'age'         => ['required', 'age'],
            'gender'      => ['required', 'gender'],
            'email'       => ['required', 'email'],
        ]);

        if(!$validateData) {
            throw new Exception($this->validator->formatErrors());
        }

        $prepareUserData = $this->prepareData($validateData);

        $result = $this->userRepository->edit($userId, $prepareUserData);

        if(!$result) {
            throw new ResponseException(ResponseMessage::ERROR_UPDATE);
        }

        return $prepareUserData;
    }

    /**
     * Получение всех заказов
     *
     * @param int $userId
     * @return array
     */
    public function getOrders(int $userId): array {
        $orders = $this->ordersRepository->getByUserId($userId);

        $result = [];

        foreach($orders as $order) {
            $orderId = $order['id'];

            $product = [];

            foreach ($order as $field => $value) {
                if(in_array($field, ['id', 'number', 'status', 'user_id', 'date', 'change_date', 'delivery_date', 'comment'])) {
                     $result[$orderId][$field] = $value;
                } else {
                    $product[$field] = $value;
                }
            }

            if(!isset($result[$orderId]['products'])) {
                $result[$orderId]['products'] = [];
            }

            $result[$orderId]['products'][] = $product;
        }

        return array_values($result);
    }

    /**
     * Подготовка данных для вставки
     *
     * @param array $data
     * @return array
     */
    private function prepareData(array $data): array {
        $prepareData = [];

        foreach($data as $field => $value) {
            $prepareData[$field] = match ($field) {
                'first_name', 'second_name' => ucfirst($value),
                'phone'       => $this->normalizePhone($value),
                'password'    => password_hash($value, PASSWORD_DEFAULT),
                'age'         => (int)$value,
                'email'       => strtolower($value),
                default       => $value,
            };
        }

        return $prepareData;
    }

    /**
     * Функция для нормализации телефонного номера
     *
     * @param string $phone
     * @return string
     */
    private function normalizePhone(string $phone): string {
        return preg_replace('/[^0-9]/', '', $phone);
    }
}