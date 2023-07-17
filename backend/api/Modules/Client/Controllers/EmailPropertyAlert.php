<?php
/**
 * Email Property Alert Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\EmailPropertyAlertModel;
use Modules\Client\Models\EmailSendModel;

use CodeIgniter\Files\File;

class EmailPropertyAlert extends BaseController
{   
    protected $EmailPropertyAlertModel = null;
    protected $EmailSendModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->EmailPropertyAlertModel = new EmailPropertyAlertModel();
        $this->EmailSendModel = new EmailSendModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    // show 
    /*public function index(){
        $userModel = new UserModel();
        $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
        return view('user_view', $data);
    }*/
    
      /******************************************************************************/
	/******************************************************************************/
    // add Task-----------------------------------------------
    public function addEmailPropertyAlert(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
      
        $data = [
           'location'   => !empty($this->request->getVar('location')) ? $this->request->getVar('location') : '',
            'property_type'   => !empty($this->request->getVar('property_type')) ? $this->request->getVar('property_type') : '',
            'min_price'   => !empty($this->request->getVar('min_price')) ? $this->request->getVar('min_price') : '',
            'max_price'   => !empty($this->request->getVar('max_price')) ? $this->request->getVar('max_price') : '',
            'beds'   => !empty($this->request->getVar('beds')) ? $this->request->getVar('beds') : '',
            'baths'   => !empty($this->request->getVar('baths')) ? $this->request->getVar('baths') : '',
            'desired_features'   => !empty($this->request->getVar('feature')) ? $this->request->getVar('feature') : '',
            'name'   => !empty($this->request->getVar('name')) ? $this->request->getVar('name') : '',
            'email'   => !empty($this->request->getVar('email')) ? $this->request->getVar('email') : '',
            'phone'   => !empty($this->request->getVar('phone')) ? $this->request->getVar('phone') : '',
           ];

            $status = $this->EmailPropertyAlertModel->addEmailPropertyAlertData($data);
            if($status==200){

              $message = "Name: {$data['name']} <br> Phone: {$data['phone']} <br>Email: {$data['email']} <br><br>
              Location: {$data['location']} <br>Property Type: {$data['property_type']} <br>Min Price: {$data['min_price']} <br>
              Max Price: {$data['max_price']} <br> Beds: {$data['beds']} <br> Baths: {$data['baths']} <br> Desired Features: 
              {$data['desired_features']} <br><br> Lead Source: Ultra Agent";

                        $this->EmailSendModel->SendEmail($message);
        
        }
          http_response_code(200);
          exit;
    }
        /******************************************************************************/
	/******************************************************************************/

}