<?php
/*
 * Theme Name: tulsa
 */
 
 
//header.php is called from a function so vars defined outside will not be in scope
global $boot, $siteDir_Class, $siteDir_Inc, $ahqGlobal, $clean, $CarBrowsePage, $control, $connBasket2006, $global_RecallSearch, $ahqPageTitle, $ahqMetaDesc, $PageContent,
       $row_rs, $rsMake, $sysB_client, $sysM_seo, $sysM_motor, $sysM_seo, $sysB_social, $sysB_liveChat, $rsFeature, $rsBody, $siteDir_CustElem, $TopMenu, $sysB_siteConfig;

//global $tmp_MaxVal, $tmp_MinVal;


// Get Page Content and SEO Meta data:
require_once($siteDir_Class."/PageContent.php");

if($clean['page']=='car-ad' && $row_rs['financePrice']==0)
    $tmp_Condition = 'no-finance';
else if($clean['page']=='car-ad' && $row_rs['financePrice']>0)
    $tmp_Condition = 'finance';
else
    $tmp_Condition = '';

$PageContent = PageContent::getContent($connBasket2006, $clean['page'], $tmp_Condition, $row_rs);



if($boot['system']=='ahqWebsite')
    require_once($siteDir_Inc."/read-vars-ahq.php");
else
    require_once($siteDir_Inc."/read-vars.php");


// Now that we have created cookies, and session ID (in read-vars.php), lets detect if this is a bot.  SO if $ahqGlobal['pagesThisSession']<=1  its a bot!
/*
require_once($siteDir_Class."/session.php"); 
$ahqGlobal['pagesThisSession'] = session::pagesThisSession($_SESSION['sessionID']);
*/


/*
// Get the Page url for all the meta / og tags
if(isset($CarBrowsePage) && isset($clean['page']) && ($clean['page']=='car-browse'))
    $tmp_CurrentUrl = $CarBrowsePage->Canonical($clean);
else
    $tmp_CurrentUrl = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

*/

// Calc starting values for price slider
$tmpPad = 0; // 0.20;  Allows you to se the pricng at values other then extremities
$tmp_MinVal = (floor(($ahqGlobal['lowestPrice'] + ($ahqGlobal['highestPrice']-$ahqGlobal['lowestPrice'])*$tmpPad)/1000)*1000) ;
//$tmp_MaxVal = round(($ahqGlobal['highestPrice'] - ($ahqGlobal['highestPrice']-$ahqGlobal['lowestPrice'])*$tmpPad),-4) ;
$tmp_MaxVal = $ahqGlobal['highestPrice'];



function get_first_paragraph(){
	global $post;
	
	$str = wpautop( get_the_content() );
	$str = substr( $str, 0, strpos( $str, '</p>' ) + 4 );
	$str = strip_tags($str, '<a><strong><em>');
	return '<p>' . $str . '</p>';
} 



if(isset($post) && get_the_title($post->ID)!='AHQ Pages' && get_the_title($post->ID)!='Home Page') {
	
	// WP Posts
	$tmp_Title = get_the_title($post->ID);  
	$tmp_MetaDesc = get_the_excerpt($post->ID);
	
}
else if( (isset($PageContent) && sizeof($PageContent)>1)  ) {  // If the only items is the fin Disclosure

	//|| (sizeof($PageContent)==1 && !isset($PageContent['finDisclose']))
	
	// AHQ Page with PageContent data in the DB
	$tmp_Title = $PageContent['title']; 
	$tmp_MetaDesc = $PageContent['metaDesc']; 
	
}
else {
	
	// AHQ Page with old style hard-coded titles and metas (or its the browse page)
	if(isset($ahqPageTitle))
		$tmp_Title = $ahqPageTitle; 
	else
		$tmp_Title = $boot['client']['clientName']; // All else has failed!
	
	if(isset($ahqMetaDesc))
		$tmp_MetaDesc = $ahqMetaDesc; 
}


// Prepare Google Map Url
$tmp_MapPlace = urlencode($ahqGlobal['tradingName'].' '.$ahqGlobal['town'].' '.$ahqGlobal['county'].' '.$ahqGlobal['postCode']);
$tmp_MapPlace = preg_replace('!\s+!', ' ', $tmp_MapPlace);

