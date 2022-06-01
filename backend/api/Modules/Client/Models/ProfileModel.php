<?php
/**
 * Tags Model 
 * 
 * Manage all the operations for Tags data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;

class ProfileModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'profile';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['userid','company_broker', 'first_name','last_name','address','city','state','zip',
                                      'business_phone','cell_phone','fax','social_links','facebook','twitter','linkedin',
                                      'youtube','instagram','created_at','updated_at'];
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
    /**
	 * Saves the record in the database
	 * 
	 * @param(object)
	 * 
	 * @return (bool)
	 */
	public function addProfileData($data = null)
    {   

		try {
       

			if ($this->save($data))
			{
                $this->lastId = $this->insertID;
                $this->message = 'profile Added Succesfully!';
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
	public function updateProfileData($data = null,$userid)
    {  
		try {
           $res = $this->query("update profile set  company_broker = '".$data['company_broker']."',first_name='".$data['first_name']."',
           last_name='".$data['last_name']."',address='".$data['address']."',city='".$data['city']."',state='".$data['state']."',
           zip='".$data['zip']."', business_phone='".$data['business_phone']."',cell_phone='".$data['cell_phone']."',
           fax='".$data['fax']."',social_links='".$data['social_links']."',facebook='".$data['facebook']."',
           twitter = '".$data['twitter']."',linkedin='".$data['linkedin']."', youtube='".$data['youtube']."',
           instagram='".$data['instagram']."'  where userid = $userid");
        //   $this->where('userid', $userid );
        //     $res = $this->update('profile',$data);
      
			if ($res)
			{
                $this->message = 'profile Updated Succesfully!';
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
	 * get all the records from the profile
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getAllProfileData($userid) {
        try {
          
            $builder = $this->table('profile');
                       $builder ->select('*');
                       $builder->where('userid',$userid);
                       $data = $builder->get()->getResult();
             return $data;
           
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
    
  /*************************************************************************************/
	/*************************************************************************************/
   /**
	 * get all the records from the profile by userid
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getProfileUserid($userid) {
        try {
            $builder = $this->table('profile');
            $builder ->select('*');
            $builder->where('userid',$userid);
            $res = $builder->get()->getResult();

            if($res){
                return true;
            }else{
                return false;
            }
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
}
