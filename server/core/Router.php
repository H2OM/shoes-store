<?php
    namespace app\core;

    use Exception;
    use PDOException;

    /** Роутер. Маршрутизация. Обработка ответа. */
    class Router {
        /**
         * Маршрутизация с определением URI
         *
         * @param string $uri
         * @return void
         * @throws Exception
         */
        public static function dispatchURI(string $uri): void {
            $uri = trim(parse_url($uri, PHP_URL_PATH), '/');
            $segments = explode('/', $uri);

            self::dispatch($segments[1] ?? '', $segments[2] ?? '');
        }

        /**
         * Определение маршрутизации
         *
         * @return void
         */
        public static function dispatchInit(): void {
            try {
                $controller = App::request()->server('API_CONTROLLER');
                $action = App::request()->server('API_ACTION');

                if($controller && $action) {
                    Router::dispatch(
                        controller: $controller,
                        action: $action
                    );
                } else {
                    Router::dispatchURI(App::request()->server('REQUEST_URI'));
                }
            } catch (PDOException $e) {
                if(isset($_SESSION['debug'])) $message = $e->getMessage();
                    else $message = 'Внутренняя ошибка сервера!';
                Response::json(['error' => true, 'message' => $message], 500)->send();

            } catch (Exception $e) {
                Response::json(['error' => true, 'message' => $e->getMessage()], 400)->send();
            }
        }

        /**
         * Маршрутизация
         *
         * @param string $controller
         * @param string $action
         * @return void
         * @throws Exception
         */
        public static function dispatch(string $controller = '', string $action = ''): void {
            $controllerName = ucfirst($controller) . 'Controller';
            $action = lcfirst(str_replace(' ', '', ucwords(str_replace('-', ' ', $action)))) . 'Action';

            $class = "app\\controllers\\$controllerName";
            //TODO
$_SESSION['debug'] = 1;
            if (!class_exists($class))
                throw new \Exception("Class not found", 400);

            $controller = App::container()->get($class);

            if (!method_exists($controller, $action))
                throw new \Exception("Action not found", 400);

            $response = $controller->$action();

            if ($response instanceof Response) {
                $response->send();

            } else {
                echo $response;
            }
        }
    }
