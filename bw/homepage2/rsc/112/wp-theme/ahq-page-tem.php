<?php
/*
 * @package WordPress
 * @subpackage tulsa
 *
 * Theme Name: tulsa
 * Template Name: AHQ Page
 */



global $clean, $sysB_siteConfig;


 // Pull in Wordpress GET variables
$clean['page'] = get_query_var('ahqPage');
$clean['sku'] = clean(get_query_var('sku'));
$clean['make'] = clean(get_query_var('make'));
$clean['model'] = clean(get_query_var('model'));
$clean['body-type'] = get_query_var('body-type');
$clean['fuel-type'] = get_query_var('fuel-type');
$clean['transmission'] = get_query_var('transmission');
$clean['status'] = get_query_var('status');
$clean['branchName'] = clean(get_query_var('branchName'));
$clean['option'] = get_query_var('option');
$clean['pageNum'] = get_query_var('pageNum');


// ahq-get-globals positioned here because we need access to wp's get vars
require_once($boot['dirPrefix'].$siteDir_CustInc.'/ahq-get-globals.php');


// Search Page Variable Reconstruction 
require_once($siteDir_Class."/session.php"); 
$global_RecallSearch = session::prevPageCarAd($_SESSION['sessionID']);


if($global_RecallSearch) {

	//echo "Back from a car ad - kill the caching: ".basename(__FILE__)." Line ". __LINE__."<br>";

	// Caching suppression 
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

} 



if($boot['system']=='ahqWebsite')
	require_once($siteDir_Inc."/read-vars-ahq.php");
else
	require_once($siteDir_Inc."/read-vars.php");


if(!isset($clean['page']) || $clean['page']=='')
	die('Error: No AHQ Page has been specified');




if(file_exists($siteDir_CustLoad.'/'.$clean['page'].'-load.php'))
  include($boot['dirPrefix'].$siteDir_CustLoad.'/'.$clean['page'].'-load.php');

include($boot['dirPrefix'].$siteDir_Inc.'/run-last.php');

if(!isset($ahqPageTitle))
	$ahqPageTitle = 'PageTitle undefined!';

//echo "Debug: ".basename(__FILE__)." Line ". __LINE__."<br>";
?>

<?php get_header();?>

<!-- Start of AHQ Dynamic Content-->
<?php

//echo "Serving: ".$siteDir_CustPage."/".$clean['page']."-page.php"."<br>";
//echo "SKU: ".$clean['sku']."<br>";
								
if( file_exists($siteDir_CustPage."/".$clean['page']."-page.php"))
    include($siteDir_CustPage."/".$clean['page']."-page.php");
else
    include($siteDir_CustPage."/_page-not-found-page.php");

?>
<!-- End of AHQ Dynamic Content-->

<?php get_footer();?>