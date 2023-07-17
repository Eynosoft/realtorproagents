<?php
/**
 * Profile Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\ProfileModel;
use CodeIgniter\Files\File;

class Profile extends BaseController
{   
    protected $ProfileModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->ProfileModel = new ProfileModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");

    }

    // add profile
    public function addProfile(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
       
        $data = [
            'userid' => !empty($this->request->getVar('userid')) ? $this->request->getVar('userid') : '',
            'company_broker' => !empty($this->request->getVar('company_broker')) ? $this->request->getVar('company_broker') : '',
            'first_name'   => !empty($this->request->getVar('first_name')) ? $this->request->getVar('first_name') : '',
            'last_name'      => !empty($this->request->getVar('last_name')) ? $this->request->getVar('last_name') : '',
            'address'   => !empty($this->request->getVar('address')) ? $this->request->getVar('address') : '',
            'city'      => !empty($this->request->getVar('city')) ? $this->request->getVar('city') : '',
            'state'   => !empty($this->request->getVar('state')) ? $this->request->getVar('state') : '',
            'zip'      => !empty($this->request->getVar('zip')) ? $this->request->getVar('zip') : '',
            'business_phone'   => !empty($this->request->getVar('business_phone')) ? $this->request->getVar('business_phone') : '',
            'cell_phone'      => !empty($this->request->getVar('cell_phone')) ? $this->request->getVar('cell_phone') : '',
            'fax'   => !empty($this->request->getVar('fax')) ? $this->request->getVar('fax') : '',
            'social_links'      => !empty($this->request->getVar('social_links')) ? $this->request->getVar('social_links') : '',
            'facebook'   => !empty($this->request->getVar('facebook')) ? $this->request->getVar('facebook') : '',  
            'twitter'   => !empty($this->request->getVar('twitter')) ? $this->request->getVar('twitter') : '',
            'linkedin'   => !empty($this->request->getVar('linkedin')) ? $this->request->getVar('linkedin') : '',
            'youtube'   => !empty($this->request->getVar('youtube')) ? $this->request->getVar('youtube') : '',
            'instagram'   => !empty($this->request->getVar('instagram')) ? $this->request->getVar('instagram') : ''
            ];
           if($this->ProfileModel->getProfileUserid($data['userid'])){

            $this->ProfileModel->updateProfileData($data,$data['userid']);
           }else{
        $this->ProfileModel->addProfileData($data);
           }
        http_response_code(200);
        exit;
    }
      
     /******************************************************************************/
	/******************************************************************************/

    public function getAllProfile($userid) {
      
        $result = $this->ProfileModel->getAllProfileData($userid);
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    
     /******************************************************************************/
	/******************************************************************************/
 
}