<?php

namespace app\services;

use app\core\enums\ResponseMessage;
use app\core\exceptions\ResponseException;
use app\core\Session;
use app\repositories\FavoritesRepository;
use app\repositories\GoodsRepository;

/** Сервис для управления избранным */
class FavoritesService {
    private array $favorites;

    public function __construct(
        private readonly FavoritesRepository $favoritesRepository,
        private readonly GoodsRepository     $goodsRepository,
        private readonly AuthService         $authService,
        private readonly Session             $session
    ) {
        $favorites = $this->session->get('favorites');

        if(!$favorites) {
            $this->session->set('favorites', []);

            $favorites = [];
        }

        $this->favorites = $favorites;
    }

    /**
     * Получение
     *
     * @return array
     */
    public function get(): array {
        if(!$this->authService->id()) return $this->favorites;

        $this->favorites = $this->favoritesRepository->get($this->authService->id());

        return $this->save();
    }

    /**
     * Сохранение в сессию
     *
     * @return array
     */
    public function save(): array {
        $this->favorites = array_values($this->favorites);
        $this->session->set('favorites', $this->favorites);

        return $this->favorites;
    }

    /**
     * Добавление
     *
     * @param int $productId
     * @return array
     * @throws ResponseException
     */
    public function add(int $productId): array {
        if($this->findProductIndex($productId)) {
            throw new ResponseException(ResponseMessage::ERROR_DUPLICATE);
        }

        $product = $this->goodsRepository->getProductById($productId);

        if(!$product) {
            throw new ResponseException(ResponseMessage::ERROR_PRODUCT_NOT_FOUND);
        }

        if($this->authService->id() && $this->favoritesRepository->add($this->authService->id(), $productId) === 0) {
            throw new ResponseException(ResponseMessage::ERROR_ADD);
        }

        $this->favorites[] = $product;

        return $this->save();
    }

    /**
     * Удаление
     *
     * @param int $productId
     * @return array
     * @throws ResponseException
     */
    public function remove(int $productId): array {
        if($this->authService->id() && $this->favoritesRepository->remove($this->authService->id(), $productId) === 0) {
            throw new ResponseException(ResponseMessage::ERROR_UPDATE);
        }

        $index = $this->findProductIndex($productId);

        if($index === false) {
            throw new ResponseException(ResponseMessage::ERROR_PRODUCT_NOT_FOUND);
        }

        unset($this->favorites[$index]);

        return $this->save();
    }

    /**
     * Отчистка
     *
     * @return array
     * @throws ResponseException
     */
    public function clear(): array {
        if($this->authService->id() && !$this->favoritesRepository->clear($this->authService->id())) {
            throw new ResponseException(ResponseMessage::ERROR_UPDATE);
        }

        $this->favorites = [];

        return $this->save();
    }

    private function findProductIndex(int $id): int|false {
        foreach ($this->favorites as $index => $product) {
            if (!empty($product['id']) && $product['id'] === $id) {
                return $index;
            }
        }

        return false;
    }
}