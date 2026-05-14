<?php

namespace app\core\exceptions;

use app\core\enums\ResponseMessage;
use Exception;

class ResponseException extends Exception {
    private ResponseMessage $responseMessage;

    public function __construct(ResponseMessage $responseMessage, int $code = 400) {
        $this->responseMessage = $responseMessage;

        parent::__construct($responseMessage->value, $code);
    }

    public function getResponseMessage(): ResponseMessage {
        return $this->responseMessage;
    }
}