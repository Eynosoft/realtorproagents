<?php
/**
 * Contacts Taga Model 
 * 
 * Manage all the operations for Tags data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;

class ContactTagsModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'contacts_tags';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['contacts_id','tags_id','created_at','updated_at'];
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

    public function addContactsTags($tags,$contactId)
    { 

        try {
            $tagscount = count($tags);
      
            for($i=0; $i<$tagscount; $i++){
            $sql = "SET FOREIGN_KEY_CHECKS=0";
           
            $this->query($sql);
 
            $result = $this->query( "INSERT INTO contacts_tags (contacts_id,tags_id) VALUES(".$contactId.",".$tags[$i].") ");  
            $sql1 = "SET FOREIGN_KEY_CHECKS=1";
            $this->query($sql1);
         
			if ($result)
			{
                 
                $this->message = 'Contacts Tags ID insert Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message,
                );
            //echo json_encode($output);
            //http_response_code(404);
        }
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
	 * get tags  associated  from the Contacts
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */		
public function getContactTagNameById($contactId = null){
 
    try {
        $tags = [];
        $builder = $this->db->table("tags");
        $builder->select('tags.tags');
        $builder->join('contacts_tags', 'contacts_tags.tags_id = tags.id');
        $builder->where('contacts_tags.contacts_id', $contactId);
        $data = $builder->get()->getResultArray();         
        if(!empty($data)) {
            foreach($data as $value) {
     
                $tags[]= $value['tags'];
            }
            return $tags;
        }
        return null;
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
	 * get tags id  associated  from the Contacts
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */		
public function getContactTagIdById($contactId = null){
 
    try {
        $tags = [];
        $builder = $this->db->table("tags");
        $builder->select('tags.id');
        $builder->join('contacts_tags', 'contacts_tags.tags_id = tags.id');
        $builder->where('contacts_tags.contacts_id', $contactId);
        $data = $builder->get()->getResultArray();         
        if(!empty($data)) {
            foreach($data as $value) {
               $tags[] = $value['id'];
              
            }
            return $tags;
        }
        return null;
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

public function getTagIdByContactId($contactId, $tagId) {

    $builder = $this->db->table("contacts_tags");
    $builder->select('tags_id');
    $builder->where('contacts_id', $contactId);
    $data = $builder->get()->getResultArray();   

    foreach($data as $tagdata){
       if(!empty($tagdata['tags_id']==$tagId)){
                return true;
            } 
         }     
    return false;
   }
	/*************************************************************************************/
	/*************************************************************************************/
    /**
	 * update tags  associated  to the Contacts
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */		
   public function updateContactsTags($tags,$contactId)
   { 

       try {
          
        $isDelete = $this->where('contacts_id', $contactId)->delete(); 
        if($isDelete && !empty($tags[0])){

           $tagscount = count($tags);
           for($i=0; $i<$tagscount; $i++){
           $sql = "SET FOREIGN_KEY_CHECKS=0";
          
               $this->query($sql);

        $result = $this->query( "INSERT INTO contacts_tags (contacts_id,tags_id) VALUES(".$contactId.",".$tags[$i].") ");  
           $sql1 = "SET FOREIGN_KEY_CHECKS=1";
           $this->query($sql1);
        
           if ($result)
           {
                
               $this->message = 'Contacts Tags ID update Succesfully!';
               $this->status_code = 200;
           } else {
               $this->message = 'An error occurred while update data';
               $this->status_code = 404;
           }
           $output = array(
               'status_code' => $this->status_code,
               'message' => $this->message,
               );
           //echo json_encode($output);
           //http_response_code(404);
       }
    }
       }
       catch (\Exception $e) 
       {
           header("HTTP/1.1 500 Internal Server Error");
           echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
       }
  
       http_response_code(404);
    }	
   
}






 

