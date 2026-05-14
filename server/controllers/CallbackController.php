<?php

namespace app\controllers;

use app\core\enums\ResponseMessage;
use app\core\Request;
use app\core\Response;
use app\services\CallbackService;
use Exception;

/** Контролер для управления обратной связи */
class CallbackController {
    public function __construct(
        private readonly Request         $request,
        private readonly CallbackService $callbackService) {}

    /**
     * Обработка формы подписки на новости
     *
     * @return Response
     */
    public function subscribeAction(): Response {
        $email = $this->request->input('email');

        if(!$email) {
            return Response::jsonError(message: ResponseMessage::ERROR_DATA, status: 403);
        }

        try {
            $this->callbackService->subscribe(email: $email);

            return Response::jsonSuccess(message: ResponseMessage::SUCCESS_SUBSCRIBE);
        } catch (Exception $e) {
            return Response::json(data: [
                'error' => true,
                'message' => $e->getMessage()
            ], status: $e->getCode() ?: 400);
        }
    }

    /**
     * Обработка формы обратной связи
     *
     * @return Response
     */
    public function formAction(): Response {
        try {
            $this->callbackService->form(data: $this->request->input());

            return Response::jsonSuccess(message: ResponseMessage::SUCCESS_FORM);
        } catch (Exception $e) {
            return Response::json(data: [
                'error' => true,
                'message' => $e->getMessage()
            ], status: $e->getCode() ?: 400);
        }
    }
}