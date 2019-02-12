<?php

/**
 * WP-Reactivate
 *
 *
 * @package   Reviews Plugin
 * @author    PB
 * @license   GPL-3.0
 * @link      https://patrykbejcer.pl
 * @copyright 2019 PB
 *
 * @wordpress-plugin
 * Plugin Name:       Reviews Plugin
 * Plugin URI:        https://patrykbejcer.pl
 * Description:       Reviews plugin for wordpress.
 * Version:           1.0.2
 * Author:            PB
 * Author URI:        https://patrykbejcer.pl
 * Text Domain:       wp-reactivate
 * License:           GPL-3.0
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 */


namespace PB\RP;

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('WP_REACTIVATE_VERSION', '1.0.2');


/**
 * Autoloader
 *
 * @param string $class The fully-qualified class name.
 * @return void
 *
 *  * @since 1.0.0
 */
spl_autoload_register(function ($class) {

    // project-specific namespace prefix
    $prefix = __NAMESPACE__;

    // base directory for the namespace prefix
    $base_dir = __DIR__ . '/includes/';

    // does the class use the namespace prefix?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // no, move to the next registered autoloader
        return;
    }

    // get the relative class name
    $relative_class = substr($class, $len);

    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // if the file exists, require it
    if (file_exists($file)) {
        require $file;
    }
});

/**
 * Initialize Plugin
 *
 * @since 1.0.0
 */
function init()
{
    $RP = Plugin::get_instance();
    $RP_shortcode = Shortcode::get_instance();
    $RP_cpt = CustomPostType::get_instance();
    $RP_admin = Admin::get_instance();
    $RP_rest = Endpoint\Example::get_instance();
    $RP_rest_reviews = Endpoint\Reviews::get_instance(); // connect our new endpoint
}

add_action('plugins_loaded', 'PB\\RP\\init');


/**
 * Register the widget
 *
 * @since 1.0.0
 */
function widget_init()
{
    return register_widget(new Widget);
}
add_action('widgets_init', 'PB\\RP\\widget_init');

/**
 * Register activation and deactivation hooks
 */
register_activation_hook(__FILE__, array('PB\\RP\\Plugin', 'activate'));
register_deactivation_hook(__FILE__, array('PB\\RP\\Plugin', 'deactivate'));