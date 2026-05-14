<?php

namespace app\core;

use Closure;

/** Конструктор запросов */
class QueryBuilder {
    protected string $prepareQuery = '';
    protected string $table = '';
    protected array $select = ['*'];
    protected array $wheres = [];
    protected array $bindings = [];
    protected string $orderBy = '';
    protected string $limit = '';

    public function __construct(private readonly Db $db) {}

    /**
     * SQL команда TABLE
     *
     * @param string $table
     * @return $this
     */
    public function table(string $table): self {
        $this->table = $table;

        return $this;
    }

    /**
     * SQL команда SELECT
     *
     * @param string|array $fields
     * @return $this
     */
    public function select(string|array $fields): self {
        $this->select = is_array($fields) ? $fields : [$fields];

        return $this;
    }

    /**
     * Добавление в существующий SELECT
     *
     * @param string|array $fields
     * @return $this
     */
    public function addSelect(string|array $fields): self {
        if(is_array($fields)) {
            $this->select = $this->select + $fields;
        } else {
            $this->select[] = $fields;
        }

        return $this;
    }

    /**
     * SQL команда WHERE (OR)
     *
     * @param string|Closure $field
     * @param string $operator
     * @param mixed|null $value
     * @return $this
     */
    public function orWhere(string|Closure $field, string $operator = '=', mixed $value = null): self {
        return $this->buildWhere(field: $field, logic: 'OR', operator: $operator, value: $value);
    }
    /**
     * SQL команда WHERE (AND)
     *
     * @param string|Closure $field
     * @param string $operator
     * @param mixed|null $value
     * @return $this
     */
    public function where(string|Closure $field, string $operator = '=', mixed $value = null): self {
        return $this->buildWhere(field: $field, logic: 'AND', operator: $operator, value: $value);
    }

    /**
     * Сборка команды WHERE с заданной логикой
     *
     * Пример Составного правила:
     *
     *                          // WHERE ((product_id = ? AND product_id = ?) OR article = ?)
     *                          $this->db->query()
     *                              ->where(function($q) {
     *                                  $q->where(function($q) {
     *                                      $q->where('product_id', '=', 10)
     *                                          ->where('product_id', '=', 20);
     *                                  })
     *                                  ->orWhere('article', '=', 30);
     *                              });
     *
     * @param string|Closure $field
     * @param string $logic
     * @param string $operator
     * @param mixed|null $value
     * @return self
     */
    private function buildWhere(string|Closure $field, string $logic, string $operator = '=', mixed $value = null): self {
        if($field instanceof Closure) {
            $nested = new self($this->db);

            $field($nested);

            $this->wheres[] = [
                'type'     => 'group',
                'logic'    => $logic,
                'query'    => $nested->wheres,
                'bindings' => $nested->bindings
            ];

            $this->bindings = array_merge($this->bindings, $nested->bindings);

            return $this;
        }

        if ($value === null) {
            $value = $operator;
            $operator = '=';
        }

        $this->wheres[] = [
            'type'     => 'basic',
            'logic'    => $logic,
            'sql'    => "$field $operator ?",
            'operator' => $operator,
            'bindings' => [$value]
        ];

        $this->bindings[] = $value;

        return $this;
    }

    /**
     * Сборка WHERE условий
     *
     * @param array $wheres
     * @return string
     */
    protected function compileWheres(array $wheres): string {
        $sql = '';

        foreach ($wheres as $index => $where) {
            $prefix = $index === 0 ? '' : ' ' . $where['logic'] . ' ';

            if ($where['type'] === 'group') {
                $nestedSql = $this->compileWheres($where['query']);
                $sql .= $prefix . '(' . $nestedSql . ')';
            }

            if ($where['type'] === 'basic') {
                $sql .= $prefix . $where['sql'];
            }
        }

        return $sql;
    }

    /**
     * SQL команда ORDER BY
     *
     * @param string $field
     * @param string $direction
     * @return $this
     */
    public function orderBy(string $field, string $direction = 'ASC'): self {
        $this->orderBy = "ORDER BY $field $direction";

        return $this;
    }

