<?php
/**
 * Contacts Task Model 
 * 
 * Manage all the operations for Task data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;
class ContactTaskModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'contact_task';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['contacts_id','task_id','created_at','updated_at'];
    protected $message = '';
    protected $lastId = '';
    protected $status_code = '';
    protected $auth_token = ''; 
    // Dates
    protected $useTimestamps        = false;
    protected $dateFormat           = 'datetime';
    protected $createdField         = 'created_at';
    protected $updatedField         = 'updated_at';
    protected $deletedField         = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks       = true;
    protected $beforeInsert         = [];
    protected $afterInsert          = [];
    protected $beforeUpdate         = [];
    protected $afterUpdate          = [];
    protected $beforeFind           = [];
    protected $afterFind            = [];
    protected $beforeDelete         = [];
    protected $afterDelete          = [];
    protected $db;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{   $this->db = \Config\Database::connect();
		parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }

    public function getContactsTask($contactid,$taskId)
    { 

        try {
         
            $sql = "SET FOREIGN_KEY_CHECKS=0";
           
            $this->query($sql);
        
            $result = $this->query( "INSERT INTO contact_task (contacts_id, task_id) VALUES('".$contactid."','".$taskId."') ");  
            $sql1 = "SET FOREIGN_KEY_CHECKS=1";
            $this->query($sql1);
         
			if ($result)
			{
                 
                $this->message = 'Contacts Task ID insert Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message,
                'lastId' => $this->lastId
                );
            //echo json_encode($output);
            //http_response_code(404);
     
        }
		catch (\Exception $e) 
		{
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
		}
   
        http_response_code(404);
     }	

   public function  getContactTaskDataById($contactid=null){
         
    try {
           
       $builder = $this->table("task");
       $builder->select('task.id, task.task,task.date');
       $builder->join('task', 'task.id = contact_task.task_id');
       $builder->where('contacts_id', $contactid);
       $data = $builder->get()->getResult();

         return $data;
           // return $this->find($contactid); 

             }
    catch (\Exception $e) 
    {
        header("HTTP/1.1 500 Internal Server Error");
        echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
  }
http_response_code(404);
     }		

         /******************************************************************************/
	/******************************************************************************/
    /**
	 * get Task by id a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
  

    public function getTaskContactsName($taskid =null){
        try {
        
            $contactName = [];
            $builder = $this->db->table("contacts");
            $builder->select('contacts.id,contacts.first_name,contacts.last_name');
            $builder->join('contact_task', 'contact_task.contacts_id = contacts.id');
            $builder->where('contact_task.task_id', $taskid);
            $data = $builder->get()->getResultArray();      
              
            if(!empty($data)) {
                 foreach($data as $value) {
                    $contactName['first_name'] = $value['first_name'];
                    $contactName['id'] = $value['id'];

                   }
                 return $contactName;
            }
            return null;
         }
		catch (\Exception $e) {
		    header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
		}
        http_response_code(404);
    }
}







 

