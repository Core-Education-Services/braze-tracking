<?php
/*
Plugin Name: Core Education Braze Tracking Integration
Description: Injects the Braze tracking script into all pages.
Version: 1.0
Author: Jon Santiago
*/

function add_braze_tracking_script() {
    echo '<script src=""></script>';
}
add_action('wp_footer', 'add_braze_tracking_script');
