<?php
/**
 * Auth Controller
 * 
 * Manages the user crud operations
 */
namespace App\Controllers;
use App\Models\UserModel;

class Auth extends BaseController
{   
    protected $userModel = null;
    //protected $botdetectcaptcha = null;
    //protected $captchaConfig = null;
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
       
        $this->userModel = new UserModel();
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");

    }
    // show users list
    /*public function index(){
        $userModel = new UserModel();
        $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
        return view('user_view', $data);
    }*/

    // add user form
    /*public function create(){
        return view('add_user');
    }*/
 
    /**
     * Register a client 
     */
    public function signup() {
        $this->userModel = new UserModel();
        $post_data = (array) json_decode(file_get_contents('php://input'), true);
        
        $data = [
            'name' => $post_data['name'],
            'phone'  => $post_data['phone'],
            'email'  => $post_data['email'],
        ];
        $this->userModel->saveRecord($data);
        http_response_code(200);
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
     * Provide login access to client
     */
    public function signin() {
        $json = file_get_contents('php://input'); 
 
        $this->userModel = new UserModel();
        $post_data = (array) json_decode(file_get_contents('php://input'), true);

        $data = [
            'email'  => $post_data['email'],
            'password' => $post_data['password'],
        ];
        
        $this->userModel->userLogin($data);
        http_response_code(200);
    }
    /******************************************************************************/
	/******************************************************************************/
    // Provide the public content access to user
    public function all() {
        $output = array(
            'status_code' => 200,
            'message' => 'Public Content',
        );
        echo json_encode($output);
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
     * Display bot captcha
     */
    public function displayBotCaptcha() {
        
        $data['captchaHtml'] = $this->botdetectcaptcha->Html();
        echo json_encode($data['captchaHtml']);
        http_response_code(200);
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
     * Check bot captcha
     */
    public function checkBotCaptcha() {
        
        http_response_code(200);
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
    /*public function update(){
        $userModel = new UserModel();
        $id = $this->request->getVar('id');
        $data = [
            'name' => $this->request->getVar('name'),
            'email'  => $this->request->getVar('email'),
        ];
        $userModel->update($id, $data);
        return $this->response->redirect(site_url('/users-list'));
    }*/
 
    // delete user
    /*public function delete($id = null){
        $userModel = new UserModel();
        $data['user'] = $userModel->where('id', $id)->delete($id);
        return $this->response->redirect(site_url('/users-list'));
    }*/  
}
