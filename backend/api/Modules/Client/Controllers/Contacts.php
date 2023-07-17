<?php

/**
 * Contacts Controller
 * 
 * Manages the user crud operations
 */

namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\ContactsModel;
use Modules\Client\Models\ContactTagsModel;
use CodeIgniter\Files\File;

class Contacts extends BaseController
{
    protected $contactModel = null;

    /**
     * Constructor initializes the method and instances
     */
    function __construct()
    {

        $this->contactModel = new ContactsModel();
        $this->ContactTagsModel = new ContactTagsModel();

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

    // add contact
    public function addContact()
    {
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);

        $data = [
            // 'id'           => !empty($this->request->getVar('id')) ? $this->request->getVar('id') : '',
            'first_name'   => !empty($this->request->getVar('first_name')) ? $this->request->getVar('first_name') : '',
            'last_name'    => !empty($this->request->getVar('last_name')) ? $this->request->getVar('last_name') : '',
            'company'      => !empty($this->request->getVar('company')) ? $this->request->getVar('company') : '',
            'address1'      => !empty($this->request->getVar('address1')) ? $this->request->getVar('address1') : '',
            'address2'      => !empty($this->request->getVar('address2')) ? $this->request->getVar('address2') : '',
            'city'         => !empty($this->request->getVar('city')) ? $this->request->getVar('city') : '',
            'state'        => !empty($this->request->getVar('state')) ? $this->request->getVar('state') : '',
            'zip'          => !empty($this->request->getVar('zip')) ? $this->request->getVar('zip') : '',
            'home_phone'    => !empty($this->request->getVar('home_phone')) ? $this->request->getVar('home_phone') : '',
            'work_phone'      => !empty($this->request->getVar('work_phone')) ? $this->request->getVar('work_phone') : '',
            'mobile_phone'  => !empty($this->request->getVar('mobile_phone')) ? $this->request->getVar('mobile_phone') : '',
            'fax'        => !empty($this->request->getVar('fax')) ? $this->request->getVar('fax') : '',
            'email'      => !empty($this->request->getVar('email')) ? $this->request->getVar('email') : '',
            'email2'      => !empty($this->request->getVar('email2')) ? $this->request->getVar('email2') : '',
            'birthday'         => !empty($this->request->getVar('birthday')) ? $this->request->getVar('birthday') : '',
            'stars'       => !empty($this->request->getVar('stars')) ? $this->request->getVar('stars') : '',
            'contact_name2'          => !empty($this->request->getVar('contact_name2')) ? $this->request->getVar('contact_name2') : '',
            'contact_phone2'         => !empty($this->request->getVar('contact_phone2')) ? $this->request->getVar('contact_phone2') : '',
            'contact_email2'      => !empty($this->request->getVar('contact_email2')) ? $this->request->getVar('contact_email2') : '',
            'contact_birthday2'           => !empty($this->request->getVar('contact_birthday2')) ? $this->request->getVar('contact_birthday2') : '',
        ];

        $tagsArray =  !empty($this->request->getVar('tags')) ? $this->request->getVar('tags') : '';

        if (!empty($tagsArray)) {
            $tagsArray = explode(',', $tagsArray);
            $contactid = $this->contactModel->addRecord($data);
            $this->ContactTagsModel->addContactsTags($tagsArray, $contactid);
        } else {
            $this->contactModel->addRecord($data);
        }

        http_response_code(200);
        exit;
    }


