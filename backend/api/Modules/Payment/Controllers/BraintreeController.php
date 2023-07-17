<?php
/**
 * BrainTree Plan Controller
 * 
 * Manages the braintree plan crud api call
 */
namespace Modules\Payment\Controllers;

use App\Controllers\BaseController;
use Modules\Payment\Models\BrainTreeModel;
use App\Libraries\Braintree\Braintree_lib;

class BraintreeController extends BaseController
{
    protected $brainTreeModel = null;
    protected $brainTree = null;
    protected $clientToken = null;
    protected $plans = null;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{   
        $this->brainTreeModel = new BrainTreeModel();
        $this->brainTree = new Braintree_lib();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
      
    }

    public function index()
    {
        
    }
    /******************************************************************************/
    /******************************************************************************/
    /**
	* Generate token from braintree api
    *
    * @param()
    * @return(json)
	*/
    public function generateToken()
    {  
       
        $this->clientToken = $this->generateTokenCI();
        echo json_encode($this->clientToken);
        http_response_code(200);
        exit;
    }
    /******************************************************************************/
    /******************************************************************************/
    /**
	* Generate token from braintree api
    *
    * @param()
    * @return(json)
	*/
    public function generateTokenCI()
    {   
        return $this->brainTree->create_client_token();
    }
    /******************************************************************************/
    /******************************************************************************/
    /**
	* Get all the plans from braintree
    *
    * @param()
    * @return(json)
	*/
    public function getAllPlans()
    {   
        $plans = $this->brainTree->getAllPlans();
        echo json_encode($plans);
        http_response_code(200);
        exit;
    }
    /******************************************************************************/
    /******************************************************************************/

    /**
	* Subscribe for the plan
    *
    * @param()
    * @return(json)
	*/
    public function subscribePlan()
    {

     $clientToken        = $this->request->getVar('paymentMethodToken');
      $paymentNonce        = $this->request->getVar('paymentNonce');
        $planId             = $this->request->getVar('planId');
        $first_name         = $this->request->getVar('first_name');
        $last_name          = $this->request->getVar('last_name');
        $cardNumber         = $this->request->getVar('cardnumber');
        $expiryDate         = $this->request->getVar('expiry_date');
        $expiry_year        = $this->request->getVar('expiry_year');
        $cvv                = $this->request->getVar('securitycode');
        
        $customerdata       = $this->brainTree->createCustomer($first_name, $last_name);
      
        $customerId         = '';
        $merchantId         = '';
        $cardLastFourDigit  = '';
        $cardToken          = '';
        $cardType           = '';
        $imageUrl           = '';
        $paymentMethodToken = '';
        if(isset($customerdata)) {
             $customerId = $customerdata->customer->id; 
            $customerdata1 = $this->brainTree->customerFind($customerId);
            // echo '<pre/>';print_r($customerdata1);
            $merchantId = $customerdata->customer->merchantId;
            if(!empty($customerdata->customer->id)) {
            //   $creditCardNumber = $this->brainTree->saveCustomerCard($customerId,$cardNumber,$expiryDate,$expiry_year,$cvv);
               
            //    if(isset($creditCardNumber)) {
          
            //        $cardLastFourDigit = $creditCardNumber->creditCard->last4;
            //        $cardToken        = $creditCardNumber->creditCard->token; 
            //        $imageUrl          = $creditCardNumber->creditCard->imageUrl;
              
            //         if(!empty($cardToken)) {
                        $clientToken = $this->generateTokenCI(); 
                      
                        $paymentMethodToken = $this->brainTree->createPaymentMethod($customerId,$paymentNonce);
                       // echo '<pre/>';print_r($paymentMethodToken); die();
               // }
               $paymentMethodToken = $paymentMethodToken->paymentMethod->token;
            }
           
        }

        $plans = $this->brainTree->subscribePlan($paymentMethodToken,$planId);
        echo json_encode($plans);
        http_response_code(200);
        exit;
    }
    /******************************************************************************/
    /******************************************************************************/
   
}
