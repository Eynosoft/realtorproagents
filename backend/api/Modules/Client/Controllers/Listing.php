<?php
/**
 * Listing Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\ListingModel;
use CodeIgniter\Files\File;

class Listing extends BaseController
{   
    protected $listingModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->listingModel = new ListingModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    // show listing
    /*public function index(){
        $userModel = new UserModel();
        $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
        return view('user_view', $data);
    }*/

    // add listing
    public function create(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
        $start_date = '';
        $end_date = '';
        if(!empty($this->request->getVar('open_house_start_date'))) {
            $tempStartDate[] = json_decode($this->request->getVar('open_house_start_date'));
            if(isset($tempStartDate[0]->year)) {
                $start_date = $tempStartDate[0]->year.'-'.$tempStartDate[0]->month.'-'.$tempStartDate[0]->day;
            }
            
        }
        if(!empty($this->request->getVar('open_house_end_date'))) {
            $tempEndDate[] = json_decode($this->request->getVar('open_house_end_date'));
            if(isset($tempEndDate[0]->year)){
                $end_date = $tempEndDate[0]->year.'-'.$tempEndDate[0]->month.'-'.$tempEndDate[0]->day;
            }
            
        }
        
        $data = [
            'mls'                   => !empty($this->request->getVar('mls')) ? $this->request->getVar('mls') : '',
            'address'               => !empty($this->request->getVar('address')) ? $this->request->getVar('address') : '',
            'city'                  => !empty($this->request->getVar('city'))? $this->request->getVar('city') : '',
            'state'                 => !empty($this->request->getVar('state')) ? $this->request->getVar('state') : '',
            'zip'                   => !empty($this->request->getVar('zip')) ? $this->request->getVar('zip') : '',
            'title'                 => !empty($this->request->getVar('title')) ? $this->request->getVar('title') : '',
            'description'           => !empty($this->request->getVar('description')) ? $this->request->getVar('description') : '',
            'price'                 => !empty($this->request->getVar('price')) ? $this->request->getVar('price') : '',
            'main_image' => !empty($_FILES['selectedMainFile']) ? $_FILES['selectedMainFile'] : '',
            'additional_image' => !empty($_FILES['selectedFiles']) ? $_FILES['selectedFiles'] : '',
            'category'         => !empty($this->request->getVar('category_name')) ? $this->request->getVar('category_name') : '',
            'year_built'            => !empty($this->request->getVar('year_built')) ? $this->request->getVar('year_built') : '',
            'square_feet'           => !empty($this->request->getVar('square_feet')) ? $this->request->getVar('square_feet') : '',
            'bedrooms'              => !empty($this->request->getVar('bedrooms')) ? $this->request->getVar('bedrooms') : '',
            'bathrooms'             => !empty($this->request->getVar('bathrooms')) ? $this->request->getVar('bathrooms') : '',
            'virtual_tour_url'      => !empty($this->request->getVar('virtual_tour_url')) ? $this->request->getVar('virtual_tour_url') : '',
            'featured_listing'      => !empty($this->request->getVar('featured_listing')) ? 1 : 0,
            'sold_home'             => !empty($this->request->getVar('sold_home')) ? 1 : 0,
            'open_house_start_date' => $start_date,
            'open_house_end_date'   => $end_date,
            'widget_code'           => !empty($this->request->getVar('widget_code')) ? $this->request->getVar('widget_code') : '',
            'google_map'            => !empty($this->request->getVar('google_map')) ? 1 : 0,
            'zillow'                => !empty($this->request->getVar('zillow')) ? 1 : 0,
            'syndicate_listing'     => !empty($this->request->getVar('syndicate_listing')) ? 1 : 0,
            'sort_order'            => !empty($this->request->getVar('sort_order')) ?  $this->request->getVar('sort_order') : 0
        ];
        
        $this->listingModel->saveRecord($data);
        http_response_code(200);
        exit;
    }
    
    //Provide the public content access to listing
    public function getListingById($id = null) {
        $result = $this->listingModel->getDataById($id);
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    
    public function getListings() {
        $result = $this->listingModel->getAllListings();
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
    public function update(){
       $start_date = '';
       $end_date = '';
        if(!empty($this->request->getVar('open_house_start_date'))) {
           $tempStartDate[] = json_decode($this->request->getVar('open_house_start_date'));
           if(isset($tempStartDate[0]->year)) {
               $start_date = $tempStartDate[0]->year.'-'.$tempStartDate[0]->month.'-'.$tempStartDate[0]->day;
           }
           
        }
       if(!empty($this->request->getVar('open_house_end_date'))) {
           $tempEndDate[] = json_decode($this->request->getVar('open_house_end_date'));
           if(isset($tempEndDate[0]->year)){
               $end_date = $tempEndDate[0]->year.'-'.$tempEndDate[0]->month.'-'.$tempEndDate[0]->day;
           }
           
       }
       
       $data = [
           'id'                    => !empty($this->request->getVar('id')) ? $this->request->getVar('id') : '',
           'mls'                   => !empty($this->request->getVar('mls')) ? $this->request->getVar('mls') : '',
           'address'               => !empty($this->request->getVar('address')) ? $this->request->getVar('address') : '',
           'city'                  => !empty($this->request->getVar('city'))? $this->request->getVar('city') : '',
           'state'                 => !empty($this->request->getVar('state')) ? $this->request->getVar('state') : '',
           'zip'                   => !empty($this->request->getVar('zip')) ? $this->request->getVar('zip') : '',
           'title'                 => !empty($this->request->getVar('title')) ? $this->request->getVar('title') : '',
           'description'           => !empty($this->request->getVar('description')) ? $this->request->getVar('description') : '',
           'price'                 => !empty($this->request->getVar('price')) ? $this->request->getVar('price') : '',
           //'main_image'            => !empty($_FILES['selectedMainFile']) ? $_FILES['selectedMainFile'] : '',
           //'additional_image'      => !empty($_FILES['selectedFiles']) ? $_FILES['selectedFiles'] : '',
           'category'              => !empty($this->request->getVar('category_name')) ? $this->request->getVar('category_name') : '',
           'year_built'            => !empty($this->request->getVar('year_built')) ? $this->request->getVar('year_built') : '',
           'square_feet'           => !empty($this->request->getVar('square_feet')) ? $this->request->getVar('square_feet') : '',
           'bedrooms'              => !empty($this->request->getVar('bedrooms')) ? $this->request->getVar('bedrooms') : '',
           'bathrooms'             => !empty($this->request->getVar('bathrooms')) ? $this->request->getVar('bathrooms') : '',
           'virtual_tour_url'      => !empty($this->request->getVar('virtual_tour_url')) ? $this->request->getVar('virtual_tour_url') : '',
           'featured_listing'      => !empty($this->request->getVar('featured_listing')) ? 1 : 0,
           'sold_home'             => !empty($this->request->getVar('sold_home')) ? 1 : 0,
           'open_house_start_date' => $start_date,
           'open_house_end_date'   => $end_date,
           'widget_code'           => !empty($this->request->getVar('widget_code')) ? $this->request->getVar('widget_code') : '',
           'google_map'            => !empty($this->request->getVar('google_map')) ? 1 : 0,
           'zillow'                => !empty($this->request->getVar('zillow')) ? 1 : 0,
           'syndicate_listing'     => !empty($this->request->getVar('syndicate_listing')) ? 1 : 0,
           'sort_order'            => !empty($this->request->getVar('sort_order')) ?  $this->request->getVar('sort_order') : 0
       ];
       if(!empty($_FILES['selectedMainFile'])) {
        $data['main_image'] = $_FILES['selectedMainFile'];
       }
       if(!empty($_FILES['selectedFiles'])) {
        $data['additional_image'] = $_FILES['selectedFiles'];
       }
       $this->listingModel->updateRecord($data);
       
       http_response_code(200);
       exit;
    }
 

    public function delete($id = null){
        $deleteId= !empty($id) ? $id : '';  
        $result = $this->listingModel->deleteListingById($deleteId);
        echo json_encode($result);
        http_response_code(200);
        exit;
        
    }
    
    public function deleteByUrl($id = null,$url = null){
 
        if(!empty($url)){
            $result = $this->listingModel->deleteImageListingByUrl($id,$url);
            //echo json_encode($result);
        }
        http_response_code(200);
        exit;
        
    }
}
