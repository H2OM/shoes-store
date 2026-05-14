<?php

namespace app\controllers;

use app\core\enums\ResponseMessage;
use app\core\exceptions\ResponseException;
use app\core\Request;
use app\core\Response;
use app\services\AuthService;
use app\services\BasketService;

/** Управление корзиной */
class BasketController {
    public function __construct(
        private readonly BasketService $basketService,
        private readonly Request $session
    ) {}

    /**
     * Получение корзины покупок пользователя
     *
     * @return Response
     */
    public function getAction(): Response {
        return Response::jsonSuccess(data: $this->basketService->get());
    }

    /**
     * Добавление товара
     *
     * @return Response
     */
    public function addAction(): Response {
        $id    = $this->session->input('id');
        $size  = $this->session->input('size');
        $count = (int)$this->session->input('count');

        if(!$id || !$size) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_ENOUGH_DATA, status: 403);
        }

        if($count <= 0) {
            $count = 1;
        }

        try {
            $basket = $this->basketService->add(
                id: $id,
                size: $size,
                count: $count
            );

            return Response::jsonSuccess(data: $basket, message: ResponseMessage::SUCCESS_ADD_BASKET);
        } catch (ResponseException $exception) {
            return Response::jsonError(message: $exception->getResponseMessage(), status: $exception->getCode() ?: 400);
        }
    }

    /**
     * Уменьшение кол-во товара
     *
     * @return Response
     */
    public function decrementAction(): Response {
        $id   = $this->session->input('id');
        $size = $this->session->input('size');

        if(!$id || !$size) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_ENOUGH_DATA, status: 403);
        }

        try {
            $basket = $this->basketService->decrement(id: $id, size: $size);

            return Response::jsonSuccess(data: $basket, message: ResponseMessage::SUCCESS_REMOVE_BASKET);
        } catch (ResponseException $exception) {
            return Response::jsonError(message: $exception->getResponseMessage(), status: $exception->getCode() ?: 400);
        }
    }

    /**
     * Удаление товара
     *
     * @return Response
     */
    public function removeAction(): Response {
        $id   = $this->session->input('id');
        $size = $this->session->input('size');

        try {
            $basket = $this->basketService->remove(id: $id, size: $size);

            return Response::jsonSuccess(data: $basket, message: ResponseMessage::SUCCESS_REMOVE_BASKET);
        } catch (ResponseException $exception) {
            return Response::jsonError(message: $exception->getResponseMessage(), status: $exception->getCode() ?: 400);
        }
    }

    /**
     * Установка кол-во товара
     *
     * @return Response
     */
    public function setCountAction(): Response {
        $id      = $this->session->input('id');
        $size    = $this->session->input('size');
        $count   = (int)$this->session->input('count');

        if(!$id || !$size || $count <= 0) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_ENOUGH_DATA, status: 403);
        }

        try {
            $basket = $this->basketService->setCount(id: $id, size: $size, count: $count);

            return Response::jsonSuccess(data: $basket);
        } catch (ResponseException $exception) {
            return Response::jsonError(message: $exception->getResponseMessage(), status: $exception->getCode() ?: 400);
        }
    }

    /**
     * Отчистка корзины
     *
     * @return Response
     */
    public function clearAction(): Response {
        return Response::jsonSuccess(data: $this->basketService->clear());
    }
}