<?php
/*
 * Theme Name: tulsa
 * Template Name: Home Page
 */

require_once($boot['dirPrefix'].$siteDir_CustInc.'/ahq-get-globals.php');
get_header();

?>
        <!-- #ahq_banner starts -->
        <div id="ahq_banner" class="banner-area">
        	
			<div class="owl-carousel homepage-slides-wrap">
				<?php while($row_rsSlider = mysql_fetch_assoc($rsSlider)) { ?>
				<div class="single-slider slider-bg-<?php echo $row_rsSlider['ID'];?>" style="background-image:url(/img/slider/<?php echo $row_rsSlider['imgD'];?>)">
                     <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="slide-text">
                                    <h2><?php echo $row_rsSlider['headline'];?></h2>
									<p><?php echo $row_rsSlider['message'];?></p>
                                    <a href="<?php echo $row_rsSlider['link'];?>" class="boxed-btn">More</a>
                                </div>
                            </div>
                        </div>
                    </div>
	            </div>
				<?php 
				} 
				mysql_data_Seek($rsSlider, 0);
				?>
	        </div>

			<script>
			// Homepage Slider images below < 767 viewports
			//jQuery(document).ready(function($){
				if($(window).width() < 750) {
					<?php while($row_rsSlider = mysql_fetch_assoc($rsSlider)) { ?>
					var sliderBg =  $('.slider-bg-<?php echo $row_rsSlider['ID'];?>');
					sliderBg.css('background-image', 'url(/img/slider/<?php echo $row_rsSlider['imgM'];?>)');
					<?php } ?>
				}
			//);
			</script>
			
			<!-- #ahq_search starts -->
			<div id="ahq_search" class="search-box-area d-none d-lg-block d-xl-block">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<ul class="nav tab-list">
								<li>
									<a class="active" href="#" >Find a Car <i class="fa fa-angle-right"></i></a>
								</li>
								<li>
									<a href="/<?php echo $sysM_seo['usedCarSlug'];?>/">Advanced Search <i class="fa fa-angle-right"></i></a>
								</li>
							</ul>
							<div class="tab-content">
								<div class="search-box-wrap d-flex">
									<div class="search-content-left">
										<div class="search-dropdown margin-btm40 d-flex">
										   <div class="single-dropdown-item">

												<select id="make" class="brand" name="make" onChange="changeMake()">
													<option>Make</option>
													<?php while($row_rsMake = mysql_fetch_assoc($rsMake)) { ?>
														<option value="<?php echo $row_rsMake['make'];?>"><?php echo $row_rsMake['make'];?> (<?php echo $row_rsMake['count'];?>)</option>
														<?php
													}
													mysql_data_seek($rsMake, 0);
													?>
												</select>
											   
											   
											   
										   </div> 
										   <div class="single-dropdown-item">
											   
												<div id="modelCont">
													<div class="model">
														<select id="model" name="model">
															<option>Model</option>
														</select>
													</div>
												</div>
											   
										   </div> 
										</div>
										<div class="search-dropdown d-flex">
										   <div class="single-dropdown-item">
											   
											   
											   <select class="type" name="" id="bodyType">
												   <option value="">Body Type</option>
												<?php 
												while($row_rsBody = mysql_fetch_assoc($rsBody)) { 
													?>
													<option value="<?php echo $row_rsBody['bodyType'];?>"><?php echo $row_rsBody['bodyTypeText'];?></option>
													<?php
												} 
												mysql_data_Seek($rsBody, 0);
												?>
												</select>
											   
										   </div> 
										   <div class="single-dropdown-item">
												<select class="max-age" name="" id="maxAge">
												   <option value="">Max Age</option>
												   
												   <?php for($i=$ahqGlobal['minAge']; $i<=$ahqGlobal['maxAge']; $i++) { ?>
												   <option value="<?php echo $i;?>"><?php echo $i;?> years</option>
												   <?php } ?>
												   
											   </select>
										   </div> 
										</div>
									</div>
									<div class="search-content-right">
										<div class="payment-method">
											
											<?php if($sysM_codeweavers['mode']=='F') { ?>
											<div class="cash-price-text inlined-text">
												<p>Cash Price</p>
											</div>
											<div class="switch-btn inlined-text">
												<label class="switch">
													<input type="checkbox" id="cashMonthly">
													<div class="slider round"></div>
												</label>
											</div>
											<div class="monthly-payment-text inlined-text">
												<p>Monthly Payments</p>
											</div>
											<?php } else { ?>
											<div class="cash-price-text inlined-text"><p>&nbsp;</p></div>
											<div class="switch-btn inlined-text"><label class="switch"></label></div>
											<div class="monthly-payment-text inlined-text"><p><strong>Search by Price</strong></p></div>
											<?php } ?>
											
										</div>
										<div class="range-slider-wrap">
											<div class="single-selection-item ">
												
												<div class="range-slider" id="priceSlider">
													
													<input id="range_price">
													
													<div class="domVars" id="min-price"><?php echo $ahqGlobal['lowestPrice'];?></div>
													<div class="domVars" id="max-price"><?php echo $ahqGlobal['highestPrice'];?></div>
													
												</div>
												
												<div class="range-slider" id="budgetSlider">
													
													<input id="range_budget">
													
													<div class="domVars" id="min-budget">0</div>
													<div class="domVars" id="max-budget"><?php echo $sysM_codeweavers['defaultBudget'];?></div>
													
													
												</div>
												
												
												
											</div>
											<div class="single-selection-item">
												<div class="makeanimated">
													<button type="submit" onClick="submitCarSearch('<?php echo "used-cars"; //echo $sysM_seo['usedCarSlug'];?>', '<?php echo $_SESSION['clientID'];?>', '<?php echo trim($sysM_seo['urlStructure']);?>', '<?php echo trim($sysM_seo['usedCarSlug']);?>')" class="submit-btn" >View All Cars <i class="fa fa-search"></i></button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- #ahq_search ends -->

        </div>
        <!-- #ahq_banner ends -->
		
		
		
		<?php 
		#########################################
		# Dynamically rendered content for homepage
		#########################################
		
		// Load class for home page content and also values for layout switches
		if($clean['page']=='index') {
			
			$sysB_layoutSwitchHome = paramGroup($control['dbPrefix'].$boot['siteNum'].'.param', 'layoutSwitchHome', $connBasket2006);
			require($siteDir_CustElem.'/HomeSections.php');
			
			if(sizeof($sysB_layoutSwitchHome)>0) {
				reset($sysB_layoutSwitchHome);
				$first = true;
				$prevType = 'n';
				while( $element = each($sysB_layoutSwitchHome) ) {
					
					//echo $element['key'].'='.$element['value']."<br>";
					
					####################################################################################################
					// Params are defined as 'visibility-color-type' [h/v]-[g/w]-[y/n/t]
					// 'type' can be y=with tongue, n= no tongue, or 't'=topper - Toppers are used for make and bodyType  
					// The 'type' of the previous section defined the top margin for the next
					####################################################################################################
					
					$params = explode('-', $element['value']); 
					
					$methodName = $element['key'];
					
					// Exclude hidden sections & also finance section if finance not offered
					if($params[0]!='h' && ($element['key']!='finance' || ($element['key']=='finance' && $sysM_codeweavers['mode']!='N'))) { 
						HomeSections::$methodName($params[1], $params[2], $first, $prevType);
						$first = false;
						$prevType = $params[2];
					}
					
				}
			}
			
		
		}
		
		?>
		
		
		
		
<?php get_footer();?>