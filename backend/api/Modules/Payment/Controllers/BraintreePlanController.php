<?php
/**
 * BrainTree Plan Controller
 * 
 * Manages the braintree plan crud api call
 */
namespace Modules\Payment\Controllers;

use App\Controllers\BaseController;
use Modules\Payment\Models\BrainTreePlanModel;
use App\Libraries\Braintree\Braintree_lib;

class BraintreePlanController extends BaseController
{
    protected $brainTreePlanModel = null;
    protected $brainTree = null;
    protected $clientToken = null;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
        $this->brainTreePlanModel = new BrainTreePlanModel();
        $this->brainTree = new Braintree_lib();
    }

    public function index()
    {
        
    }
    /******************************************************************************/
    /******************************************************************************/
    /**
	* Generate token from braintree api
	*/
    public function generateToken()
    {
        $this->clientToken = $this->brainTree->create_client_token();
        return $this->clientToken;
    }
    /******************************************************************************/
    /******************************************************************************/
    /**
	* Get all the plans from braintree
	*/
    public function getAllPlans()
    {
        
    }
    /******************************************************************************/
    /******************************************************************************/
}
