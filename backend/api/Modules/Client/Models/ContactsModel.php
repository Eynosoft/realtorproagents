<?php
/**
 * Contact Model 
 * 
 * Manage all the operations for contacts data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;
use Modules\Client\Models\ContactTagsModel;
use Modules\Client\Models\ContactTaskModel;


class ContactsModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'contacts';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['first_name','last_name','company','address1','address2','city','state','zip','home_phone','work_phone','mobile_phone','fax','email','email2','birthday','stars','contact_name2','contact_phone2','contact_email2','contact_birthday2','created_at','updated_at'];
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
	public function addRecord($data = null)
    {   
		try {
       
			if ($this->save($data))
			{
                $this->lastId = $this->insertID;
                $this->message = 'Contact Added Succesfully!';
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
             return $this->lastId;
             http_response_code(404);
		}
		catch (\Exception $e) 
		{
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
		}
        http_response_code(404);
    }


    public function importContactData($data = null)
    {   
       
		try {
            foreach ($data as $data) {
			if ($this->save($data))

			{
                $this->message = 'Contacts import Succesfully!';
                $this->status_code = 200;
               // $this->lastId = $this->insertID();
   
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message,
                );
            }
            echo json_encode($output);
             http_response_code(404);
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
	public function updateContact($data = null)
    {   
		try {
            
			if ($this->save($data))
			{
                $this->message = 'Contacts Updated Succesfully!';
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
	/******************************************************************************/
	/******************************************************************************/
   
    /**
	* Get contact data by id
	*
	* @params(int)
	*
	* returns array
	*/
	function getContactDataById($id = null){
	    try {
            $results = [];
			$result = $this->find($id);
         
            $contactTask = $this->ContactTaskModel->getContactTaskDataById($id);
            //$i=0;
            // foreach($result['contact'] as $contact){
              
                $tmpTag = $this->ContactTagsModel->getContactTagNameById($id);
                $tmpTagid = $this->ContactTagsModel->getContactTagIdById($id);
                $result['tags'] = !empty($tmpTag) ? $tmpTag :'';
                $result['tagsid'] = !empty($tmpTagid) ? $tmpTagid : array();
                $results['result'] = $result;
                //$i++;
                //array_push($results['contacts'],$contact['tags']);
           // }
        
        $results['contactTask'] = $contactTask;
        
        return $results;
		}
		catch (\Exception $e) {
		    header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
		}
        http_response_code(404);
	}

	/*************************************************************************************/
	/*************************************************************************************/
    /**
	 * get all the records from the Contacts
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    
    public function getAllData() {
        try {
            $data =[];
            $results['count'] = $this->countAll();
            $results['contacts'] = $this->orderBy('last_name','asc')->findAll();
            $i=0;
            foreach($results['contacts'] as $contact){
                $tmpTag = $this->ContactTagsModel->getContactTagNameById($contact['id']);
                $contact['tags'] = !empty($tmpTag) ? $tmpTag : '';
                $data['contacts'][$i] = $contact;
                $i++;
                //array_push($results['contacts'],$contact['tags']);
            }
            $data['count'] = $results['count'];
            
            return $data;
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
    function deleteContactById($id = null) {
        try {
           
            $isDelete = $this->where('id', $id)->delete();
            if ($isDelete)
			{
                $this->message = 'Contacts Deleted Succesfully!';
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
	 * Delete a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
  
   
    /******************************************************************************/
	/******************************************************************************/
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * Search by alphabet
	 * 
	 * @param(string)
	 * 
	 * @return (json)
	 */
    function searchByAlphabet($letter = null) {
        try {
            if($letter == 'all') {
                return $this->getAllData();
            }
            $data1 ='';
            $dataCount = '';
            $i=0;
            $builder = $this->db->table("contacts");
            $builder->select('*');
            $builder->orLike('first_name', $letter,'after');
            $builder->orLike('last_name', $letter,'after');
            $builder->orLike('email', $letter,'after');
            $dataCount = $builder->countAllResults();
            $results['count'] = ($dataCount > 0)? $dataCount : 0;
            
            $builder = $this->db->table("contacts");
            $builder->select('*');
            $builder->orLike('first_name', $letter,'after');
            $builder->orLike('last_name', $letter,'after');
            $builder->orLike('email', $letter,'after');
            $data1 = $builder->get()->getResultArray();
            
            $results['contacts'] = !empty($data1) ? $data1:'';
            if(!empty($results['contacts'])) {
                foreach($results['contacts'] as $contact){
                    $tmpTag = $this->ContactTagsModel->getContactTagNameById($contact['id']);
                    $contact['tags'] = !empty($tmpTag) ? $tmpTag : '';
                    $data['contacts'][$i] = $contact;
                    $i++;
                }
            } else {
                $data['contacts'] = '';
            }
            $data['count'] = $results['count'];
            
            return $data;
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
}
