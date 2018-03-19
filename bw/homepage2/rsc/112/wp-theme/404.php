<?php

// This is needed even on 404 page becuase of header and footer
// ahq-get-globals positioned here because we need access to wp's get vars
require_once($boot['dirPrefix'].$siteDir_CustInc.'/ahq-get-globals.php');


?>


<?php get_header();?>

		<div class="about-page-banner-wrapper">
			<div class="single-inner-page-banner-bg about-banner-bg">
				<div class="container">
					<div class="row">
						<div class="col-md-12"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="blog-post-area">
			<div class="container">
				<div class="row page404">
					<div class="col-md-10 col-sm-12 col-md-offset-1 text-center">
						<div class="history-check-content">
						
							<h2>Page Not Found</h2>



							<p>
								Sorry, but we can't find that page.  Please take a look at one of these popular pages instead:
							</p>

<?php



	if(sizeof($ahqGlobal['branch'])>0) {
		reset($ahqGlobal['branch']);
		$count = 1;
		while( $element = each($ahqGlobal['branch']) ) {
			
			//echo $element['key'].'='.$element['value'].$newLine;
			
			?>
			
				<a href="<?php echo buildAhqUrl('', 'list', $element['key']);?>">Used Cars <?php echo $element['value'];?></a>
				
				<?php if($count<sizeof($ahqGlobal['branch'])) { ?> | <?php } ?>
			
			<?php
			$count++;
		
		}
		
	}


?>							
							
							
						
						</div>
					</div>
				</div>
			</div>
		</div>



<?php get_footer();?>