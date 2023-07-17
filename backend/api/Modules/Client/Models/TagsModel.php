<?php
/**
 * Tags Model 
 * 
 * Manage all the operations for Tags data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;
use Modules\Client\Models\ContactTagsModel;

class TagsModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'tags';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['tags','created_at','updated_at'];
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
        $this->ContactTagsModel = new ContactTagsModel();
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
	public function addTagsList($data = null)
    {   
		try {
       

			if ($this->save($data))
			{
                $this->lastId = $this->insertID;
                $this->message = 'Tags Added Succesfully!';
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
            echo json_encode($output);
            //http_response_code(404);
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
	 * Updates the record in the database
	 * 
	 * @param(object)
	 * 
	 * @return (bool)
	 */
	public function updateTags($data = null)
    {   
		try {
            
			if ($this->save($data))
			{
                $this->message = 'Tags Updated Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message
                
            );
            echo json_encode($output);
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
	 * get all the records from the Tags
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getAllTagsData() {
        try {
            $results = $this->findAll();
            return $results;
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
    
  /*************************************************************************************/
	/*************************************************************************************/
    public function getAllTagsDataByContactId($contactId = null) {
        try {
   
            $returnData = [];
            $results = $this->findAll();
            $i=0;
            if(!empty($results)) {
                foreach($results as $data) {

                    $data['hasTag'] = $this->ContactTagsModel->getTagIdByContactId($contactId,$data['id']); 
                    $returnData[$i] = $data;
                    $i++;
                }
            }
            return $returnData;
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }

    	/*************************************************************************************/
	/*************************************************************************************/
    /**
	 * get all the records from the Tags that associated by contacts
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getAllContactsTags() {
        try {

            $builder = $this->table("tags");
            $builder->select('tags.tags');
            $builder->distinct('tags');
            $builder->join('contacts_tags', 'tags.id = contacts_tags.tags_id');
  
            $data = $builder->get()->getResult();

            return $data;
            // $results = $this->findAll();
            // return $results;
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
    function deleteTagsById($id = null) {
        try {
       
            $isDelete = $this->where('id', $id)->delete();
            if ($isDelete)
			{
                $this->message = 'Tags Deleted Succesfully!';
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
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * get tags by id a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
  
   
    /******************************************************************************/
	/******************************************************************************/
    
    function getTagDataById($id = null){
	    try {
            
			return $this->find($id);
         
		}
		catch (\Exception $e) {
		    header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
		}
        http_response_code(404);
	}

       /**
	 * get tags by id a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
  
   
    /******************************************************************************/
	/******************************************************************************/

    public function getContactTagName($tagid =null){
        try {
            
			return $this->find($tagid);
         
		}
		catch (\Exception $e) {
		    header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
		}
        http_response_code(404);
    }
}
