<?php
/**
 * Idx Membership  controller Controller
 * 
 * Manages the Mls crud api call
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\MembershipModel;

class Membership extends BaseController
{
    protected $MembershipModel = null;

    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{
        $this->MembershipModel = new MembershipModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    public function index()
    {
 
    }
    /**
     * save all membership data
     */

    public function addMembership(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
        
        $data = [
            'userid'      => !empty($this->request->getVar('userid')) ? $this->request->getVar('userid') : '',
            'idx_package'   => !empty($this->request->getVar('membershipname')) ? $this->request->getVar('membershipname') : '',
            'price'      => !empty($this->request->getVar('price')) ? $this->request->getVar('price') : '',
 ];
        
        $this->MembershipModel->addMembershipData($data);
        http_response_code(200);
        exit;
    }
}
