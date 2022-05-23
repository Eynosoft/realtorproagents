<?php
/**
 * BotCaptcha Controller
 * 
 * Manages the use BotDetectCaptcha operations
 */
namespace App\Controllers;
//use SimpleCaptcha;
require_once(APPPATH.'ThirdParty/botdetect-captcha-lib/botdetect.php');

class BotCaptcha extends BaseController
{   
    protected $BDC_Include_Path = null;
    protected $BDC_Url_Root = null;
    protected $BDC_Config_Override_Path = null;

    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
      // normalize paths
      $this->BDC_Config_Override_Path  = APPPATH;
      if (is_file(APPPATH . 'ThirdParty/botdetect-captcha-lib/botdetect/CaptchaIncludes.php')) {
        // in case a local copy of the library exists, it is always used
        $BDC_Include_Path = __DIR__ . '/botdetect/';
        $BDC_Url_Root = 'botdetect/public/';
      } else {
        // clean-up path specifications
        $BDC_Include_Path = BDC_NormalizePath($BDC_Include_Path);
        $BDC_Url_Root = BDC_NormalizePath($BDC_Url_Root);
        $BDC_Config_Override_Path = BDC_NormalizePath($BDC_Config_Override_Path);
      }
      define('BDC_INCLUDE_PATH', $BDC_Include_Path);
      define('BDC_URL_ROOT', $BDC_Url_Root);
      define('BDC_CONFIG_OVERRIDE_PATH', $BDC_Config_Override_Path);
      define('BDC_HANDLER_PATH', '');
      header('Access-Control-Allow-Origin: *');
      header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
      header('Content-Type: application/json');
        
    }
    // show users list
    public function displayBotCaptcha(){
        //if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $DemoCaptcha = new Captcha("DemoCaptcha");
            $DemoCaptcha->UserInputID = "CaptchaCode";
            if ($_POST && isset($_POST['ApplyCaptchaSettings'])) {
                if (isset($_POST['Locale'])) {
                  $DemoCaptcha->Locale = $_POST['Locale'];
                }
                if (isset($_POST['CodeLength']) && 0 != strcmp($_POST['CodeLength'], 'default')) {
                  $DemoCaptcha->CodeLength = $_POST['CodeLength'];
                } else {
                  $DemoCaptcha->CodeLength = null;
                }
                if (isset($_POST['CodeStyle'])) {
                  $DemoCaptcha->CodeStyle = $_POST['CodeStyle'];
                }
                if (isset($_POST['ImageStyle']) && 0 != strcmp($_POST['ImageStyle'], 'default')) {
                  $DemoCaptcha->ImageStyle = $_POST['ImageStyle'];
                } else {
                  $DemoCaptcha->ImageStyle = null;
                }
                if (isset($_POST['CustomLightColor'])) {
                  $DemoCaptcha->CustomLightColor = $_POST['CustomLightColor'];
                }
                if (isset($_POST['CustomDarkColor'])) {
                  $DemoCaptcha->CustomDarkColor = $_POST['CustomDarkColor'];
                }
                if (isset($_POST['ImageFormat'])) {
                  $DemoCaptcha->ImageFormat = $_POST['ImageFormat'];
                }
                if (isset($_POST['ImageWidth'])) {
                  $DemoCaptcha->ImageWidth = $_POST['ImageWidth'];
                }
                if (isset($_POST['ImageHeight'])) {
                  $DemoCaptcha->ImageHeight = $_POST['ImageHeight'];
                }
                if (isset($_POST['SoundStyle']) && 0 != strcmp($_POST['SoundStyle'], 'default')) {
                  $DemoCaptcha->SoundStyle = $_POST['SoundStyle'];
                } else {
                  $DemoCaptcha->SoundStyle = null;
                }
                if (isset($_POST['SoundFormat'])) {
                  $DemoCaptcha->SoundFormat = $_POST['SoundFormat'];
                }
              }
        /*$postedData = (array) json_decode(file_get_contents('php://input'), true);
        echo '<pre/>';print_r($postedData);die('###');    
        $userEnteredCaptchaCode = $postedData['userEnteredCaptchaCode'];
        $captchaId = $postedData['captchaId'];

        // create a captcha instance to be used for the captcha validation
        $captcha = new SimpleCaptcha();
        // execute the captcha validation
        $isHuman = $captcha->Validate($userEnteredCaptchaCode, $captchaId);

        if ($isHuman == false) {
            // captcha validation failed
            $result = array('success' => false);
            // TODO: consider logging the attempt
        } else {
            // captcha validation succeeded
            $result = array('success' => true);
        }*/

        // return the json string with the validation result to the frontend
        echo $DemoCaptcha->Html();die('###');
        echo json_encode($DemoCaptcha->Html()); exit;
        //}
    }

    // add user form
    /*public function create(){
        return view('add_user');
    }*/
 
    
    /**
     * Display bot captcha
     */
    /*
    public function displayBotCaptcha() {
        
        $data['captchaHtml'] = $this->botdetectcaptcha->Html();
        echo json_encode($data['captchaHtml']);
        http_response_code(200);
    }*/
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
