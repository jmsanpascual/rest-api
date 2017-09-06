<?php

require '/../Database/Database.php';

class PersonController
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
        $this->db->setTable('persons');
    }

    public function index()
    {
        $users = $this->db->all();
        echo json_encode($users);
    }

    public function store(Request $request)
    {
        $id = $this->db->insertGetId($request->all());
        echo $id;
    }

    public function show($id)
    {
        $user = $this->db->find($id);
        echo json_encode($user);
    }

    public function update(Request $request, $id)
    {
        $this->db->update($request->all(), $id);
        echo json_encode($request->all());
    }

    public function destroy($id)
    {
        $this->db->delete($id);
        return;
    }
}