    public function importContacts()
    {

        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
     
       $post_data  = !empty($this->request->getVar('records')) ? $this->request->getVar('records') : '';
         $dropdownHeader  = !empty($this->request->getVar('headerList')) ? $this->request->getVar('headerList') : '';
        
         $headers = explode(',', $post_data);
          $data = array_chunk($headers,23);

          $dropdownHeaderArray = explode(',', $dropdownHeader);
        $i=1;
        foreach($dropdownHeaderArray as $value){
     
            $headerData[$i] =  array_search($value, $data[0]);
         $i++;
          } 
        $length = count($data);

          for($i=1; $i< $length; $i++){

          $contactsData[$i] = [
                     //'id'  => !empty($data[$i][0]) ? $data[$i][0] : '',
                
                     'first_name'   => !empty($data[$i][1]) && array_search(1, $headerData) ?  $data[$i][1] : '',
                    'last_name'   => !empty($data[$i][2]) && array_search(2, $headerData) ?  $data[$i][2] : '',
                    'company'     => !empty($data[$i][3]) && array_search(3, $headerData) ?  $data[$i][3] : '',
                    'address1'     => !empty($data[$i][4]) && array_search(4, $headerData) ?  $data[$i][4] : '',
                    'address2'     => !empty($data[$i][5]) && array_search(5, $headerData) ?  $data[$i][5] : '',
                    'city'        => !empty($data[$i][6]) && array_search(6, $headerData) ?  $data[$i][6] : '',
                    'state'       => !empty($data[$i][7]) && array_search(7, $headerData) ?  $data[$i][7] : '',
                    'zip'        => !empty($data[$i][8]) && array_search(8, $headerData) ?  $data[$i][8] : '',
                    'home_phone'      => !empty($data[$i][9]) && array_search(9, $headerData) ?  $data[$i][9] : '',
                    'work_phone'      => !empty($data[$i][10]) && array_search(10, $headerData) ?  $data[$i][10] : '',
                    'mobile_phone' => !empty($data[$i][11]) && array_search(11, $headerData) ?  $data[$i][11] : '',
                    'fax'     => !empty($data[$i][12]) && array_search(12, $headerData) ?  $data[$i][12] : '',
                    'email'     => !empty($data[$i][13]) && array_search(13, $headerData) ?  $data[$i][13] : '',
                    'email2'        => !empty($data[$i][14]) && array_search(14, $headerData) ?  $data[$i][14] : '',
                    'birthday'      => !empty($data[$i][15]) ?  $data[$i][15] : '',
                    'stars'      => !empty($data[$i][16]) ?  $data[$i][16] : '',
                    //'tags'         => !empty($data[$i][17]) ? str_replace('"', '', $data[$i][17]) : '',
                    'contact_name2'       => !empty($data[$i][18]) ?  $data[$i][18] : '',
                    'contact_phone2'     => !empty($data[$i][19]) ?  $data[$i][19] : '',
                    'contact_email2'       => !empty($data[$i][20]) ? $data[$i][20] : '',
                    'contact_birthday2'    => !empty($data[$i][21]) ?  $data[$i][21] : '',
          ];
          } 
        // $arr = [];
        // $count = 0;
      
        //  foreach ($post_data as $type) {
  
        //     $type = array_filter($type, fn($value) => !is_null($value) && $value !== '');
        //      $count = count($type); 
            
        //     for ($i = 0; $i < $count; $i++) {
              
        //         $arr[]= explode(",", str_replace('"', '', $type[$i][0]));
              
        //         if(isset($type[$i])){
        //         $data[$i] = [
        //             //  'id'        => !empty($arr[$i][0]) ? $arr[$i][0] : '',
        //             'first_name'   => !empty($arr[$i][1]) ?  $arr[$i][1] : '',
        //             'last_name'   => !empty($arr[$i][2]) ?  $arr[$i][2] : '',
        //             'company'     => !empty($arr[$i][3]) ?  $arr[$i][3] : '',
        //             'address1'     => !empty($arr[$i][4]) ?  $arr[$i][4] : '',
        //             'address2'     => !empty($arr[$i][5]) ?  $arr[$i][5] : '',
        //             'city'        => !empty($arr[$i][6]) ?  $arr[$i][6] : '',
        //             'state'       => !empty($arr[$i][7]) ?  $arr[$i][7] : '',
        //             'zip'        => !empty($arr[$i][8]) ?  $arr[$i][8] : '',
        //             'home_phone'      => !empty($arr[$i][9]) ?  $arr[$i][9] : '',
        //             'work_phone'      => !empty($arr[$i][10]) ?  $arr[$i][10] : '',
        //             'mobile_phone' => !empty($arr[$i][11]) ?  $arr[$i][11] : '',
        //             'fax'     => !empty($arr[$i][12]) ?  $arr[$i][12] : '',
        //             'email'     => !empty($arr[$i][13]) ?  $arr[$i][13] : '',
        //             'email2'        => !empty($arr[$i][14]) ?  $arr[$i][14] : '',
        //             'birthday'      => !empty($arr[$i][15]) ?  $arr[$i][15] : '',
        //             'stars'      => !empty($arr[$i][16]) ?  $arr[$i][16] : '',
        //             //'tags'         => !empty($arr[$i][17]) ? str_replace('"', '', $arr[$i][17]) : '',
        //             'contact_name2'       => !empty($arr[$i][18]) ?  $arr[$i][18] : '',
        //             'contact_phone2'     => !empty($arr[$i][19]) ?  $arr[$i][19] : '',
        //             'contact_email2'       => !empty($arr[$i][20]) ? $arr[$i][20] : '',
        //             'contact_birthday2'    => !empty($arr[$i][21]) ?  $arr[$i][21] : '',
        //         ];
                  
        //     }     
        //      }
               if(!empty($contactsData)){
                $this->contactModel->importContactData($contactsData);
               }
        //    }   
        http_response_code(200);
        exit;
    }

