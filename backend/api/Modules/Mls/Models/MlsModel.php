<?php
/**
 * Mls Model 
 * 
 * Manage all the api relation database operations for mls
 */
namespace Modules\Mls\Models;

use CodeIgniter\Model;

class MlsModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'mls';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['name','created_at','updated_at'];

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
        $this->db = \Config\Database::connect();
		parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * get all the records from the Mls
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getAllData() {
        try {
            $mls_data = [];
            $mls =  $this->findAll();
            if(!empty($mls)) {
                $i = 0;
                foreach ($mls as $value) {
                    $mls_data[$i]['id'] = $value['id'];
                    $mls_data[$i]['name'] = $value['name'];
                    $i++;
                }
            }
            return $mls_data;
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
 
    /******************************************************************************/
	/******************************************************************************/
    
}
