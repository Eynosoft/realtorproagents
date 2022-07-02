<?php
/**
 * Manages all the routing for payment module
 */

$routes->group("mls", ["namespace" => "\Modules\Mls\Controllers"], function ($routes) {
	// welcome page - URL: /mls
	$routes->get("getMls", "MlsController::getMls");
});
