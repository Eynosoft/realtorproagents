<?php
session_start();
require_once(APPPATH.'ThirdParty/braintree/vendor/autoload.php');

if(file_exists(__DIR__ . '/../.env')) {
    $dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
    $dotenv->load();
}

//if (!getenv('BT_ENVIRONMENT') || !getenv('BT_MERCHANT_ID') || !getenv('BT_PUBLIC_KEY') || !getenv('BT_PRIVATE_KEY')) {
//    throw new Exception('Cannot find necessary environmental variables. See https://github.com/braintree/braintree_php_example#setup-instructions for instructions');
//}

$gateway = new Braintree\Gateway([
    'environment' => 'sandbox',
    'merchantId' => 'pjkgw7w7zkj59p78',
    'publicKey' => 'ryqqmy32x9dtdmzp',
    'privateKey' => 'e6efdab6146c916e128a4bf8e90d7a1a'
]);

$baseUrl = stripslashes(dirname($_SERVER['SCRIPT_NAME']));
$baseUrl = $baseUrl == '/' ? $baseUrl : $baseUrl . '/';
