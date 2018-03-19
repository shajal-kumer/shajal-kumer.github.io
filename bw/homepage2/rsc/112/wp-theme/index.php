<?php
/*
 * Theme Name: tulsa
 * Template Name: Default for WP Stuff
 */

// ahq-get-globals positioned here because we need access to wp's get vars
require_once($boot['dirPrefix'].$siteDir_CustInc.'/ahq-get-globals.php');
?>
<?php get_header();?>

		<h1>Theme index.php</h1>
		<?php // Copied from J17: ?>
		<div class="blog-post-area">
			<div class="container">
				<div class="row">
					<div class="col-md-10 col-sm-12 col-md-offset-1 text-center">
						<div class="history-check-content">
							<div class="section-title section-border">
                            <?php if (have_posts() ) : while (have_posts() ) : the_post(); ?>
       							<!--<h1><?php the_title(); ?></h1>-->
							</div>
							<?php the_content(); endwhile; wp_reset_postdata();  else : ?>
    							<p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
							<?php endif; ?>

						</div>
					</div>
				</div>
			</div>
		</div>


<?php get_footer();?>