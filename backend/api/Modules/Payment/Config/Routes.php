<?php
/**
 * Manages all the routing for payment module
 */

$routes->group("payment", ["namespace" => "\Modules\Payment\Controllers"], function ($routes) {
	// welcome page - URL: /payment
	$routes->get("/", "PaymentController::index");
	
});
$routes->group("braintree", ["namespace" => "\Modules\Payment\Controllers"], function ($routes) {
	// welcome page - URL: /payment
	$routes->get("generateToken", "BraintreeController::generateToken");
	$routes->get("getAllPlans", "BraintreeController::getAllPlans");
	$routes->post("subscribePlan", "BraintreeController::subscribePlan");
});

