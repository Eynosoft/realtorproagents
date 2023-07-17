<?php
/**
 * Manages all the routing for admin module
 */
$routes->group("admin", ["namespace" => "\Modules\Admin\Controllers"], function ($routes) {
	// welcome page - URL: /admin
	$routes->get("/", "AdminController::index");
});