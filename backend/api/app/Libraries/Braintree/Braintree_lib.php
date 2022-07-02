<?php
namespace App\Libraries\Braintree;
//defined('BASEPATH') OR exit('No direct script access allowed');
require_once(APPPATH.'ThirdParty/braintree/includes/braintree_init.php');

/*
 *  Braintree_lib
 *	Braintree PHP SDK*
 */

class Braintree_lib {
	protected $gateway = '';
	protected $braintree_environment = 'sandbox';
	protected $braintree_merchant_id = 'pjkgw7w7zkj59p78';
	protected $braintree_public_key  = 'ryqqmy32x9dtdmzp';
	protected $braintree_private_key = 'e6efdab6146c916e128a4bf8e90d7a1a';
	
	/**
	* Constructor initializes the method and instances
	*/
	function __construct() {
		
		$this->gateway = new \Braintree\Gateway([
			'environment' => $this->braintree_environment,
			'merchantId' => $this->braintree_merchant_id,
			'publicKey' => $this->braintree_public_key,
			'privateKey' => $this->braintree_private_key
		]);
    }
	/**
	 * Generates the client token from braintree
	 */
    function create_client_token() {

    	//$clientToken = Braintree_ClientToken::generate();
		try {
		$clientToken = $this->gateway->ClientToken()->generate();
		return $clientToken;
		} catch (\Braintree\Exception\NotFound $e) {
			echo $e->getMessage();
		}
    }
	/******************************************************************************/
    /******************************************************************************/
	/**
	 * Get all the plans from braintree
	 */
	function getAllPlans() {
		try {
		return $this->gateway->plan()->all();
		} catch (\Braintree\Exception\NotFound $e) {
			echo $e->getMessage();
		}
	}
	/******************************************************************************/
    /******************************************************************************/
	/**
	 * Subscribe for the plan for braintree
	 */
	function subscribePlan($paymentMethodToken = null, $planId = null) {
		try {
		
			$result = $this->gateway->subscription()->create([
				'paymentMethodToken' => $paymentMethodToken,
				'planId' => $planId
			]);
			return $result;  
		} catch (\Braintree\Exception\NotFound $e) {
			echo $e->getMessage();
		}
		
	}
	/******************************************************************************/
    /******************************************************************************/
	/**
	 * Create customer for subscription
	 */
	function createCustomer($firstname = null, $lastname = null) {
		try {
			$result = $this->gateway->customer()->create([
				'firstName' => $firstname,
				'lastName' => $lastname
			]);
			
			return $result;  
		} catch (\Braintree\Exception\NotFound $e) {
			echo $e->getMessage();
		}
		
	}
	/******************************************************************************/
    /******************************************************************************/
	/**
	 * Get customer data for braintree
	 */
	function customerFind($customerId = null) {
		try {
			$result = $this->gateway->customer()->find($customerId);
			
			return $result;  
		} catch (\Braintree\Exception\NotFound $e) {
			echo $e->getMessage();
		}
		
	}
	/******************************************************************************/
    /******************************************************************************/
	/**
	 * Create customer for subscription
	 */
	function saveCustomerCard($customerId = null, $cardNumber = null, $expiryDate = null, $expiry_year = null, $cvv = null) {
		try {
			$result = $this->gateway->creditCard()->create([
				'customerId' 	 => $customerId,
				'number' 	 	 => $cardNumber,
				'expirationDate' => $expiryDate.'/'.$expiry_year,
				'cvv' 			 => $cvv
			]);
			
			return $result;  
		} catch (\Braintree\Exception\NotFound $e) {
			echo $e->getMessage();
		}
		
	}
	/******************************************************************************/
    /******************************************************************************/
	/**
	 * Create payment method
	 */
	function createPaymentMethod($customerId = null, $paymentNonce = null) {
		try {
    
			$result = $this->gateway->paymentMethod()->create([
				'customerId' => $customerId,
				'paymentMethodNonce' => $paymentNonce,
				'options' => [
				  'failOnDuplicatePaymentMethod' => false
				]
			]);

			return $result;  
		} catch (\Braintree\Exception\NotFound $e) {
			echo $e->getMessage();
		}
		
	}
	/******************************************************************************/
    /******************************************************************************/ 
	/**
	 * Create payment method nonce
	 */
	// function createPaymentMethodNonce($paymentMethodToken = null) {
	// 	try {
	// 		//$result = $this->gateway->paymentMethodNonce()->create($paymentMethodToken);
	// 		//$result = $gateway->paymentMethodNonce()->create('A_PAYMENT_METHOD_TOKEN');
	// 		//$nonce = $result->paymentMethodNonce->nonce;
			
	// 		//return $result;  
	// 	} catch (\Braintree\Exception\NotFound $e) {
	// 		echo $e->getMessage();
	// 	}
	// }

	/******************************************************************************/
    /******************************************************************************/ 
	
}	