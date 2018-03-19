<?php
/*
 * Theme Name: tulsa
 */
 
global $clean, $control, $ahqGlobal, $sysB_client, $sysB_liveChat, $sysM_seo, $sysB_social, $rsSlider, $siteDir_CustElem, $connBasket2006, $FooterMenu, 
	$totalRows_rsBody, $totalRows_rsMake, $sysM_codeweavers, $PageContent, $sysB_siteConfig; 
	
global $financeCalc; // needed for 	car ad page

?>
		<!-- #ahq_footer starts -->
		<div id="ahq_footer">
			<!-- .footer-widget-area starts -->
	        <div class="footer-widget-area">
	            <div class="container">
	                <div class="row no-gutters disflex">
	                    <div class="col-lg-6 ordertwo">
	                    	<div class="footer-widget-left">
	                    		<div class="logo d-flex justify-content-center">
                                    <a href="#"><img src="<?php echo "https//".$control['clientDomain']."/clients/".$_SESSION['clientID']."-".$_SESSION['clientKey']."/images/logo01.png";?>" class="footerLogo" alt=""></a>
                                </div>

		                        <div class="row">
		                            
									<div class="col-lg-6 d-none d-lg-block d-xl-block">
		                                <div class="quick-links">
		                                    <h5>Find Us</h5>
		                                    <div class="address">
		                                        <p><?php echo $sysB_client['brandName'];?></p>
		                                        <p><?php echo $ahqGlobal['address1'];?></p>
												<?php if(isset($ahqGlobal['address2']) && trim($ahqGlobal['address2'])!='') { ?><p><?php echo $ahqGlobal['address2'];?></p><?php } ?>
												<p><?php echo $ahqGlobal['town'];?></p>
												<?php if(isset($ahqGlobal['county']) && trim($ahqGlobal['county'])!='') { ?><p><?php echo $ahqGlobal['county'];?></p><?php } ?>
		                                        <p><?php echo $ahqGlobal['postCode'];?></p>
		                                    </div>
		                                    <div class="quick-contact">
		                                        <a href="tel:<?php echo $ahqGlobal['phone'];?>"><?php echo $ahqGlobal['phone'];?></a>
		                                        <?php /*<a href="mailto:<?php echo $ahqGlobal['email'];?>"><?php echo $ahqGlobal['email'];?></a>*/?>
		                                    </div>
		                                </div>
		                            </div>
									
		                            <div class="col-lg-6 col-sm-6 wid50">
		                                <div class="quick-links">
		                                    <h5>Site Map</h5>
											<?php $FooterMenu->Show(); ?>
		                                </div>
		                            </div>
		                        </div>
	                    	</div>
	                    </div>
	                    <div class="col-lg-6 orderone">
	                        <div class="newsletter-signup">
	                            <h4>Newsletter Sign up</h4>
	                            <p>Receive the latest news and car stock</p>

	                            <div class="signup-form">
                                    <input type="email" id="newsletterEmail" placeholder="Your Email Address">
                                    <button type="submit" onClick="newsletterSubmit()" value="submit"><img src="<?php echo resourceUrl('img');?>g-plus-icon.png" alt=""></button>
	                            </div>
								<div id="signUpResult">&nbsp;</div>
								<div class="clearfix" style="height:0;">&nbsp;</div>
								
								

	                            <div class="widget-social-icons">

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
	        <!-- .footer-widget-area ends -->

	        <!-- .footer-area starts -->
	        <div class="footer-area">
	            <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="footer-text">
								<?php if(!isset($sysB_siteConfig) || $sysB_siteConfig['showRegOffice']!='N') { ?>
								<p>
									Registered Office:
									<?php echo $sysB_client['address1'];?>,
									<?php if($sysB_client['address2']!='') {?><?php echo $sysB_client['address2'];?>,<?php } ?>
									<?php echo $sysB_client['city'];?>,
									<?php if($sysB_client['county']!='') {?><?php echo $sysB_client['county'];?>,<?php } ?>
									<?php echo $sysB_client['postCode'];?>

								</p>
								<?php } ?>
								<p><?php echo cr2br($PageContent['finDisclose']);?></p>
								
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-sm-4 wid40">
                            
							<?php if($sysB_siteConfig['ssl']=='comodo') { ?>
								<img src="<?php echo resourceUrl('img');?>comodo-seal.png">
								<?php /*<script language="JavaScript" type="text/javascript">
								//TrustLogo("https://www.waltersmotorgroup.co.uk/images/comodo-seal.png", "CL1", "none");
								</script>*/?>
							<?php } ?>
							
                        </div>
                        <div class="col-lg-6 col-sm-8 wid60 text-right">
                            <div class="copyright-text">
                                <p>© 2018 Designed &amp; Powered by 
									<?php if($clean['page']=='index') { ?><a href="https://www.autohq.co.uk/car-dealer-websites/" target="_blank"><?php } ?>
										<img src="<?php echo resourceUrl('img');?>autohq.png" alt="Car Dealer Websites">
									<?php if($clean['page']=='index') { ?></a><?php } ?>
								</p>
                            </div>
                        </div>
                    </div>
	            </div>
	        </div>
	        <!-- .footer-area ends -->

            <div class="scroll-top d-none d-lg-block d-xl-block">
                <img src="/img/arrow.png" alt="">
            </div>
		</div>
		<!-- #ahq_footer ends -->



		<!-- Enquiry Modal - Home and Browse only -->
		<div class="modal" id="enqModal" >
			<div class="modal-dialog modal-lg">
				<div class="modal-content" id="modalContent">

				</div >
			</div>
		</div>

		
		<!-- Social Modal - home, listing and car ad -->
		
		<?php if(isset($clean['page']) && ($clean['page']=='index' || $clean['page']=='car-browse' || $clean['page']=='car-ad')) { ?>
		<div id="socialModal" class="modal fade" role="dialog">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Share this Vehicle</h4>
					</div>
					<div class="modal-body" id="socialModalContent">&nbsp;</div>
					<?php /*
					  <div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					  </div>
					  */?>
				</div>

			</div>
		</div>
		<?php } ?>

        

        <!--Libraries-->
        <script src="<?php echo resourceUrl('js');?>popper-1.1.0.min.js"></script>
        <script src="<?php echo resourceUrl('js');?>bootstrap.min.js"></script>       

        <!--Plugins-->
        <script src="<?php echo resourceUrl('js');?>owl.carousel.min.js"></script>
		
		<!-- car ad page only-->
		<script src="<?php echo resourceUrl('js');?>slick.min.js"></script>
        <script src="<?php echo resourceUrl('js');?>jquery.magnific-popup.min.js"></script>
        <script src="<?php echo resourceUrl('js');?>jquery.easing.min.js"></script>
		
		<!-- Listings page only -->
		<script src="<?php echo resourceUrl('js');?>ion.rangeSlider.min.js"></script>
		

		
        <script src="<?php echo resourceUrl('js');?>jquery.magnific-popup.min.js"></script>
        <script src="<?php echo resourceUrl('js');?>ion.rangeSlider.min.js"></script>
		
		<?php // Before calling home.js we need to assign some values for the price slider ?>
		
		<script>
		<?php if(isset($clean['page']) && $clean['page']=='index') { ?>
		
			var lowestPrice = <?php echo $ahqGlobal['lowestPrice'];?>;
			var highestPrice = <?php echo $ahqGlobal['highestPrice'];?>;
			var minBudget = <?php echo $ahqGlobal['minBudget'];?>;
			var maxBudget = <?php echo $ahqGlobal['maxBudget'];?>;
			var defBudget = <?php echo $sysM_codeweavers['defaultBudget'];?>;
			
			//alert('Footer budget values ' + minBudget + ' ' + maxBudget);
			
			var makeQty = <?php echo $totalRows_rsMake;?>;
			var bodyQty = <?php echo $totalRows_rsBody;?>;
		<?php } ?>	
			
		<?php if($clean['page']=='car-ad' && $row_rs['status']!='X' && $sysM_codeweavers['mode']=='F' && $financeCalc['isFinanceable']) { ?>
			$(document).ready(function(){
				loadCodeweavers('financeCalc');
			});
		<?php } ?>
		
		</script>	
		
		
        <?php if(isset($clean['page']) && $clean['page']=='index') { ?><script src="<?php echo resourceUrl('js');?>home.js"></script><?php } ?>
		<?php if(isset($clean['page']) && $clean['page']=='car-browse') { ?><script src="<?php echo resourceUrl('js');?>listing.js"></script><?php } ?>
		
		<?php if(isset($clean['page']) && $clean['page']=='car-ad') { ?><script src="<?php echo resourceUrl('js');?>car-details.js"></script><?php } ?>
		
		<?php if(isset($clean['page']) && $clean['page']=='contact') { ?>
			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDE0htUn_WYrDOQtbglnVitr8WZ3HaUcuU"></script>
			<script src="<?php echo resourceUrl('js');?>contact.js"></script>
		<?php } ?>
		<?php if(isset($clean['page']) && $clean['page']=='finance') { ?><script src="<?php echo resourceUrl('js');?>finance.js"></script><?php } ?>
		<?php if(isset($clean['page']) && $clean['page']=='part-ex') { ?><script src="<?php echo resourceUrl('js');?>sell-your-car.js"></script><?php } ?>
		
		<script src="<?php echo resourceUrl('js');?>tulsa<?php minify();?>.js" type="text/javascript"></script>





		
		
		<?php // Google Maps Script for Contact Page 
			if(isset($clean['page']) && $clean['page']=='contact') {
		?>
		<script>

		jQuery(document).ready(function($){

			var myCenter = new google.maps.LatLng(<?php echo $ahqGlobal['northing'];?>, <?php echo $ahqGlobal['easting'];?>);

			function initialize() {
				var mapProp = {
					center: myCenter,
					scrollwheel: false,
					zoom: 15,
					zoomControl: false,
					mapTypeControl: true,
					streetViewControl: true,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: [
					{elementType: 'geometry', stylers: [{color: '#DFDFDF'}]},
					{elementType: 'labels.text.stroke', stylers: [{color: '#F1F1F1'}]},
					{elementType: 'labels.text.fill', stylers: [{color: '#777777'}]},
					{
					  featureType: 'administrative.locality',
					  elementType: 'labels.text.fill',
					  stylers: [{color: '#838383'}]
					},
					{
					  featureType: 'poi',
					  elementType: 'labels.text.fill',
					  stylers: [{color: '#7C7C7C'}]
					},
					{
					  featureType: 'poi.park',
					  elementType: 'geometry',
					  stylers: [{color: '#C4C4C4'}]
					},
					{
					  featureType: 'poi.park',
					  elementType: 'labels.text.fill',
					  stylers: [{color: '#535353'}]
					},
					{
					  featureType: 'road',
					  elementType: 'geometry',
					  stylers: [{color: '#FFFFFF'}]
					},
					{
					  featureType: 'road',
					  elementType: 'geometry.stroke',
					  stylers: [{color: '#FFFFFF'}]
					},
					{
					  featureType: 'road',
					  elementType: 'labels.text.fill',
					  stylers: [{color: '#757575'}]
					},
					{
					  featureType: 'road.highway',
					  elementType: 'geometry',
					  stylers: [{color: '#D7D7D7'}]
					},
					{
					  featureType: 'road.highway',
					  elementType: 'geometry.stroke',
					  stylers: [{color: '#BCBCBC'}]
					},
					{
					  featureType: 'road.highway',
					  elementType: 'labels.text.fill',
					  stylers: [{color: '#3D3D3D'}]
					},
					{
					  featureType: 'transit',
					  elementType: 'geometry',
					  stylers: [{color: '#C9C9C9'}]
					},
					{
					  featureType: 'transit.station',
					  elementType: 'labels.text.fill',
					  stylers: [{color: '#D1D1D1'}]
					},
					{
					  featureType: 'water',
					  elementType: 'geometry',
					  stylers: [{color: '#D1D1D1'}]
					},
					{
					  featureType: 'water',
					  elementType: 'labels.text.fill',
					  stylers: [{color: '#8D8D8D'}]
					},
					{
					  featureType: 'water',
					  elementType: 'labels.text.stroke',
					  stylers: [{color: '#8D8D8D'}]
					}
				  ]

				};

				var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

				var marker = new google.maps.Marker({
					position: myCenter,
					animation: google.maps.Animation.BOUNCE,
					icon: '/img/map-marker.png'

				});
				marker.setMap(map);

			}

			google.maps.event.addDomListener(window, 'load', initialize);

		});
		
		</script>
		<?php } ?>
		
		<?php // Live Chat JS
		if(isset($sysB_liveChat['type']) && $sysB_liveChat['type']=='V') { ?>
			<script type="text/javascript" src="https://api.visitor.chat/js/vc.min.js" id="vcLoaderScript"></script>
		<?php } 
		
		else if(isset($sysB_liveChat['type']) && $sysB_liveChat['type']=='Z') { ?>
			<script type="text/javascript">
			window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
			d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
			_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
			$.src="https://v2.zopim.com/?<?php echo $sysB_liveChat['zendeskKey'];?>";z.t=+new Date;$.
			type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
			</script>
		<?php } ?>
		
		<?php 
			// Google Analytics 
			if(isset($sysB_siteConfig['googleAnalyticsKey']) && $sysB_siteConfig['googleAnalyticsKey']!='') { 
		?>
		
			<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $sysB_siteConfig['googleAnalyticsKey'];?>"></script>
			<script>
			 window.dataLayer = window.dataLayer || [];
			 function gtag(){dataLayer.push(arguments);}
			 gtag('js', new Date());

			 gtag('config', '<?php echo $sysB_siteConfig['googleAnalyticsKey'];?>');
			</script>		
		
		<?php } else { ?>
			<!-- Google Analtics Code is not defined -->
		<?php } ?>
		
		
    </body>
</html>