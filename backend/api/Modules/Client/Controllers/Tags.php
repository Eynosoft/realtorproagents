<?php
/**
 * Tags Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\TagsModel;
use CodeIgniter\Files\File;

class Tags extends BaseController
{   
    protected $TagsModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->TagsModel = new TagsModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    // show Contacts
    /*public function index(){
        $userModel = new UserModel();
        $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
        return view('user_view', $data);
    }*/

    // add Tags
    public function addContactTags(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
        
        $data = [
            'id'      => !empty($this->request->getVar('id')) ? $this->request->getVar('id') : '',
            'tags'   => !empty($this->request->getVar('tags')) ? $this->request->getVar('tags') : '',
           
        ];
        
        $this->TagsModel->addTagsList($data);
        http_response_code(200);
        exit;
    }
    
    public function getAllTags() {
        $result = $this->TagsModel->getAllTagsData();
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    
     /******************************************************************************/
	/******************************************************************************/
    public function getAllTagsByContactId($contactId = null) {
        
        $result = $this->TagsModel->getAllTagsDataByContactId($contactId);
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    
    /******************************************************************************/
	/******************************************************************************/
    // show single user
    /*public function singleUser($id = null){
        $userModel = new UserModel();
        $data['user_obj'] = $userModel->where('id', $id)->first();
        return view('edit_user', $data);
    }*/

    // update user data
    public function updateContactsTags(){
     
        $data = [
            'id'   => !empty($this->request->getVar('id')) ? $this->request->getVar('id') : '',
            'tags' => !empty($this->request->getVar('tags')) ? $this->request->getVar('tags') : '',
        ];
     
       $this->TagsModel->updateTags($data);
       
       http_response_code(200);
       exit;
    }
 

    public function deleteContactsTags($id = null){
        $deleteId= !empty($id) ? $id : '';  
        $result = $this->TagsModel->deleteTagsById($deleteId);
        echo json_encode($result);
        http_response_code(200);
        exit;
        
    }
       //Provide the public content access to contacts
       public function getTagById($id = null) {
        $result = $this->TagsModel->getTagDataById($id);
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    
       //Provide the public content access to contacts
       public function getContactsTag() {
        $result = $this->TagsModel->getAllContactsTags();
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
}