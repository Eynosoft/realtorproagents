<?php
/**
 * themes Property  Model 
 * 
 * Manage all the operations for Themes data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;

class ThemesModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'themes';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['user_id','added_by','theme_url','created_at','updated_at'];
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
	 * get themes  record from the database
	 * 
	 * @param(object)
	 * 
	 * @return (bool)
	 */
	public function getThemeUserIdData($data = null)
    {   
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
    
   }
