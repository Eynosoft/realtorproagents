<?php
/**
 * Agent subscribe Plan Model 
 * 
 * Manage all the api relation database operations for agent plan
 */
namespace Modules\Payment\Models;

use CodeIgniter\Model;

class AgentPlanModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'agent_plans';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['payment_details','userid','subscription_id','plan_name','amount','billing_cycle','status','created_at','updated_at'];

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
	 * insert all the records from the Agent subscribe plan
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function addAgentPlanData($data = null)
    {   
		try {
       
			if ($this->save($data))
			{
                $this->message = 'idx  agent plan data Added Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message,
                'lastId' => $this->insertID     
            );
            echo json_encode($output);
            //return $this->insertID;
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
	 * fetch all the records from the Agent subscribe plan
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getIdxPlanData($id=null)
    {   
		try {

          $result = $this->find($id);
          return $result;
		}
		catch (\Exception $e) 
		{
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
		}
        http_response_code(404);
    }
}