    /**
     * SQL команда LIMIT
     *
     * @param int $limit
     * @param int $offset
     * @return $this
     */
    public function limit(int $limit, int $offset = 0): self {
        $this->limit = "LIMIT $offset, $limit";

        return $this;
    }

    /**
     * Сборка SQL строки
     *
     * @return array
     */
    public function toSql(): array {
        $this->prepareQuery = "SELECT " . implode(', ', $this->select) . " FROM {$this->table}";

        if (!empty($this->wheres)) {
            $this->prepareQuery .= " WHERE " . $this->compileWheres($this->wheres);
        }

        if ($this->orderBy) {
            $this->prepareQuery .= " " . $this->orderBy;
        }

        if ($this->limit) {
            $this->prepareQuery .= " " . $this->limit;
        }

        return [$this->prepareQuery, $this->bindings];
    }

    /**
     * Подготовка SQL запроса. Вставка значений
     *
     * @param array $insertData
     * @return QueryBuilder
     */
    public function insert(array $insertData): self {
        $columns = implode(', ', array_keys($insertData));
        $placeholders = implode(', ', array_fill(0, count($insertData), '?'));
        $this->prepareQuery = "INSERT INTO {$this->table} ($columns) VALUES ($placeholders)";

        $this->bindings = array_values($insertData);

        return $this;
    }

    /**
     * Подготовка SQL запроса. Обновление таблицы
     *
     * @param array $updateData
     * @return QueryBuilder
     */
    public function update(array $updateData): self {
        $this->prepareQuery = "UPDATE {$this->table} SET ";
        $bindings = [];

        foreach ($updateData as $field => $value) {
            $this->prepareQuery .= "$field = ?,";
            $bindings[] = $value;
        }

        $this->bindings = [...$bindings, ...$this->bindings];

        $this->prepareQuery = rtrim($this->prepareQuery, ',');

        $this->prepareQuery .= " WHERE " . $this->compileWheres($this->wheres);

        return $this;
    }

    /**
     * Подготовка SQL запроса. Удаление
     *
     * @return QueryBuilder
     */
    public function delete(): self {
        $this->prepareQuery = "DELETE FROM {$this->table} WHERE " . $this->compileWheres($this->wheres);

        return $this;
    }

    /**
     * Выполнение SQL запроса. Возвращение статуса выполнения
     *
     * @return bool
     */
    public function execute(): bool {
        if(empty($this->prepareQuery)) $this->toSql();

        return $this->db->execute($this->prepareQuery, $this->bindings);
    }

    /**
     * Выполнение SQL запроса. Возвращение id
     *
     * @return string|false
     */
    public function insertId(): string|false {
        if(empty($this->prepareQuery)) $this->toSql();

        return $this->db->fetchInsertId($this->prepareQuery, $this->bindings);
    }

    /**
     * Выполнение SQL запроса. Возвращение затронутых строк
     *
     * @return int
     */
    public function affectedRows(): int {
        if(empty($this->prepareQuery)) $this->toSql();

        return $this->db->fetchAffectedRows($this->prepareQuery, $this->bindings);
    }

    /**
     * Выполнение SQL запроса. Получение всех строк
     *
     * @return array
     */
    public function get(): array {
        if(empty($this->prepareQuery)) $this->toSql();

        return $this->db->fetchAll($this->prepareQuery, $this->bindings);
    }

    /**
     * Выполнение SQL запроса. Получение всех строк
     *
     * @return array|null
     */
    public function first(): ?array {
        $this->limit(1);

        if(empty($this->prepareQuery)) $this->toSql();

        return $this->db->fetchOne($this->prepareQuery, $this->bindings);
    }

    /**
     * Выполнение SQL запроса. Получение одного значения
     *
     * @param string $column
     * @return mixed
     */
    public function value(string $column): mixed {
        $this->select([$column])->limit(1);

        if(empty($this->prepareQuery)) $this->toSql();

        return $this->db->fetchColumn($this->prepareQuery, $this->bindings);
    }
}