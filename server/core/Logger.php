<?php

namespace app\core;

/** Логирование */
class Logger {
    /**
     * Дебаг вывод
     *
     * @param $data
     * @return void
     */
    public function debug($data): void {
        if (DEBUG) {
            echo '<pre>' . print_r($data, true) . '</pre>';
        }
    }
}