?>
<!DOCTYPE html>
<html lang="en">
    
	<!-- AHQ Build <?php echo $control['buildID'];?> - Client ID <?php echo $control['clientID'];?> -->
	
	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

		<title><?php echo $tmp_Title; ?></title>
		<?php if(isset($tmp_MetaDesc)) { ?>
			<meta name="description" content="<?php echo $tmp_MetaDesc ?>"/>
		<?php } ?>
		
		<?php /* <link rel="canonical" href="<?php echo $CarBrowsePage->Canonical($clean);?>" />*/?>
		
		
		
		<meta property="og:locale" content="en_GB" />
		<meta property="og:title" content="<?php if(isset($PageContent['title'])) echo $PageContent['title']; else echo $boot['client']['clientName'];?>" />
		
		<?php if(isset($PageContent['metaDesc'])) { ?>
	<meta property="og:description" content="<?php echo $PageContent['metaDesc'];?>" />
		<?php } ?>
		
		<meta property="og:url" content="<?php echo $tmp_CurrentUrl;?>" />
		<?php if(isset($clean['page']) && $clean['page']=='car-ad') { ?>
	<meta property="og:type" content="article" />	
		<meta property="og:image" content="<?php echo $sysB_client['url'].imagePath().$tmp_PrimaryPicName;?>"/> <?php // imagePath() is defined in car-ad-load.php ?>
		<?php } else { ?>
	<meta property="og:type" content="website" />		
		<?php } ?>
		<meta property="og:site_name" content="<?php echo $ahqGlobal['tradingName'];?>" />
		
		<meta name="twitter:card" content="summary"/>
		<?php if(isset($PageContent['metaDesc']) && $PageContent['metaDesc']!='') { ?>
	<meta name="twitter:description" content="<?php echo $PageContent['metaDesc'];?>"/>
		<?php } ?>
		<meta name="twitter:title" content="<?php if(isset($PageContent['title'])) echo $PageContent['title']; else echo $boot['client']['clientName'];?>"/>
		<meta name="twitter:domain" content="<?php echo $sysB_client['url'];?>"/>
		
		
        
        <!--Libraries-->
        <link href="<?php echo resourceUrl('css');?>bootstrap.min.css" rel="stylesheet">
        <link href="/css/font-awesome.min.css" rel="stylesheet">

        <!--Plugins-->
        <link href="<?php echo resourceUrl('css');?>owl.carousel.min.css" rel="stylesheet">
        
        <link href="<?php echo resourceUrl('css');?>magnific-popup.css" rel="stylesheet">
        <link href="<?php echo resourceUrl('css');?>ion.rangeSlider.skinModern.css" rel="stylesheet">

        <link href="<?php echo resourceUrl('css');?>default.css" rel="stylesheet">
        <link href="<?php echo resourceUrl('css');?>tulsa-core.css?v=3" rel="stylesheet">
		<link href="<?php echo resourceUrl('css');?>bg.css" rel="stylesheet">
		<link href="<?php echo resourceUrl('css', 'c');?>client-core.css" rel="stylesheet">
		<link href="<?php echo resourceUrl('css');?>responsive-core.css" rel="stylesheet">
		

        <?php if(isset($clean['page']) && $clean['page']=='index') { ?>
			
			<link href="<?php echo resourceUrl('css');?>tulsa-home.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css');?>responsive-home.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css', 'c');?>client-home.css" rel="stylesheet">
		<?php } else if(isset($clean['page']) && $clean['page']=='car-browse') { ?>
			<link href="<?php echo resourceUrl('css');?>tulsa-listing.css?v=2" rel="stylesheet">
			<link href="<?php echo resourceUrl('css');?>responsive-listing.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css', 'c');?>client-listing.css" rel="stylesheet">
		<?php } else if(isset($clean['page']) && $clean['page']=='car-ad') { ?>
			<link href="<?php echo resourceUrl('css');?>slick.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css');?>tulsa-car-details.css?v=2" rel="stylesheet">
			<link href="<?php echo resourceUrl('css');?>responsive-car-details.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css', 'c');?>client-car-details.css" rel="stylesheet">
		<?php } else if(isset($clean['page']) && $clean['page']=='contact') { ?>
			<link href="<?php echo resourceUrl('css');?>tulsa-contact.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css');?>responsive-contact.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css', 'c');?>client-contact.css" rel="stylesheet">
		<?php } else if(isset($clean['page']) && $clean['page']=='finance') { ?>
			<link href="<?php echo resourceUrl('css');?>tulsa-finance.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css');?>responsive-finance.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css', 'c');?>client-finance.css" rel="stylesheet">
		<?php } else if(isset($clean['page']) && $clean['page']=='part-ex') { ?>
			<link href="<?php echo resourceUrl('css');?>tulsa-sell-your-car.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css');?>responsive-sell-your-car.css" rel="stylesheet">
			<link href="<?php echo resourceUrl('css', 'c');?>client-sell-your-car.css" rel="stylesheet">
		<?php } ?>
        

		<?php if($sysB_siteConfig['favicon']=='Y') { ?>
		
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/site.webmanifest">
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="theme-color" content="#ffffff">		
		
		<?php } ?>
		
		
        <script src="<?php echo resourceUrl('js');?>jquery-1.12.4.min.js"></script>
		
        <!--[if lt IE 9]>
        <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
		
		<?php // Mobile Menu ?>
		<!-- .off-canvas-menu starts -->
        <div class="off-canvas-menu">
            <span class="menu-close"><i class="fa fa-close"></i></span>
			
            <div class="menulogo">
                <a href="/">
					<?php if($_SESSION['clientID']==1073) { ?>
					<img src="https://apps.autohq.co.uk/clients/1073-66NA/images/logo01.png">
					<?php } else if($_SESSION['clientID']==1072) { ?>
					<img src="https://apps.autohq.co.uk/clients/1072-78JK/images/logo02.png">
					<?php } else { ?>
					<img src="<?php echo "https://".$control['clientDomain']."/clients/".$_SESSION['clientID']."-".$_SESSION['clientKey']."/images/logo01.png?v=5";?>" alt="">
					<?php } ?>
				</a>
            </div>
			
			<?php /*
            <div class="mobile-search-box">
                <input type="text" placeholder="Car Search...">
                <button type="submit" value="submit"><i class="fa fa-search"></i></button>
            </div>
			*/?>

			<?php $TopMenu->Show(); ?>

            <div class="megamenu-bottom">
                <p><a href="#"><?php echo $ahqGlobal['openHours'];?></a></p>

                <div class="megamenu-social-icons">
					<?php
					if(sizeof($sysB_social)>0) {
						reset($sysB_social);
						$count = 0;
						while( $element = each($sysB_social) ) {
							?>
							<a href="<?php echo $element['value'];?>"><i class="fa fa-<?php echo $element['key'];?>"></i></a>
							<?php
							$count++;
							if($count>=4)
								break;
						}
					}
					?>
                </div>
            </div>
        </div>
        <!-- .off-canvas-menu ends // Mobile Menu -->
        
        <?php // Blacks out the background while mobile menu appears ?>
		<div class="off-canvas-overlay"></div>
		
		<?php //Floating Contact Widget ?>
        <div class="chat-box d-none d-none d-lg-block">
            <a href="/contact-us/">
				<i class="fa fa-clock-o"></i> <span>Times</span></a>
            
			<?php if(isset($sysB_liveChat['type']) && $sysB_liveChat['type']!='X') { ?>
			<a href="#" onclick="<?php echo $sysB_liveChat['chatLink'];?>">	
				<i class="fa fa-comment-o "></i> <span>Chat</span></a>
			<?php } ?>	
				
            <a href="https://maps.google.co.uk/maps?q=<?php echo $ahqGlobal['northing'];?>,<?php echo $ahqGlobal['easting'];?>,<?php echo $tmp_MapPlace;?>">
				<i class="fa fa-map-marker"></i> <span>Find Us</span></a>
        </div>
		

        <!-- #ahq_header starts -->
        <div id="ahq_header" class="header-top-area">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="header-top d-flex justify-content-sm-center justify-content-md-center">
                            
							
                            <div class="single-header-top d-none d-lg-block d-xl-block">
                                <a href="/contact-us/">
									<i class="fa fa-clock-o" aria-hidden="true"></i> 
									<?php echo $ahqGlobal['openHours'];?>
								</a>
                            </div> 
                            
							
							<div class="single-header-top <?php if(!isset($sysB_liveChat['type']) || $sysB_liveChat['type']=='X') { ?>d-lg-none<?php } ?>">
							<?php // Live Chat
							if(isset($sysB_liveChat['type']) && $sysB_liveChat['type']!='X') { 
							?>
								<a href="#" onclick="<?php echo $sysB_liveChat['chatLink'];?>"><i class="fa fa-comment-o "></i> Live Chat</a>
							<?php } else { ?>
								&nbsp;
							<?php } ?>
                            </div> 
                            
							
							<div class="single-header-top d-none d-lg-block d-xl-block">
								<a href="https://maps.google.co.uk/maps?q=<?php echo $ahqGlobal['northing'];?>,<?php echo $ahqGlobal['easting'];?>,<?php echo $tmp_MapPlace;?>">
								<i class="fa fa-map-marker"></i> Find Us</a>
                            </div> 
							
                            <div class="single-header-top d-none d-lg-block d-xl-block">
                                
								<i class="fa fa-phone"></i>&nbsp;
								
								<?php if(isset($ahqGlobal['phoneLabel']) && $ahqGlobal['phoneLabel']!='') echo $ahqGlobal['phoneLabel'].':'; ?>
								<a href="/contact-us/">
									<?php echo $ahqGlobal['phone'];?>
								</a>
								
								<?php if(isset($ahqGlobal['phoneLabel2']) && $ahqGlobal['phoneLabel2']!='') echo ' - '.$ahqGlobal['phoneLabel2'].':'; ?>
								<a href="tel:<?php echo $ahqGlobal['phone2'];?>">
									<?php echo $ahqGlobal['phone2'];?>
								</a>
								
								
                            </div>    
							
							<div class="single-header-top header-social-icons d-none d-lg-block d-xl-block">
								<?php
								if(sizeof($sysB_social)>0) {
									reset($sysB_social);
									$count = 0;
									while( $element = each($sysB_social) ) {
										?>
										<a href="<?php echo $element['value'];?>"><i class="fa fa-<?php echo $element['key'];?>"></i></a>
										<?php
										$count++;
										if($count>=4)
											break;
									}
								}
								?>
                            </div> 
							
							
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- #ahq_header ends -->

        <!-- #ahq_nav starts -->
        <div id="ahq_nav" class="header-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 wid45">
                        <div class="header-left h-100">
                            <div class="logo d-flex justify-content-center">
                                <a href="/">
								
									<?php if($_SESSION['clientID']==1073) { ?>
									<img src="https://apps.autohq.co.uk/clients/1073-66NA/images/logo01.png">
									<?php } else if($_SESSION['clientID']==1072) { ?>
									<img src="https://apps.autohq.co.uk/clients/1072-78JK/images/logo02.png">
									<?php } else { ?>
									<img src="<?php echo "https://".$control['clientDomain']."/clients/".$_SESSION['clientID']."-".$_SESSION['clientKey']."/images/logo01.png?v=5";?>" alt="">
									<?php } ?>								
								
								</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 wid55">
                        <div class="mainmenu d-none d-lg-block d-xl-block">
                        <?php $TopMenu->Show();?>
                        </div>
    
                        <!-- 
                        Phone and Map icons visible on small devices, hidden on large devices
                         -->
                        <div class="icons-small-devices d-none">
                            <a href="https://maps.google.co.uk/maps?q=<?php echo $ahqGlobal['northing'];?>,<?php echo $ahqGlobal['easting'];?>,<?php echo $tmp_MapPlace;?>">
								<i class="fa fa-map-marker"></i>
							</a>
                            <a href="tel:<?php echo str_replace(' ', '', $ahqGlobal['phone']);?>"><i class="fa fa-phone"></i></a>
                        </div>
                        <a href="#" class="menu-trigger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- #ahq_nav ends -->
