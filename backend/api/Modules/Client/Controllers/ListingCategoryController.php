<?php
/**
 * Listing Category Controller
 * 
 * Manages the listing category crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\ListingCategoryModel;

class ListingCategoryController extends BaseController
{   
    protected $listingCategoryModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->listingCategoryModel = new ListingCategoryModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
     
    public function index(){
        //$userModel = new UserModel();
        //$data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
        //return view('user_view', $data);
    }

    // add listing
    public function create(){
        $post_data = (array) json_decode(file_get_contents('php://input'), true);
        $start_date = '';
        $end_date = '';
        if(!empty($post_data['open_house_start_date'])) {
            $tempStartDate[] = $post_data['open_house_start_date'];
            echo '<pre/>';print_r($tempStartDate);die('##'); 
        }
        if(!empty($post_data['open_house_end_date'])) {
            $tempEndDate[] = $post_data['open_house_end_date'];
        }
        
        $data = [
            'mls'                   => $post_data['mls'],
            'address'               => $post_data['address'],
            'city'                  => $post_data['city'],
            'state'                 => $post_data['state'],
            'zip'                   => $post_data['zip'],
            'title'                 => $post_data['title'],
            'description'           => $post_data['description'],
            'price'                 => $post_data['price'],
            'year_built'            => $post_data['year_built'],
            'square_feet'           => $post_data['square_feet'],
            'bedrooms'              => $post_data['bedrooms'],
            'bathrooms'             => $post_data['bathrooms'],
            'virtual_tour_url'      => $post_data['virtual_tour_url'],
            'featured_listing'      => $post_data['featured_listing'],
            'sold_home'             => $post_data['sold_home'],
            'open_house_start_date' => $post_data['open_house_start_date'],
            'open_house_end_date'   => $post_data['open_house_end_date'],
            'widget_code'           => $post_data['widget_code'],
            'google_map'            => $post_data['google_map'],
            'zillow'                => $post_data['zillow'],
            'syndicate_listing'     => $post_data['syndicate_listing'],
            'sort_order'            => $post_data['sort_order']
        ];
        
        $this->listingModel->saveRecord($data);
        http_response_code(200);
    }
    
    //Provide the public content access to listing
    public function getAllListingCategory() {
        try {
            $output = $this->listingCategoryModel->listingCatGetAllData();
            echo json_encode($output);
            http_response_code(200);
            exit;
		}
		catch (\Exception $e) 
		{
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
		}
        
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
    

	/*************************************************************************************/
	/*************************************************************************************/
}
