<?php
/**
 * calendar Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\calendarModel;
use CodeIgniter\Files\File;

class Calendar extends BaseController
{   
    protected $calendarModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->calendarModel = new calendarModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }


public function calendarEvent(){
    //$post_data = (array) json_decode(file_get_contents('php://input'), true);
 
    //$calendarEvents = array('title' => 'Event name', 'start' => '2022-04-12');

    // echo json_encode($calendarEvents);
    
    http_response_code(200);
    exit;
}

}
