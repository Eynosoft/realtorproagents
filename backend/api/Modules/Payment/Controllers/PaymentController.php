<?php
/**
 * Payment Controller
 * 
 * Manages the Payment crud api call
 */
namespace Modules\Payment\Controllers;

use App\Controllers\BaseController;
use Modules\Payment\Models\PaymentModel;
use Modules\Payment\Models\AgentPlanModel;
use Modules\Payment\Models\IdxOrderModel;

class PaymentController extends BaseController
{
    protected $paymentModel = null;
    protected $agentPlanModel = null;
    protected $idxOrderModel = null;
    protected $idxAgentPlanLastId = null;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
        $this->paymentModel = new PaymentModel();
        $this->agentPlanModel = new AgentPlanModel();
        $this->idxOrderModel = new IdxOrderModel();
    }
    public function index()
    {
        
    }
      /**********************************************************************************/
  /**********************************************************************************/
   /**
     * Save all agent plan data
     */

    function addAgentPlan(){
    //$post_data = (array) json_decode(file_get_contents('php://input'), true);
 
    $data = [
        'payment_details' => !empty($this->request->getVar('payment_details')) ? $this->request->getVar('payment_details') : '',
        'userid'          => !empty($this->request->getVar('userid')) ? $this->request->getVar('userid') : '',
        'subscription_id'          => !empty($this->request->getVar('subscriptionId')) ? $this->request->getVar('subscriptionId') : '',
        'plan_name'       => !empty($this->request->getVar('plan_name')) ? $this->request->getVar('plan_name') : '',
        'amount'          => !empty($this->request->getVar('amount')) ? $this->request->getVar('amount') : '',
        'billing_cycle'   => !empty($this->request->getVar('billingCycle')) ? $this->request->getVar('billingCycle') : '',
        'status'          => !empty($this->request->getVar('planStatus')) ? $this->request->getVar('planStatus') : ''
];
    
    $this->agentPlanModel->addAgentPlanData($data);
     //$this->idxAgentPlanLastId = $lastid;
    http_response_code(200);

    exit;
    }
      /**********************************************************************************/
  /**********************************************************************************/
   /**
     * Save all payment details data
     */

    function addPaymentDetails(){
    //$post_data = (array) json_decode(file_get_contents('php://input'), true);

    $data = [
        'user_id'      => !empty($this->request->getVar('userid')) ? $this->request->getVar('userid') : '',
        'payment_method'   => !empty($this->request->getVar('paymentMethod')) ? $this->request->getVar('paymentMethod') : '',
        'plan_id'      => !empty($this->request->getVar('planId')) ? $this->request->getVar('planId') : '',
        'plan_name'      => !empty($this->request->getVar('membershipname')) ? $this->request->getVar('membershipname') : '',
        'duration'   => !empty($this->request->getVar('duration')) ? $this->request->getVar('duration') : '',
        'current_status'      => !empty($this->request->getVar('currentStatus')) ? $this->request->getVar('currentStatus') : '',
        'amount'      => !empty($this->request->getVar('amount')) ? $this->request->getVar('amount') : '',
        'transaction_id'   => !empty($this->request->getVar('transectionId')) ? $this->request->getVar('transectionId') : '',
        'payment_status'      => !empty($this->request->getVar('paymentStatus')) ? $this->request->getVar('paymentStatus') : '',
        'payment_response'      => !empty($this->request->getVar('paymentResponse')) ? $this->request->getVar('paymentResponse') : ''
];
    
    $this->paymentModel->addPaymentDetailsData($data);
    http_response_code(200);
    exit;
    }
      /**********************************************************************************/
  /**********************************************************************************/
   /**
     * Save all idx payment order data
     */

    function addOrderDetails(){
    //$post_data = (array) json_decode(file_get_contents('php://input'), true);
    
    $data = [
        'payment_mode'      => !empty($this->request->getVar('paymentMode')) ? $this->request->getVar('paymentMode') : '',
        'card_number'    => !empty($this->request->getVar('cardNumber')) ? $this->request->getVar('cardNumber') : '',
        'security_code'      => !empty($this->request->getVar('securityCode')) ? $this->request->getVar('securityCode') : '',
        'expire_date'      => !empty($this->request->getVar('expireDate')) ? $this->request->getVar('expireDate') : '',
        'first_name'   => !empty($this->request->getVar('first_name')) ? $this->request->getVar('first_name') : '',
        'last_name'      => !empty($this->request->getVar('last_name')) ? $this->request->getVar('last_name') : '',
        'address'      => !empty($this->request->getVar('adresss')) ? $this->request->getVar('adresss') : '',
        'city'   => !empty($this->request->getVar('city')) ? $this->request->getVar('city') : '',
        'state'      => !empty($this->request->getVar('state')) ? $this->request->getVar('state') : '',
        'zip'      => !empty($this->request->getVar('zip')) ? $this->request->getVar('zip') : '',
        'payment_id'   => !empty($this->request->getVar('paymentId')) ? $this->request->getVar('paymentId') : '',
        'idx_mls_period'      => !empty($this->request->getVar('IdxMlsPeriod')) ? $this->request->getVar('IdxMlsPeriod') : '',
        
];
      $this->idxOrderModel->addOrderDetailsData($data);
    http_response_code(200);
    exit;
    }
      /******************************************************************************/
	/******************************************************************************/
       /**
	 * get last records from the Agent subscribe plan 
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getIdxPaymentPlan() {

     //echo   $this->idxAgentPlanLastId; die();
        $result = $this->agentPlanModel->getIdxPlanData();
       
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
  
}
