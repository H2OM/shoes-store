<?php

namespace app\controllers;

use app\core\enums\ResponseMessage;
use app\core\exceptions\ResponseException;
use app\core\Request;
use app\core\Response;
use app\services\AuthService;
use app\services\UserService;
use Exception;

/** Контролер для управления пользователями */
class UserController {
    public function __construct(
        private readonly UserService $userService,
        private readonly AuthService $authService,
        private readonly Request     $request
    ) {}

    /**
     * Проверка авторизации
     *
     * @return Response
     */
    public function isAuthAction(): Response {
        return Response::jsonSuccess(data: $this->authService->check());
    }

    /**
     * Авторизация
     *
     * @return Response
     */
    public function signInAction(): Response {
        if($this->authService->check()) {
            return Response::jsonSuccess(data: $this->authService->user(), message: ResponseMessage::USER_ALREADY);
        }

        try {
            $user = $this->userService->signIn(
                password: $this->request->input('password'),
                phone: $this->request->input('phone')
            );

//            TODO При авторизации добавлять избранное из сессию в базу

            $this->authService->login(userData: $user);

            return Response::jsonSuccess(data: $this->authService->user(), message: ResponseMessage::SUCCESS_AUTH);
        } catch (ResponseException $e) {
            return Response::jsonError(message: $e->getResponseMessage(), status: $e->getCode() ?: 400);

        } catch (Exception $e) {
            return Response::json(data: [
                'error' => true,
                'message' => $e->getMessage()
            ], status: $e->getCode() ?: 400);
        }
    }

    /**
     * Регистрация
     *
     * @return Response
     * @throws Exception
     */
    public function signUpAction(): Response {
        if($this->authService->check()) {
            return Response::jsonSuccess(data: $this->authService->user(), message: ResponseMessage::USER_ALREADY);
        }

        try {
            $user = $this->userService->signUp($this->request->input());

//            TODO При авторизации добавлять избранное из сессию в базу

            $this->authService->login(userData: $user);

            return Response::jsonSuccess(data: $this->authService->user(), message: ResponseMessage::SUCCESS_AUTH);
        } catch (ResponseException $e) {
            return Response::jsonError(message: $e->getResponseMessage(), status: $e->getCode() ?: 400);

        } catch (Exception $e) {
            return Response::json(data: [
                'error' => true,
                'message' => $e->getMessage()
            ], status: $e->getCode() ?: 400);
        }
    }

    /**
     * Деавторизация
     *
     * @return Response
     */
    public function logOutAction(): Response {
        if(!$this->authService->check()) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_AUTH, status: 401);
        }

        $this->authService->logout();

        return Response::jsonSuccess(message: ResponseMessage::SUCCESS_LOGOUT);
    }

    /**
     * Получение
     *
     * @return Response
     */
    public function getAction(): Response {
        if(!$this->authService->check()) {
            return Response::jsonSuccess(message: ResponseMessage::ERROR_NOT_AUTH);
        }

        return Response::jsonSuccess(data: $this->authService->user());
    }

    /**
     * Редактирование
     *
     * @return Response
     */
    public function editAction(): Response {
        if(!$this->authService->check()) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_AUTH, status: 401);
        }

        try {
            $updatedUser = $this->userService->edit(
                userData: $this->request->input(),
                userId: $this->authService->id()
            );

            $this->authService->login(userData: $updatedUser + $this->authService->user());

            return Response::jsonSuccess(data: $this->authService->user(), message: ResponseMessage::SUCCESS_EDIT);
        } catch (ResponseException $e) {
            return Response::jsonError(message: $e->getResponseMessage(), status: $e->getCode() ?: 400);

        } catch (\Exception $e) {
            return Response::json(data: [
                'error' => true,
                'message' => $e->getMessage()
            ], status: $e->getCode() ?: 400);
        }
    }

    /**
     * Получение всех заказов
     *
     * @return Response
     */
    public function getOrdersAction(): Response {
        if(!$this->authService->check()) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_AUTH, status: 401);
        }

        $orders = $this->userService->getOrders(userId: $this->authService->id());

        return Response::jsonSuccess(data: $orders);
    }
}
