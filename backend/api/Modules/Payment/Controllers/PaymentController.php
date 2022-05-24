<?php
/**
 * Payment Controller
 * 
 * Manages the Payment crud api call
 */
namespace Modules\Payment\Controllers;

use App\Controllers\BaseController;
use Modules\Payment\Models\PaymentModel;

class PaymentController extends BaseController
{
    protected $paymentModel = null;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
        $this->paymentModel = new PaymentModel();
    }
    public function index()
    {
        
    }
}
