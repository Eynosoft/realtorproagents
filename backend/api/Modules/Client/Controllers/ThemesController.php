<?php
/**
 * Themes Controller
 * 
 * Manages the user crud operations
 */
namespace Modules\Client\Controllers;

use App\Controllers\BaseController;
use Modules\Client\Models\UserThemesModel;
use Modules\Client\Models\ThemesModel;
use Modules\Client\Models\ThemesPageModel;


use CodeIgniter\Files\File;

class ThemesController extends BaseController
{   
    protected $EmailPropertyAlertModel = null;
    protected $EmailSendModel = null;
    
    /**
     * Constructor initializes the method and instances
     */
    function __construct(){
        
        $this->UserThemesModel = new UserThemesModel();
        $this->ThemesModel = new ThemesModel();
        $this->ThemesPageModel = new ThemesPageModel();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    }
   /**
     * add theme info 
     */
        /******************************************************************************/
	/******************************************************************************/
    public function addUserThemeInfo(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);
      
        $data = [
           'theme_id'   => !empty($this->request->getVar('theme_id')) ? $this->request->getVar('theme_id') : '',
            'userid'   => !empty($this->request->getVar('userid')) ? $this->request->getVar('userid') : '',
            ];
            $this->UserThemesModel->addUserThemesData($data);
            http_response_code(200);
          exit;
        }

        /******************************************************************************/
	/******************************************************************************/
    
    public function getThemeUserId() {
        $result = $this->ThemesModel->getThemeUserIdData();
        echo json_encode($result);
        http_response_code(200);
        exit;
    }
   
        /******************************************************************************/
	/******************************************************************************/
        /**
     * add theme select page 
     */
    public function addThemeSelectPage(){
        //$post_data = (array) json_decode(file_get_contents('php://input'), true);

           $theme_id   = !empty($this->request->getVar('theme_id')) ? $this->request->getVar('theme_id') : '';
           $userid     = !empty($this->request->getVar('userid')) ? $this->request->getVar('userid') : '';
           $data = [
           'home' => !empty($this->request->getVar('home')) ? $this->request->getVar('home') : '',
           'property_search_idx' => !empty($this->request->getVar('property_search_idx')) ? $this->request->getVar('property_search_idx') : '',
           'about_us' => !empty($this->request->getVar('about_us')) ? $this->request->getVar('about_us') : '',
           'testimonials' => !empty($this->request->getVar('testimonials')) ? $this->request->getVar('testimonials') : '',
           'agents' => !empty($this->request->getVar('agents')) ? $this->request->getVar('agents') : '',
           'blog' => !empty($this->request->getVar('blog')) ? $this->request->getVar('blog') : '',
           'news_rss_feeds' => !empty($this->request->getVar('news_rss_feeds')) ? $this->request->getVar('news_rss_feeds') : '',
           'preferred_lender' => !empty($this->request->getVar('preferred_lender')) ? $this->request->getVar('preferred_lender') : '',
           'local_area' => !empty($this->request->getVar('local_area')) ? $this->request->getVar('local_area') : '',
           'links' => !empty($this->request->getVar('links')) ? $this->request->getVar('links') : '',
           'buyer_seller_tips' => !empty($this->request->getVar('buyer_seller_tips')) ? $this->request->getVar('buyer_seller_tips') : '',
           'school_search' => !empty($this->request->getVar('school_search')) ? $this->request->getVar('school_search') : '',
           'interest_rates' => !empty($this->request->getVar('interest_rates')) ? $this->request->getVar('interest_rates') : '',
           'calculators' => !empty($this->request->getVar('calculators')) ? $this->request->getVar('calculators') : '',
           'glossary_terms' => !empty($this->request->getVar('glossary_terms')) ? $this->request->getVar('glossary_terms') : '',
           'moving_checklist' => !empty($this->request->getVar('moving_checklist')) ? $this->request->getVar('moving_checklist') : '',
           'listings' => !empty($this->request->getVar('listings')) ? $this->request->getVar('listings') : '',
           'homes_condos' => !empty($this->request->getVar('homes_condos')) ? $this->request->getVar('homes_condos') : '',
           'lots_land' => !empty($this->request->getVar('lots_land')) ? $this->request->getVar('lots_land') : '',
           'rentals' => !empty($this->request->getVar('rentals')) ? $this->request->getVar('rentals') : '',
           'commercial' => !empty($this->request->getVar('commercial')) ? $this->request->getVar('commercial') : '',
           'open_house' => !empty($this->request->getVar('open_house')) ? $this->request->getVar('open_house') : '',
           'past_sales' => !empty($this->request->getVar('past_sales')) ? $this->request->getVar('past_sales') : '',
           'contact_us' => !empty($this->request->getVar('contact_us')) ? $this->request->getVar('contact_us') : '',
           'home_worth' => !empty($this->request->getVar('about_us')) ? $this->request->getVar('about_us') : '',
           'email_property_alerts' => !empty($this->request->getVar('email_property_alerts')) ? $this->request->getVar('email_property_alerts') : '',
           'home_value' => !empty($this->request->getVar('home_value')) ? $this->request->getVar('home_value') : '',
           'home_request' => !empty($this->request->getVar('home_request')) ? $this->request->getVar('home_request') : '',
           'rental_request' => !empty($this->request->getVar('rental_request')) ? $this->request->getVar('rental_request') : '',
           'relocate' => !empty($this->request->getVar('relocate')) ? $this->request->getVar('relocate') : '',
           'advanced_property_search' => !empty($this->request->getVar('advanced_property_search')) ? $this->request->getVar('advanced_property_search') : '',
           'map_search' => !empty($this->request->getVar('map_search')) ? $this->request->getVar('map_search') : '',
           'search_open_houses' => !empty($this->request->getVar('search_open_houses')) ? $this->request->getVar('search_open_houses') : '',
           'property_alerts' => !empty($this->request->getVar('property_alerts')) ? $this->request->getVar('property_alerts') : '',
           'property_organizer' => !empty($this->request->getVar('property_organizer')) ? $this->request->getVar('property_organizer') : '',
           'communities' => !empty($this->request->getVar('about_us')) ? $this->request->getVar('about_us') : '',
           'markets' => !empty($this->request->getVar('markets')) ? $this->request->getVar('markets') : '',
           'featured_properties' => !empty($this->request->getVar('featured_properties')) ? $this->request->getVar('featured_properties') : '',
           'sold_properties' => !empty($this->request->getVar('sold_properties')) ? $this->request->getVar('sold_properties') : '',
           'rental_properties' => !empty($this->request->getVar('rental_properties')) ? $this->request->getVar('rental_properties') : '',
           'commercial_properties' => !empty($this->request->getVar('commercial_properties')) ? $this->request->getVar('commercial_properties') : '',
           'supplemental_properties' => !empty($this->request->getVar('supplemental_properties')) ? $this->request->getVar('supplemental_properties') : '',
           'agents_b' => !empty($this->request->getVar('agents_b')) ? $this->request->getVar('agents_b') : '',
           'office_b' => !empty($this->request->getVar('office_b')) ? $this->request->getVar('office_b') : '',
           ];
        
          //$data = explode(",",$theme_page);
           
       // print_r($data);
            $pages = json_encode( $data);
            $pageData = [
            'theme_id'=> $theme_id,
            'userid' => $userid,
            'page_name' => $pages
          ];
        
            $this->ThemesPageModel->addThemePageData($pageData);
            http_response_code(200);
          exit;
        }
    }