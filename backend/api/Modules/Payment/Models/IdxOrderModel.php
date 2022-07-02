<?php
/**
 * Idx order Model 
 * 
 * Manage all the api relation database operations for idx order details
 */
namespace Modules\Payment\Models;

use CodeIgniter\Model;

class IdxOrderModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'idx_order_detail';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['payment_mode','card_number','security_code','expire_date','first_name','last_name','address','city','state','zip','payment_id','idx_mls_period','created_at','updated_at'];

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
	 * insert all the records from the idx order Details
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function addOrderDetailsData($data = null)
    {   
		try {
      

			if ($this->save($data))
			{
                $this->message = 'idx  order detais  Added Succesfully!';
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
