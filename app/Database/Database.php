<?php

class Database
{

    private $pdo;
    private $db = 'rest';
    private $host = 'localhost';
    private $charset = 'utf8';
    private $username = 'root';
    private $password = '';

    private $table;
    private $lastExecutedStatement;

    public function __construct()
    {
        $dsn = "mysql:dbname=$this->db;host=$this->host;charset=$this->charset";
        $this->pdo = new PDO($dsn, $this->username, $this->password);
    }

    public function __destruct()
    {
        $this->pdo = null;
    }

    public function setTable($table)
    {
        $this->table = $table;
    }

    public function all()
    {
        return $this->raw("SELECT * FROM $this->table")->get();
    }

    public function find($id)
    {
        $sql = "SELECT * FROM $this->table WHERE id = ?";
        $this->lastExecutedStatement = $this->pdo->prepare($sql);
        $this->lastExecutedStatement->execute([$id]);
        return array_shift($this->get());
    }

    public function insert($record)
    {
        end($record);
        $last = key($record);
        $sql = "INSERT INTO $this->table ";
        $columns = '';
        $values = '';

        foreach ($record as $key => $value) {
            $key = ($key !== $last) ? "$key," : $key;
            $columns .= $key;
            $values .= ":$key";
        }

        $sql .= "($columns) VALUES ($values)";
        $this->lastExecutedStatement = $this->pdo->prepare($sql);
        $this->lastExecutedStatement->execute($record);
    }

    public function insertGetId($record)
    {
        $this->insert($record);
        return $this->pdo->lastInsertId();
    }

    public function update($record, $id)
    {
        end($record);
        $last = key($record);
        $sql = "UPDATE $this->table SET ";
        $set = '';

        foreach ($record as $key => $value) {
            $tempKey = ($key !== $last) ? "$key," : $key;
            $set .= "$key=:$tempKey";
        }

        $sql .= "$set WHERE id = $id";
        $this->lastExecutedStatement = $this->pdo->prepare($sql);
        $this->lastExecutedStatement->execute($record);
        return $this->get();
    }

    public function delete($id)
    {
        $sql = "DELETE FROM $this->table WHERE id =  ?";
        $this->lastExecutedStatement = $this->pdo->prepare($sql);
        $this->lastExecutedStatement->execute([$id]);
        return $this->get();
    }

    public function raw($query)
    {
        $this->lastExecutedStatement = $this->pdo->query($query);
        return $this;
    }

    public function get() {
        $statement = $this->lastExecutedStatement;
        $result = [];

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }

        return $result;
    }
}
