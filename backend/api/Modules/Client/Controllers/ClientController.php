<?php
/**
 * Client Controller
 * 
 * Manages the Client crud api call
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\ClientModel;

class ClientController extends BaseController
{
    protected $clientModel = null;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
        $this->clientModel = new ClientModel();
    }
    public function index()
    {
        //
    }
}
