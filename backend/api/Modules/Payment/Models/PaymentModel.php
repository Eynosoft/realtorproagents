<?php
/**
 * Payment Model 
 * 
 * Manage all the api relation database operations for payment
 */
namespace Modules\Payment\Models;

use CodeIgniter\Model;

class PaymentModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'payments';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['user_id','payment_method','plan_id','plan_name','duration','current_status','amount','transaction_id','payment_status','payment_response','created_at','updated_at'];

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
	 * insert all the records from the idx payment
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function addPaymentDetailsData($data = null)
    {   

		try {

      	if ($this->save($data))
			{
                $this->message = 'idx  payment  Succesfully!';
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
