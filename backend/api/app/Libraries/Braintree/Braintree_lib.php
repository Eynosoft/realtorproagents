<?php
namespace App\Libraries\Braintree;
//defined('BASEPATH') OR exit('No direct script access allowed');

include APPPATH.'ThirdParty/braintree/includes/braintree_init.php';
/*
 *  Braintree_lib
 *	Braintree PHP SDK*
 */

class Braintree_lib {

	protected $braintree_environment = 'sandbox';
	protected $braintree_merchant_id = 'pjkgw7w7zkj59p78';
	protected $braintree_public_key  = 'ryqqmy32x9dtdmzp';
	protected $braintree_private_key = 'e6efdab6146c916e128a4bf8e90d7a1a';

	function __construct() {
		$CI = &get_instance();
		$CI->config->load('braintree', TRUE);
		$braintree = $CI->config->item('braintree');
		Braintree_Configuration::environment($braintree['braintree_environment']);
		Braintree_Configuration::merchantId($braintree['braintree_merchant_id']);
		Braintree_Configuration::publicKey($braintree['braintree_public_key']);
		Braintree_Configuration::privateKey($braintree['braintree_private_key']);
    }

    function create_client_token() {
    	$clientToken = Braintree_ClientToken::generate();
    	return $clientToken;
    }
}