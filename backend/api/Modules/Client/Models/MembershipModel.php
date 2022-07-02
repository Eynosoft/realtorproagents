<?php
/**
 * Membership Model 
 * 
 * Manage all the api relation database operations for membership
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;

class MembershipModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'membership_order';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['userid','idx_package','price','time_period','created_at','updated_at'];

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
    }
   
     /******************************************************************************/
	/******************************************************************************/
    /**
	 * post all the records from the Membership
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function addMembershipData($data = null)
    {   
		try {
       

			if ($this->save($data))
			{
                $this->message = 'idx  membership Added Succesfully!';
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
    
}
