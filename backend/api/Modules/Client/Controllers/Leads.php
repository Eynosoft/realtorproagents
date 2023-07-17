<?php
/**
 * Leads Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\LeadsModel;
use CodeIgniter\Files\File;

class Leads extends BaseController
{   
    protected $LeadsModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->listingModel = new LeadsModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }


public function createLeads(){
    //$post_data = (array) json_decode(file_get_contents('php://input'), true);
 
    
    $data = [
        'auto_import_leads' => !empty($this->request->getVar('auto_import_leads')) ? $this->request->getVar('auto_import_leads') : '',
        'auto_opt_in_leads' => !empty($this->request->getVar('auto_opt_in_leads')) ? $this->request->getVar('auto_opt_in_leads') : ''
        ];
    
    $this->listingModel->saveLeadsRecord($data);
    http_response_code(200);
    exit;
}

}
