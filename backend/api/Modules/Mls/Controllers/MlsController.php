<?php
/**
 * Mls Controller
 * 
 * Manages the Mls crud api call
 */
namespace Modules\Mls\Controllers;

use App\Controllers\BaseController;
use Modules\Mls\Models\MlsModel;
use CodeIgniter\Files\File;

class MlsController extends BaseController
{
    protected $mlsModel = null;

    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
   
        $this->mlsModel = new MlsModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    // public function index()
    // {
        
    // }
    /**
     * Get all mls data
     */
    public function getMls() {

        $result = $this->mlsModel->getAllData();
        echo json_encode($result);
        http_response_code(200);
        exit;
    } 

}
