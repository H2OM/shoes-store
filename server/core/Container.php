<?php

namespace app\core;

use Exception;
use ReflectionClass;
use ReflectionException;

/** DI контейнер */
class Container {
    private array $instances = [];
    private array $variables = [];

    /**
     * Регистрация переменной
     *
     * @param string $key
     * @param mixed $value
     * @return void
     */
    public function setVariable(string $key, mixed $value): void {
        $this->variables[$key] = $value;
    }

    /**
     * Получение переменной
     *
     * @param string $key
     * @return mixed
     */
    public function getVariable(string $key): mixed {
        if(isset($this->variables[$key])) {
            return $this->variables[$key];
        }

        return null;
    }

    /**
     * Регистрация класса
     *
     * @param string $key
     * @param mixed $value
     * @return void
     */
    public function set(string $key, mixed $value): void {
        $this->instances[$key] = $value;
    }

    /**
     * Получение класса
     *
     * @param string $key
     * @param array $manualParams
     * @return mixed
     * @throws Exception
     */
    public function get(string $key, array $manualParams = []): mixed {
        if (isset($this->instances[$key])) {
            return $this->instances[$key];
        }

        if (class_exists($key)) {
            $object = $this->build($key, $manualParams);

            $this->instances[$key] = $object;

            return $object;
        }

        return null;
    }

    /** Создание класса через DI
     *
     * @param string $class
     * @param array $manualParams
     * @return mixed
     * @throws Exception
     */
    public function build(string $class, array $manualParams = []): mixed {
        try {
            $reflector = new ReflectionClass($class);
            $constructor = $reflector->getConstructor();

            if (!$constructor) {
                return new $class;
            }

            $params = [];

            foreach ($constructor->getParameters() as $param) {
                $type = $param->getType();
                $name = $param->getName();

                if ($type && !$type->isBuiltin()) {
                    $params[] = $this->get($type->getName());

                } elseif($name && $value = $this->getVariable($name)) {
                    $params[] = $value;
                }
            }

            return $reflector->newInstanceArgs($manualParams + $params);
        } catch (ReflectionException $e) {
            throw new Exception("Reflection error while building $class: " . $e->getMessage());
        }
    }
}