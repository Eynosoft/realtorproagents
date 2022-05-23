<?php
/**
 * Listing Category Model 
 * 
 * Manage all the operations for listing category data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;

class ListingCategoryModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'listings_category';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['category_name','created_at','updated_at'];
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
	public function saveRecord($data = null)
    {   
		try {

			if ($this->save($data))
			{
                $this->message = 'Listing Added Succesfully!';
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
	* Get all data property
	*
	* @params()
	*
	* returns array
	*/
	function listingCatGetAllData(){
	    return $this->findAll();

	}

	/*************************************************************************************/
	/*************************************************************************************/
    /**
	* Get Listing Category data by id
	*
	* @params()
	*
	* returns array
	*/
	function getListingCategoryDataById($id = null){
	    return $this->find($id);

	}

	/*************************************************************************************/
	/*************************************************************************************/
}
