<?php
/**
 * Email send Alert Model 
 * 
 * Manage all the operations for Task data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;

class EmailSendModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = '';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['created_at'];
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
	 * send email  message
	 * 
	 * @param(object)
	 * 
	 * @return (bool)
	 */
	public function SendEmail($message = null)
    {   
        $email = \Config\Services::email();

        $email->setFrom('eynobrajesh@gmail.com', 'eyno');
        $email->setTo('eynobrajesh@gmail.com');
        
        $email->setSubject('Email Property Alert');
        $email->setMessage($message);
        
       $email->send();
      //       echo "email sent success";
      //   }else{
      //     $data = $email->printDebugger(['headers']);
      //     print_r($data);
        //}
	
    }

		/*************************************************************************************/
	/*************************************************************************************/
   }
