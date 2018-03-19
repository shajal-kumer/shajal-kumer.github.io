<?php
if ( function_exists( 'add_theme_support' ) ) { 
		  add_theme_support( 'post-thumbnails' );	
     add_image_size( 'popular-thumbnail', 110, 80, array( 'center', 'center' ) );
       add_image_size( 'recent-thumbnail', 94, 71, array( 'center', 'center' ) );
      add_image_size( 'home-blog-thumbnail', 354, 251, array( 'center', 'center' ) );
}
add_filter('widget_text','do_shortcode');
function register_my_menus() {
  register_nav_menus(
   array('main_menu' => __( 'Main Menu' ),'footer_menu' => __( 'Footer Menu' ))
   );
}
add_action( 'init', 'register_my_menus' );
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}

	

#### Start Custom AutoHQ Code ####

session_start();

echo "<!-- ".str_replace("public_html", "", $_SERVER['DOCUMENT_ROOT']).'ahq-site-config.php'." -->";

include(str_replace("public_html", "", $_SERVER['DOCUMENT_ROOT']).'ahq-site-config.php');


// AHQ include files - Ignore this if we are in wp-admin
if(!strstr($_SERVER["PHP_SELF"], 'wp-admin')) {

	// AHQ Include files
	$siteCommonPath = $boot['homeDir']."/3common/".$boot['pBuild'];
	include($siteCommonPath."/control.php");

	include($boot['dirPrefix'].$siteDir_Inc.'/run-first-master1.php');
	#include($boot['dirPrefix'].$siteDir_CustInc.'/run-first-'.$boot['siteNum'].'.php');
	include($boot['dirPrefix'].$siteDir_Inc.'/run-first-master2.php');

	require_once($siteDir_Lib."/scrub.php");
	include($boot['dirPrefix'].$siteDir_Inc.'/debug.php');

	include($boot['dirPrefix'].$siteDir_Inc.'/login-check.php');

	require_once($siteDir_Inc.'/garage-url-funcs.php');

}


// Global Vars Required from DB

// URL Re-write code:
add_rewrite_tag('%ahqPage%','([^/]*)');
add_rewrite_tag('%sku%','([^/]*)'); 
add_rewrite_tag('%branchID%','([^/]*)'); 
add_rewrite_tag('%branchName%','([^/]*)'); 
add_rewrite_tag('%make%','([^/]*)'); 
add_rewrite_tag('%model%','([^/]*)'); 
add_rewrite_tag('%body-type%','([^/]*)'); 
add_rewrite_tag('%fuel-type%','([^/]*)'); 
add_rewrite_tag('%transmission%','([^/]*)');
add_rewrite_tag('%status%','([^/]*)');
add_rewrite_tag('%prestige%','([^/]*)');

add_rewrite_tag('%option%','([^/]*)'); 
add_rewrite_tag('%pageNum%','([^/]*)'); 

add_rewrite_tag('%pattern%','([^/]*)'); 





/* Successful URL Redirection:
 * Make sure all URL variables are registered using the add_rewrite_tag() method
 * Only use single quotes to declare strings
 * Don't try and concatonate the strings using a period
 * Don't use a variable for page_id
 *
 */
 
 
echo "<!-- URL Structure: ".$boot['urlStructure']." -->"; 


