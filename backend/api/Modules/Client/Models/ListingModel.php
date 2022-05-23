<?php
/**
 * Listing Model 
 * 
 * Manage all the operations for listing data
 */
namespace Modules\Client\Models;

use CodeIgniter\Model;
use Modules\Client\Models\ListingCategoryModel;

class ListingModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'listings';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['mls','address','city','state','zip','title','description','price','category','year_built','square_feet','bedrooms','bathrooms','main_image','additional_image','virtual_tour_url','featured_listing','sold_home','open_house_start_date','open_house_end_date','widget_code','google_map','zillow','syndicate_listing','sort_order','created_at','updated_at'];
    protected $message = '';
    protected $status_code = '';
    protected $auth_token = ''; 
    // Dates
    protected $useTimestamps        = false;
    protected $dateFormat           = 'datetime';
    protected $createdField         = 'created_at';
    protected $updatedField         = 'updated_at';
    protected $deletedField         = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks       = true;
    protected $beforeInsert         = [];
    protected $afterInsert          = [];
    protected $beforeUpdate         = [];
    protected $afterUpdate          = [];
    protected $beforeFind           = [];
    protected $afterFind            = [];
    protected $beforeDelete         = [];
    protected $afterDelete          = [];
    protected $listingFolderPath    = FCPATH."assets/listings/uploads/";
    protected $listingCategory = '';
    protected $db;
    /**
	* Constructor initializes the method and instances
	*/
	function __construct()
	{   $this->db = \Config\Database::connect();
        $this->listingCategory = new ListingCategoryModel(); 
		parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
    /**
	 * Saves the record in the database
	 * 
	 * @param(object)
	 * 
	 * @return (bool)
	 */
	public function saveRecord($data = null)
    {   
		try {
            
            if(!empty($data['main_image'])) {
                $data['main_image'] = $this->uploadMainFile($data['main_image']);
            }
            
            if(!empty($data['additional_image'])) {
                
                $data['additional_image'] = $this->uploadAddtionalFiles($data['additional_image']);
            }

			if ($this->save($data))
			{
                
                $this->message = 'Listing Added Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message
                
            );
            echo json_encode($output);
            //http_response_code(404);
		}
		catch (\Exception $e) 
		{
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
		}
        http_response_code(404);
    }
	/******************************************************************************/
	/******************************************************************************/
    /**
	 * Updates the record in the database
	 * 
	 * @param(object)
	 * 
	 * @return (bool)
	 */
	public function updateRecord($data = null)
    {   
		try {
            
            if(!empty($data['main_image'])) {
                $data['main_image'] = $this->uploadMainFile($data['main_image']);
            }
            if(!empty($data['additional_image'])) {
                $data['additional_image'] = $this->uploadAddtionalFiles($data['additional_image'],$data['id']);
                
            }
            
			if ($this->save($data))
			{
                $this->message = 'Listing Updated Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while inserting data';
                $this->status_code = 404;
            }
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message
                
            );
            echo json_encode($output);
            //http_response_code(404);
		}
		catch (\Exception $e) 
		{
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
		}
        http_response_code(404);
    }
	/******************************************************************************/
	/******************************************************************************/
    /**
	 * get all records for some parammeters in the listing
	 * 
	 * @param(object)
	 * 
	 * @return (Array)
	 */
    public function getAllListings() {
        try {
            $list_data = [];
            $listings =  $this->findAll();
            if(!empty($listings)) {
                $i = 0;
                foreach ($listings as $value) {
                    $list_data[$i]['id'] = $value['id'];
                    $list_data[$i]['title'] = $value['title'];
                    $i++;
                }
            }
            return $list_data;
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
    /**
	* Get listing data by id
	*
	* @params(int)
	*
	* returns array
	*/
	function getDataById($id = null){
	    try {
            $listingData = [];
            $listingCategoryData = [];
			$listings = $this->find($id);
            if(!empty($listings)) {
                $i = 0;
                foreach ($listings as $value) {
                    //$value['category'];
                    //$list_data[$i]['title'] = $value['title'];
                    if(isset($value['category']) && $value['category'] > 0) {
                        $listingCategoryData = $this->listingCategory->getListingCategoryDataById($value['category']);
                    }
                    
                }
               
                if(!empty($listingCategoryData)) {
                    $listingData = array_merge($listings,$listingCategoryData);
                    return $listingData;
                } else {
                    $listingData = $listings;
                    return $listingData;
                }
                
            }
            
		}
		catch (\Exception $e) {
		    header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
		}
        http_response_code(404);
	}

	/*************************************************************************************/
	/*************************************************************************************/
    /**
	 * get all the records from the listing
	 * 
	 * @param(object)
	 * 
	 * @return (Object)
	 */
    public function getAllData() {
        try {
            return $this->findAll();
        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
    /**
	 * upload main file
	 * 
	 * @param(objectArray)
	 * 
	 * @return (string)
	 */
    function uploadMainFile($mainFiles = null) {
        
        try {
            for ($i = 0; $i < count($mainFiles['name']); $i++) {

                $file_name = $mainFiles['name'][$i];
                
                $extension = pathinfo($file_name, PATHINFO_EXTENSION);
                
                $original_file_name = pathinfo($file_name, PATHINFO_FILENAME);
                
                $file_url = $original_file_name . "-" . date("YmdHis") . "." . $extension;
                
                move_uploaded_file($mainFiles["tmp_name"][$i], $this->listingFolderPath . $file_url);
                return $file_url;
            }

        } catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * upload additional files
	 * 
	 * @param(objectArray)
	 * 
	 * @return (json)
	 */
    function uploadAddtionalFiles($addtionalFiles = null,$id = null) {
        
        try {
            $aFiles = [];
            
            for ($i = 0; $i < count($addtionalFiles['name']); $i++) {
                
                $file_name=$addtionalFiles['name'][$i];
                $extension = pathinfo($file_name, PATHINFO_EXTENSION);
                $original_file_name = pathinfo($file_name, PATHINFO_FILENAME);
                $file_url = $original_file_name . "-" . date("YmdHis") . "." . $extension;
                move_uploaded_file($addtionalFiles["tmp_name"][$i], $this->listingFolderPath . $file_url);
                $aFiles[] = $file_url;
            }
            
            if(!empty($aFiles)) {
                if($id) {
                    $tdata[] = $this->getAdditonalImagesById($id);
                    array_push($tdata,$aFiles);
                    $returnData = $arraySingle = call_user_func_array('array_merge', $tdata);
                    return json_encode($returnData);
                } else {
                    return json_encode($aFiles);
                }
                
            }
            
        }catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * Delete a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
    function deleteListingById($id = null) {
        try {
            $isDelete = $this->where('id', $id)->delete();
            if ($isDelete)
			{
                $this->message = 'Listing Deleted Succesfully!';
                $this->status_code = 200;
			} else {
				$this->message = 'An error occurred while delete';
                $this->status_code = 404;
            }
            
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message
                
            );
            echo json_encode($output);
            exit;
        }catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * Delete a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
    function deleteImageListingByUrl($id=null,$img = null) {
        $isDelete = 0;
        try {
            $listings = $this->find($id);
            if(!empty($listings)) {
                $i = 0;
                foreach ($listings as $x => $val) {
                    if($x == 'additional_image') {
                        $listImgData = json_decode($val);
                        
                        $key = array_search($img, $listImgData);
                        if ($key !== false) {
                            unset($listImgData[$key]);
                            $isDelete = 1;
                        }
                    }
                    
                }
                $listImgData = array_values($listImgData);
                
                $this->where('id', $id)->set('additional_image', json_encode($listImgData))->update();  
            }
            
            if ($isDelete)
			{
                $this->message = LISTING_IMAGE_REMOVED_SUCCESSFULLY;
                $this->status_code = 200;
			} else {
				$this->message = DELETE_ERROR_MESSAGE;
                $this->status_code = 404;
            }
            
            $output = array(
                'status_code' => $this->status_code,
                'message' => $this->message
                
            );
            echo json_encode($output);
            exit;
        }catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        http_response_code(404);
    }
    /******************************************************************************/
	/******************************************************************************/
    /**
	 * Delete a list by given if
	 * 
	 * @param(Int)
	 * 
	 * @return (json)
	 */
    function getAdditonalImagesById($id = null) {
        try {
            $addtional_images = [];
            $response = $this->db->table($this->table)->select('additional_image')->where(["id" => $id])->get()->getResult();
            if(!empty($response)) {
                
                foreach($response as $res) {
                    if(empty($res->additional_image)) {
                        break;
                    }
                    $temp = json_decode($res->additional_image); 
                    for($i=0;$i<count($temp);$i++){
                        $addtional_images[$i] = $temp[$i]; 
                    }
                    
                }
                return $addtional_images;
            }
            return null;
        }catch(\Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo '{"data": "Exception occurred: ' . $e->getMessage() . '"}';
        }
        
    }
    /******************************************************************************/
	/******************************************************************************/
}