    //Provide the public content access to contacts
    public function getContactById($id = null)
    {
        $result = $this->contactModel->getContactDataById($id);

        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    // search contact bu alpha letter method-----------------------------------------

    public function contactSeachByAlphabet($letter = null)
    {
        $result = $this->contactModel->searchByAlphabet($letter);
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
    // get all contacts data--------------------------------------------------------

    public function getContacts()
    {
        $result = $this->contactModel->getAllData();

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
    public function updateContacts()
    {
           
        $data = [
            'id'           => !empty($this->request->getVar('id')) ? $this->request->getVar('id') : '',
            'first_name'   => !empty($this->request->getVar('first_name')) ? $this->request->getVar('first_name') : '',
            'last_name'    => !empty($this->request->getVar('last_name')) ? $this->request->getVar('last_name') : '',
            'company'      => !empty($this->request->getVar('company')) ? $this->request->getVar('company') : '',
            'address1'      => !empty($this->request->getVar('address1')) ? $this->request->getVar('address1') : '',
            'address2'      => !empty($this->request->getVar('address2')) ? $this->request->getVar('address2') : '',
            'city'         => !empty($this->request->getVar('city')) ? $this->request->getVar('city') : '',
            'state'        => !empty($this->request->getVar('state')) ? $this->request->getVar('state') : '',
            'zip'          => !empty($this->request->getVar('zip')) ? $this->request->getVar('zip') : '',
            'home_phone'     => !empty($this->request->getVar('home_phone')) ? $this->request->getVar('home_phone') : '',
            'work_phone'        => !empty($this->request->getVar('work_phone')) ? $this->request->getVar('work_phone') : '',
            'mobile_phone'  => !empty($this->request->getVar('mobile_phone')) ? $this->request->getVar('mobile_phone') : '',
            'fax'        => !empty($this->request->getVar('fax')) ? $this->request->getVar('fax') : '',
            'email'      => !empty($this->request->getVar('email')) ? $this->request->getVar('email') : '',
            'email2'      => !empty($this->request->getVar('email2')) ? $this->request->getVar('email2') : '',
            'birthday'         => !empty($this->request->getVar('birthday')) ? $this->request->getVar('birthday') : '',
            'stars'       => !empty($this->request->getVar('stars')) ? $this->request->getVar('stars') : '',
            // 'tags'       => !empty($this->request->getVar('tags')) ? $this->request->getVar('tags') : '',
            'contact_name2'          => !empty($this->request->getVar('contact_name2')) ? $this->request->getVar('contact_name2') : '',
            'contact_phone2'         => !empty($this->request->getVar('contact_phone2')) ? $this->request->getVar('contact_phone2') : '',
            'contact_email2'      => !empty($this->request->getVar('contact_email2')) ? $this->request->getVar('contact_email2') : '',
            'contact_birthday2'           => !empty($this->request->getVar('contact_birthday2')) ? $this->request->getVar('contact_birthday2') : '',
        ];

        $id  = !empty($this->request->getVar('id')) ? $this->request->getVar('id') : '';
        $tags = !empty($this->request->getVar('tags')) ? $this->request->getVar('tags') : '';

       // if (!empty($tags)) {
  
            $tags = explode(',', $tags);
            $this->contactModel->updateContact($data);
            $this->ContactTagsModel->updateContactsTags($tags, $id);
       // } else {
         //   $this->contactModel->updateContact($data);
       // }
        http_response_code(200);
        exit;
    }


    public function deleteContact($id = null)
    {
        $deleteId = !empty($id) ? $id : '';
        $result = $this->contactModel->deleteContactById($deleteId);
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
}
