<?php
/**
 * Manages all the routing for client module
 */

$routes->group("client", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
	// welcome page - URL: /client
	$routes->get("/", "ClientController::index");
});
$routes->group("listing", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
	// welcome page - URL: /client
	$routes->post("create", "Listing::create");
	$routes->get("getListings", "Listing::getListings");

	$routes->get("getListingById/(:num)", "Listing::getListingById/$1");
	$routes->post("update/(:num)", "Listing::update/$1");
	$routes->delete("delete/(:num)", "Listing::delete/$1");
	$routes->delete("deleteByUrl/(:num)/(:any)", "Listing::deleteByUrl/$1/$2");
});
$routes->group("listingcategory", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
	// welcome page - URL: /client
	$routes->get("/", "ListingCategoryController::index");
	$routes->get("getAllListingCategory", "ListingCategoryController::getAllListingCategory");
});
$routes->group("leads", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
	// welcome page - URL: /client
	$routes->post("createleads", "Leads::createLeads");

});

$routes->group("contacts", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
	// welcome page - URL: /client
	$routes->post("addContact", "Contacts::addContact");
	$routes->get("getContacts", "Contacts::getContacts");
	$routes->get("getContactById/(:num)", "Contacts::getContactById/$1");
	$routes->post("updateContact/(:num)", "Contacts::updateContacts/$1");
	$routes->delete("deleteContact/(:num)", "Contacts::deleteContact/$1");
	$routes->post("import-contacts", "Contacts::importContacts");
	$routes->get("contactSeachByAlphabet/(:any)", "Contacts::contactSeachByAlphabet/$1");
});

	$routes->group("tags", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
		// welcome page - URL: /client
		$routes->post("addtags", "Tags::addContactTags");
		$routes->get("get-tags", "Tags::getAllTags");
		$routes->post("update-tags/(:num)", "Tags::updateContactsTags/$1");
		$routes->delete("delete-tags/(:num)", "Tags::deleteContactsTags/$1");
		$routes->get("getTag/(:num)", "Tags::getTagById/$1");
		$routes->get("getContactsTag", "Tags::getContactsTag");
		$routes->get("get-tags-contactid/(:num)", "Tags::getAllTagsByContactId/$1");
		
		});

		$routes->group("calendar", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
			// welcome page - URL: /client
				$routes->get("calendar-event", "Calendar::calendarEvent");
			});

			$routes->group("task", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
				// welcome page - URL: /client
				$routes->post("addtask", "Task::addTask");
				$routes->get("get-task", "Task::getAllTask");
				$routes->get("calendar-event", "Task::getCalendarTask");
				$routes->delete("delete-task/(:num)", "Task::deleteTask/$1");
				
				});	
		
		$routes->group("emailProperty", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
			// welcome page - URL: /client
			$routes->post("email-property-alert", "EmailPropertyAlert::addEmailPropertyAlert");
	
			});	

			$routes->group("themes", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
				// welcome page - URL: /client
				$routes->post("userthemes-info", "ThemesController::addUserThemeInfo");
				$routes->get("themes-userid", "ThemesController::getThemeUserId");
				$routes->post("select-theme-page", "ThemesController::addThemeSelectPage");
				
				});	

				$routes->group("profile", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
					// welcome page - URL: /client
					$routes->post("add-profile", "Profile::addProfile");
					$routes->get("get-profile/(:num)", "Profile::getAllProfile/$1");
					$routes->post("update-profile/(:num)", "Profile::updateProfile/$1");
				});
				
				$routes->group("idx", ["namespace" => "\Modules\Client\Controllers"], function ($routes) {
					// welcome page - URL: /client
					$routes->post("add-membership", "Membership::addMembership");
				});