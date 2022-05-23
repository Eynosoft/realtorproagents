<?php
/**
 * Task Model 
 * 
 * Manage all the operations for Task data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;
use Modules\Client\Models\ContactTaskModel;

class TaskModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'task';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['date','task','created_at'];
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
        $this->ContactTaskModel = new ContactTaskModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    /**
	 * Saves the record in the database
	 * 
	 * @param(object)
	 * 
	 * @return (bool)
	 */
	public function addTaskList($data = null)
    {   
		try {
       
		if ($this->save($data))
			{
                $this->message = 'Task Added Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message,   
                'lastId' => $this->insertID,
            );
            echo json_encode($output);
            return $output['lastId'];
            //http_response_code(404);
		}
		catch (\Exception $e) 
		{
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
		}
        http_response_code(404);
    }

	

	/*************************************************************************************/
	/*************************************************************************************/
    /**
	 * get all the records from the Task
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getAllTaskData() {
        try {
          
            $data =[];
          $results['task'] = $this->findAll();

        //return $results;

        $i=0;
        foreach($results['task'] as $task){
            $tmpContact= $this->ContactTaskModel->getTaskContactsName($task['id']);
            $task['contact'] = !empty($tmpContact['first_name']) ? $tmpContact['first_name'] : '';
            $data['task'][$i] = $task;
            $i++;
            //array_push($results['contacts'],$contact['tags']);
        }  return $data;

        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }

    /*************************************************************************************/
	/*************************************************************************************/
    /**
	 * get all the records from the Task
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getCalendarTaskData() {
        try {
            
            $results = $this->findAll();
            $arr = [];
    
             $i=0;
       
            // for($i=0; $i<count($results); $i++){
             foreach($results as $result){
                $tmpContact = $this->ContactTaskModel->getTaskContactsName($result['id']);
                $arr[$i]['title'] = !empty($tmpContact['first_name']) ? $tmpContact['first_name']: '';
                if(!empty($tmpContact)){
             $arr[$i]['title'] .= " ".$result['task']; 
             $arr[$i] ['date']= $result['date']; 
             $arr[$i] ['color']= '#f67a3c'; 
             $arr[$i] ['textColor']= '#fff'; 
             $arr[$i] ['url']= 'http://localhost:4200/#/contacts-details/'.$tmpContact['id']; 


                }else{
                    $arr[$i]['title'] = $result['task']; 
                    $arr[$i] ['date']= $result['date']; 
                }
                $i++;
               }
           // } 
        
        return  $arr;

        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
       
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * Delete a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
    function deleteTaskById($id = null) {
        try {
       
            $isDelete = $this->where('id', $id)->delete();
            if ($isDelete)
			{
                $this->message = 'Task Deleted Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while delete';
                $this->status_code = 404;
            }
            
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message
                
            );
            echo json_encode($output);
            exit;
        }catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }

}
