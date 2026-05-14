<?php

namespace app\controllers;

use app\core\enums\ResponseMessage;
use app\core\exceptions\ResponseException;
use app\services\AuthService;
use app\services\FavoritesService;
use app\core\Request;
use app\core\Response;

/** Контроллер для управления избранным */
class FavoritesController {
    public function __construct(
        private readonly FavoritesService $favoritesService,
        private readonly Request          $request
    ) {}

    /**
     * Получение
     *
     * @return Response
     */
    public function getAction(): Response {
        $favorites = $this->favoritesService->get();

        return Response::jsonSuccess(data: $favorites);
    }

    /**
     * Добавление
     *
     * @return Response
     */
    public function addAction(): Response {
        $productId = (int)$this->request->get('product_id');

        if (empty($productId) || !is_numeric($productId)) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_ENOUGH_DATA, status: 403);
        }

        try {
            $favorites = $this->favoritesService->add(productId: $productId);

            return Response::jsonSuccess(data: $favorites, message: ResponseMessage::SUCCESS_ADD_FAVORITES);
        } catch (ResponseException $e) {
            return Response::jsonError(message: $e->getResponseMessage(), status: $e->getCode() ?: 400);
        }
    }

    /**
     * Удаление
     *
     * @return Response
     */
    public function removeAction(): Response {
        $productId = (int)$this->request->get('product_id');

        if (empty($productId) || !is_numeric($productId)) {
            return Response::jsonError(message: ResponseMessage::ERROR_NOT_ENOUGH_DATA, status: 403);
        }

        try {
            $favorites = $this->favoritesService->remove(productId: $productId);

            return Response::jsonSuccess(data: $favorites, message: ResponseMessage::SUCCESS_REMOVE_FAVORITES);
        } catch (ResponseException $e) {
            return Response::jsonError(message: $e->getResponseMessage(), status: $e->getCode() ?: 400);
        }
    }

    /**
     * Отчистка
     *
     * @return Response
     */
    public function clearAction(): Response {
        try {
            $favorites = $this->favoritesService->clear();

            return Response::jsonSuccess(data: $favorites, message: ResponseMessage::SUCCESS_CLEAR_FAVORITES);
        } catch (ResponseException $e) {
            return Response::jsonError(message: $e->getResponseMessage(), status: $e->getCode() ?: 400);
        }
    }
}