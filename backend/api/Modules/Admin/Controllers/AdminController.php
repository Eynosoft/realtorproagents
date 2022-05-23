<?php
/**
 * Admin Controller
 * 
 * Manages the Admin crud api call
 */
namespace Modules\Admin\Controllers;

use App\Controllers\BaseController;
use Modules\Admin\Models\AdminModel;

class AdminController extends BaseController
{
    protected $adminModel = null;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
        $this->adminModel = new AdminModel();
    }
    public function index()
    {
        //
    }
}
