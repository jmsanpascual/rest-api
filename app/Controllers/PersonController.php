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
        foreach ($users as $key => $user) {
            $users[$key]['pokemon'] = [ 'name' => $user['pokemon']];
        }

        echo json_encode($users);
    }

    public function store(Request $request)
    {
        $user = $request->all();
        $user['pokemon'] = $request['pokemon']['name'];
        $id = $this->db->insertGetId($user);
        echo json_encode(compact('id'));
    }

    public function show($id)
    {
        $user = $this->db->find($id);
        $user['pokemon'] = ['name' => $user['pokemon']];
        echo json_encode($user);
    }

    public function update(Request $request, $id)
    {
        $user = $request->all();
        $user['pokemon'] = $request['pokemon']['name'];
        $this->db->update($user, $id);
        echo json_encode($request->all());
    }

    public function destroy($id)
    {
        $this->db->delete($id);
        return;
    }
}