function custom_rewrite_ahq() {
	
	global $boot;
	switch($boot['urlStructure']) {

		case 3:
		// Tulsa Default
		
		
		// Car Ad
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)V([0-9]+)?', 'index.php?page_id=7&ahqPage=car-ad&sku=$matches[3]&pattern=10', 'top');
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)U([0-9]+)?', 'index.php?page_id=7&ahqPage=car-ad&sku=$matches[3]&pattern=9', 'top');
		
		// Body Type Pages
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/body-type/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&body-type=$matches[2]&pageNum=$matches[3]&pattern=8', 'top');
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/body-type/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&body-type=$matches[2]&pattern=7', 'top');
		
		
		// Car Make Pages (with paging)
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&pageNum=$matches[3]&pattern=4', 'top');
		
		// Make & Model Pages
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&model=$matches[3]&pageNum=$matches[3]&pattern=6', 'top');
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&model=$matches[3]&pattern=5', 'top');
		

		// Browse pages (with paging)
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&pageNum=$matches[2]&pattern=2', 'top');


		// Car Make Pages
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&pattern=3', 'top');
		
		// Browse page
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/?', 'index.php?page_id=7&ahqPage=car-browse&pattern=1', 'top');
		
		
		// Static Pages
		add_rewrite_rule('^car-finance/?', 'index.php?page_id=7&ahqPage=finance', 'top');
		add_rewrite_rule('^part-exchange-car/?', 'index.php?page_id=7&ahqPage=part-ex', 'top');
		add_rewrite_rule('^contact-us/?', 'index.php?page_id=7&ahqPage=contact', 'top');
		add_rewrite_rule('^about-us/?', 'index.php?page_id=7&ahqPage=about-us', 'top');
		add_rewrite_rule('^cookie-policy/?', 'index.php?page_id=7&ahqPage=cookie-policy', 'top');
		add_rewrite_rule('^privacy-policy/?', 'index.php?page_id=7&ahqPage=privacy-policy', 'top');
		
		add_rewrite_rule('^car-servicing-([A-Za-z0-9-]+)/?', 'index.php?page_id=7&ahqPage=servicing', 'top');
		
		
		break;
	
	
		case 2:
		
		// Type 2 - J17 Style
		
		// Make pages Prestige
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/browse/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[1]&pageNum=$matches[2]', 'top');
		add_rewrite_rule('^used-([A-Za-z0-9-]+)/browse?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[1]', 'top');
		
		// test URL
		add_rewrite_rule('^listing?', 'index.php?page_id=7&ahqPage=listing', 'top');
		
		
		// Make Pages Towns
		add_rewrite_rule('^([A-Za-z0-9-]+)-([A-Za-z0-9-]+)/browse/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[1]&branchName=$matches[2]&pageNum=$matches[3]', 'top');
		add_rewrite_rule('^([A-Za-z0-9-]+)-([A-Za-z0-9-]+)/browse?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[1]&branchName=$matches[2]', 'top');
		
		
		
		// Make & Model pages
		add_rewrite_rule('^([A-Za-z0-9-]+)-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/browse/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[1]&branchName=$matches[2]&model=$matches[3]&pageNum=$matches[4]', 'top');
		add_rewrite_rule('^([A-Za-z0-9-]+)-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/browse?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[1]&branchName=$matches[2]&model=$matches[3]', 'top');
		
		
		// Body Type Pages
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/body-type/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&branchName=$matches[1]&body-type=$matches[2]&pageNum=$matches[3]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/body-type/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&branchName=$matches[1]&body-type=$matches[2]', 'top');
			
		// Car Ads
		add_rewrite_rule('^([a-z0-9-]+)-([a-z0-9-]+)/([a-z0-9-]+)-U([0-9]+)?', 'index.php?page_id=7&ahqPage=car-ad&sku=$matches[4]', 'top');
		add_rewrite_rule('^([a-z0-9-]+)-([a-z0-9-]+)/([a-z0-9-]+)-V([0-9]+)?', 'index.php?page_id=7&ahqPage=car-ad&sku=$matches[4]', 'top');
		//add_rewrite_rule('^([A-Za-z0-9-]+)-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)-sku([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-ad&sku=$matches[4]', 'top');

		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&pageNum=$matches[2]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/?', 'index.php?page_id=7&ahqPage=car-browse', 'top');
		

		// Prestige
		add_rewrite_rule('^prestige-cars/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&status=P&pageNum=$matches[1]', 'top');
		add_rewrite_rule('^prestige-cars?', 'index.php?page_id=7&ahqPage=car-browse&status=P', 'top');

		break;
		
		
		case 1:

		// Type 1 - Walters Style
		
		// Car Search
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/search/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&pageNum=$matches[3]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/search/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]', 'top');
		
		
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/make/([A-Za-z0-9-]+)/model/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&model=$matches[3]&pageNum=$matches[4]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/make/([A-Za-z0-9-]+)/model/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&model=$matches[3]', 'top');

		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/make/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]&pageNum=$matches[3]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/make/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&make=$matches[2]', 'top');
		
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/body-type/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&body-type=$matches[2]&pageNum=$matches[3]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/body-type/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&body-type=$matches[2]', 'top');
		
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/fuel-type/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&fuel-type=$matches[2]&pageNum=$matches[3]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/fuel-type/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&fuel-type=$matches[2]', 'top');
		
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/transmission/([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&transmission=$matches[2]&pageNum=$matches[3]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/transmission/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&transmission=$matches[2]', 'top');

		// Car Browse
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/browse/clear?', 'index.php?page_id=7&ahqPage=car-browse&force=y', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/browse/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&pageNum=$matches[2]', 'top');
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/browse?', 'index.php?page_id=7&ahqPage=car-browse', 'top');
		
		// Finance Browse
		add_rewrite_rule('^([A-Za-z0-9-]+)/finance/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&option=finance&pageNum=$matches[2]', 'top');
		add_rewrite_rule('^([A-Za-z0-9-]+)/finance?', 'index.php?page_id=7&ahqPage=car-browse&option=finance', 'top');
		
		
		// Clearance Page
		add_rewrite_rule('^cheap-cars-([A-Za-z0-9-]+)/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&status=C&pageNum=$matches[2]', 'top');
		add_rewrite_rule('^cheap-cars-([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-browse&status=C', 'top');
		
		// Prestige Page
		add_rewrite_rule('^prestige-cars/page([0-9]+)?', 'index.php?page_id=7&ahqPage=car-browse&status=P&pageNum=$matches[1]', 'top');
		add_rewrite_rule('^prestige-cars?', 'index.php?page_id=7&ahqPage=car-browse&status=P', 'top');
		
		// Car Ads
		add_rewrite_rule('^used-cars-([A-Za-z0-9-]+)/([A-Za-z0-9-]+)/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-ad&sku=$matches[3]', 'top');
		add_rewrite_rule('^cars/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=car-ad&sku=$matches[1]', 'top');

	

		// Various Pages
		add_rewrite_rule('^reviews/?', 'index.php?page_id=7&ahqPage=reviews', 'top');
		add_rewrite_rule('^car-finance/?', 'index.php?page_id=7&ahqPage=finance', 'top');
		add_rewrite_rule('^contact-us/?', 'index.php?page_id=7&ahqPage=contact', 'top');
		add_rewrite_rule('^mot/?', "index.php?page_id=7&ahqPage=book-an-mot", 'top');
		add_rewrite_rule('^car-insurance/?', 'index.php?page_id=7&ahqPage=insurance', 'top');
		add_rewrite_rule('^why-choose-us/?', 'index.php?page_id=7&ahqPage=about-us', 'top');
		add_rewrite_rule('^part-exchange-car/?', 'index.php?page_id=7&ahqPage=part-ex', 'top');
		add_rewrite_rule('^360-view/([A-Za-z0-9-]+)?', 'index.php?page_id=7&ahqPage=360-view&sku=$matches[1]', 'top');
		add_rewrite_rule('^cookie-policy/?', 'index.php?page_id=7&ahqPage=cookie-policy', 'top');
		add_rewrite_rule('^privacy-policy/?', 'index.php?page_id=7&ahqPage=privacy-policy', 'top');

		add_rewrite_rule('^warranty/?', 'index.php?page_id=7&ahqPage=warranty', 'top');
		add_rewrite_rule('^paint-protection/?', 'index.php?page_id=7&ahqPage=paint-protection', 'top');
		add_rewrite_rule('^tracking/?', 'index.php?page_id=7&ahqPage=tracking', 'top');
		
		
		add_rewrite_rule('^customer-care/?', 'index.php?page_id=7&ahqPage=customer-care', 'top');
		add_rewrite_rule('^aa-inspections/?', 'index.php?page_id=7&ahqPage=aa-inspections', 'top');
	   
		// Checkout
		add_rewrite_rule('^reservation-complete/?', "index.php?page_id=7&ahqPage=reservation-complete", 'top');
		add_rewrite_rule('^reservation-f/?', "index.php?page_id=7&ahqPage=reservation-f", 'top');
		
		break;
		
		
		
		default:
		// WP Admin
		//die('Unrecognised Url Structure');
		break;

	}

}


add_action('init', 'custom_rewrite_ahq');




  
#### End Custom G&B Code ####


#### Featured Image Support:
function mytheme_post_thumbnails() {
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'mytheme_post_thumbnails' );

set_post_thumbnail_size( 73, 73, false );