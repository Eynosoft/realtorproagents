<?php
/**
 * Task Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\TaskModel;
use Modules\Client\Models\ContactTaskModel;

use CodeIgniter\Files\File;

class Task extends BaseController
{   
    protected $TaskModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->TaskModel = new TaskModel();
        $this->ContactTaskModel = new ContactTaskModel();
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
    public function addTask(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
       
        $data = [
    
            'date'   => !empty($this->request->getVar('date')) ? $this->request->getVar('date') : '',
            'task'   => !empty($this->request->getVar('task')) ? $this->request->getVar('task') : '',
           ];
       
           $old_date = explode('-', $data['date']); 
           $data['date'] = $old_date[0].'-'.$old_date[1].'-'.$old_date[2];

           $taskid = $this->TaskModel->addTaskList($data);
           $contactid = !empty($this->request->getVar('contact_id')) ? $this->request->getVar('contact_id') : '';
               if( !empty($contactid) ){
           $this->ContactTaskModel->getContactsTask($contactid,$taskid);
               }
          http_response_code(200);
          exit;
    }
        /******************************************************************************/
	/******************************************************************************/
    // get all task data--------------------
    public function getAllTask() {
    
        $result = $this->TaskModel->getAllTaskData();
    
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    /******************************************************************************/
	/******************************************************************************/
    // get tasks for calendar event...
    public function getCalendarTask() {
        $result = $this->TaskModel->getCalendarTaskData();
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

  
    public function deleteTask($id = null){
        $deleteId= !empty($id) ? $id : '';  
        $result = $this->TaskModel->deleteTaskById($deleteId);
        echo json_encode($result);
        http_response_code(200);
        exit;
        
    }
     

}