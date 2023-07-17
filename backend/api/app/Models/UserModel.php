<?php
/**
 * Users Model 
 * 
 * Manage all the operations for user data
 */
namespace App\Models;

use CodeIgniter\Model;
use Firebase\JWT\JWT;

class UserModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'users';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['name','email','phone','password','user_role','user_activation_key','status','created_at','updated_at','deleted_at'];
    protected $message = '';
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
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
		parent::__construct();
        header("Access-Control-Allow-Origin: *");
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
	public function saveRecord($data = null)
    {   
		try {
			//$data['password'] = $this->generateClientPassword();
            $data['password'] = 'test';
			$data['user_role'] = 2;
            $data['status'] = 1;

			if ($this->save($data))
			{
                $this->message = 'Client Account Created Succesfully!';
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
	 * Generate 6 digit random password string
	 * 
	 * @param()
	 * 
	 * @return (string)
	 */
    public function generateClientPassword()
    {
        return substr(str_shuffle("0123456789abcdefghijklmnopqrstvwxyz"), 0, 6);
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * User Logged in
	 * 
	 * @param(string)
	 * 
	 * @return (json)
	 */
    public function userLogin($data = null)
    {
        $array = array('email' => $data['email'], 'password' => $data['password'], 'status' => 1);
        $data = $this->where($array)->first();
        if(!empty($data)) {
            $key = getenv('TOKEN_SECRET');    
            $issuer_claim = "localhost";
            $audience_claim = "CLIENT"; 
            $issuedat_claim = time(); // time issued 
            $notbefore_claim = $issuedat_claim + 10; 
            $expire_claim = $issuedat_claim + 60; 
            $payload = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $issuedat_claim,
                "nbf" => $notbefore_claim,
                "exp" => $expire_claim,
                "data" => array(
                    'id' => $data['id'],
                    'name' => $data['name'],
                    'email' => $data['email'] 
                )
            );
            $token = JWT::encode($payload, $key);
            $this->message = 'Login Succesfully!';
            $this->status_code = 200;
            $this->auth_token = $token;
            $output = array(
                'status_code' => 200,
                'message' => 'Login Succesfully!',
                'auth_token' => $token,
                "expiry" => $expire_claim,
                'roles' => 'CLIENT',
                'name' => $data['name'],
                'email' => $data['email'] 
            );
            
        } else {
            $output = array(
                'status_code' => 404,
                'message' => 'An error occurred while login',
            );
        }
        
        echo json_encode($output);
        die;
    }
    /******************************************************************************/
	/******************************************************************************/

}
