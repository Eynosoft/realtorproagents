<?php
/**
 * Manages all the routing for payment module
 */

$routes->group("payment", ["namespace" => "\Modules\Payment\Controllers"], function ($routes) {
	// welcome page - URL: /payment
	$routes->get("/", "PaymentController::index");
	$routes->post("agent-plan", "PaymentController::addAgentPlan");
	$routes->post("payment-details", "PaymentController::addPaymentDetails");
	$routes->post("order-details", "PaymentController::addOrderDetails");
	$routes->get("get-agentPlan", "PaymentController::getIdxPaymentPlan");
	
});
$routes->group("braintree", ["namespace" => "\Modules\Payment\Controllers"], function ($routes) {
	// welcome page - URL: /payment
	$routes->get("/", "BraintreeController::index");
	$routes->get("generateToken", "BraintreeController::generateToken");
	$routes->get("getAllPlans", "BraintreeController::getAllPlans");
	$routes->post("subscribePlan", "BraintreeController::subscribePlan");

});

