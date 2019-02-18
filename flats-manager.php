<?php

/**
 * WP-Reactivate
 *
 *
 * @package   Flats Manager [emoz]
 * @author    PB
 * @license   GPL-3.0
 * @link      https://patrykbejcer.pl
 * @copyright 2019 PB
 *
 * @wordpress-plugin
 * Plugin Name:       Flats Manager [emoz]
 * Plugin URI:        https://patrykbejcer.pl
 * Description:       Flats Manager [emoz].
 * Version:           1.0.2
 * Author:            PB
 * Author URI:        https://patrykbejcer.pl
 * Text Domain:       wp-reactivate
 * License:           GPL-3.0
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 */


namespace PB\FM;

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
    $FM = Plugin::get_instance();
    $FM_admin = Admin::get_instance();
    $FM_rest_flats = Endpoint\Flats::get_instance();
    // $FM_rest = Endpoint\Example::get_instance();
    // $FM_rest_reviews = Endpoint\Reviews::get_instance(); // connect our new endpoint
}

add_action('plugins_loaded', 'PB\\FM\\init');


/**
 * Register activation and deactivation hooks
 */
register_activation_hook(__FILE__, array('PB\\FM\\Plugin', 'activate'));
register_deactivation_hook(__FILE__, array('PB\\FM\\Plugin', 'deactivate'));