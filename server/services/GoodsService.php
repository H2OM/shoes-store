<?php

namespace app\services;

use app\core\Db;
use app\core\enums\ResponseMessage;
use app\core\exceptions\ResponseException;
use app\core\Session;
use app\repositories\FiltersRepository;
use app\repositories\GoodsRepository;

/** Сервис для управления товарами */
class GoodsService {
    public function __construct(
        private readonly FiltersRepository $filtersRepository,
        private readonly GoodsRepository   $goodsRepository,
        private readonly FavoritesService  $favoritesService,
        private readonly Session           $session,
    ) {}

    /**
     * Получение популярных и скидочных товаров
     *
     * @return array[]
     */
    public function getHitAndSales(): array {
        $result = $this->goodsRepository->getHitAndSales();

        $hit = [];
        $sales = [];

        foreach($result as $k => $v) {
            if($v['hit'] === '1') {
                $hit[] = $v;
            }
            if($v['sale']) {
                $sales[] = $v;
            }
        }

        return ['hit' => $hit, 'sales' => $sales];
    }

    /**
     * Получение каталога товаров с фильтрацией
     *
     * @param array $filters
     * @return array
     */
    public function getCatalogByFilters(array $filters): array {
        $catalog = $this->goodsRepository->getByFilters($filters);

        if(count($catalog) === 0 || !isset($filters['favorite'])) return $catalog;

        $favorites = $this->session->get('favorites');

        if(empty($favorites)) $favorites = $this->favoritesService->get();

        $showOnlyFavorites = filter_var($filters['favorite'], FILTER_VALIDATE_BOOLEAN);

        return array_filter($catalog, function ($product) use ($favorites, $showOnlyFavorites) {
            $isFavorite = in_array($product['id'], $favorites);

            return $showOnlyFavorites ? $isFavorite : !$isFavorite;
        });
    }

    /**
     * Получение всех фильтров
     *
     * @param array $params
     * @return array
     * @throws ResponseException
     */
    public function getFilters(array $params): array {
        $filters = $this->filtersRepository->getFilters($params);

        if(count($filters) === 0) {
            throw new ResponseException(ResponseMessage::ERROR_DATA, 403);
        }

        return $filters;
    }

    /**
     * Получение всех фильтров сгруппированных по коду
     *
     * @param array $params
     * @return array
     * @throws ResponseException
     */
    public function getFiltersGroupByCode(array $params): array {
        $filters = $this->getFilters($params);

        $groupedFilters = [];

        foreach($filters as $filter) {
            if(!$filter['name'] && !$filter['value_code']) {
                continue;
            }

            $code = $filter['code'];

            if(!isset($groupedFilters[$code])) {
                $groupedFilters[$code] = [
                    'code' => $code,
                    'name' => $filter['filter'],
                    'type' => $filter['type'],
                    'values' => []
                ];
            }

            $groupedFilters[$code]['values'][] = [
                'id' => $filter['id'],
                'name' => $filter['name'],
                'code' => $filter['value_code'],
            ];
        }

        return array_values($groupedFilters);
    }
    
    /**
     * Получение всех фильтров сгруппированных по типу
     *
     * @param array $params
     * @return array
     * @throws ResponseException
     */
    public function getFiltersGroupByType(array $params): array {
        $filters = $this->getFilters($params);

        $groupedFilters = [];

        foreach($filters as $filter) {
            if($filter['name'] === "" && $filter['value_code'] === "") {
                continue;
            }

            $type = $filter['type'];

            if(!isset($groupedFilters[$type])) {
                $groupedFilters[$type] = [];
            }

            $index = "";

            foreach($groupedFilters[$type] as $key => $value) {
                if(isset($type['code']) && $value['code'] == $filter['code']) {
                    $index = $key;

                    break;
                }
            }

            if($index !== "") {
                $groupedFilters[$type][$index]["values"][] = [
                    "name" => $filter["name"],
                    "value_code" => $filter['value_code']
                ];
            } else {
                $groupedFilters[$type][] = [
                    "filter" => $filter['filter'],
                    "code" => $filter['code'],
                    "values" => [
                        [
                            "name" => $filter["name"],
                            "value_code" => $filter['value_code']
                        ]
                    ]
                ];
            }
        }

        return $groupedFilters;
    }

    /**
     * Получение отдельного товара по id
     *
     * @param int $id
     * @return array
     * @throws ResponseException
     */
    public function getProductById(int $id): array {
        $product = $this->goodsRepository->getProductDetailsById($id);

        if(!$product) {
            throw new ResponseException(ResponseMessage::ERROR_GET_DATA);
        }

        if(count($product) === 0) {
            throw new ResponseException(ResponseMessage::ERROR_PRODUCT_NOT_FOUND, 404);
        }

        if(!empty($product['colors'])) {
            $colors = array_unique(explode(',', $product['colors']));

            sort($colors);

            foreach ($colors as &$color) {
                $params = explode(';', $color);

                $color = [
                    'id' => (int)$params[0],
                    'article' => $params[1],
                    'category' => $params[2],
                    'image' => $params[3],
                ];
            }

            $product['colors'] = $colors;
        } else {
            $product['colors'] = [];
        }

        return $product;
    }

    /**
     * Получение связанных товаров по id
     *
     * @param int $id
     * @return array
     */
    public function getRelatedById(int $id): array {
        return $this->goodsRepository->getRelatedById($id);
    }
}