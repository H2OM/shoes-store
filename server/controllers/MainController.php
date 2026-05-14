<?php
namespace app\controllers;

use app\core\Response;
use app\services\GoodsService;
use app\services\MainService;

/** Контролер для управления главной информацией */
class MainController {
    public function __construct(
        private readonly MainService $mainService,
        private readonly GoodsService $goodsService
    ) {}

    /**
     * Получение основной информации
     *
     * @return Response
     */
    public function infoAction(): Response {
        $news = $this->mainService->getNews();
        $goods = $this->goodsService->getHitAndSales();

        return Response::jsonSuccess(data: [
            'slider' => $news,
            'popular' => $goods['hit'] ?? [],
            'sales' => $goods['sales'] ?? []
        ]);
    }
}