<?php

/**
 * WP-Reactivate
 *
 *
 * @package   WP-Reactivate
 * @author    PB
 * @license   GPL-3.0
 * @link      https://goPB.com
 * @copyright 2017 PB (Pty) Ltd
 */

namespace PB\FM\Endpoint;

use PB\FM;
use stdClass;

/**
 * @subpackage REST_Controller
 */
class Flats
{
    /**
     * Instance of this class.
     *
     * @since    0.8.1
     *
     * @var      object
     */
    protected static $instance = null;

    /**
     * Initialize the plugin by setting localization and loading public scripts
     * and styles.
     *
     * @since     0.8.1
     */
    private function __construct()
    {
        $plugin = FM\Plugin::get_instance();
        $this->plugin_slug = $plugin->get_plugin_slug();
    }

    /**
     * Set up WordPress hooks and filters
     *
     * @return void
     */
    public function do_hooks()
    {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Return an instance of this class.
     *
     * @since     0.8.1
     *
     * @return    object    A single instance of this class.
     */
    public static function get_instance()
    {

		// If the single instance hasn't been set, set it now.
        if (null == self::$instance) {
            self::$instance = new self;
            self::$instance->do_hooks();
        }

        return self::$instance;
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {
        $version = '1';
        $namespace = $this->plugin_slug . '/v' . $version;
        $endpoint = '/flats/';

        register_rest_route($namespace, $endpoint, array(
            array(
                'methods' => \WP_REST_Server::READABLE,
                'callback' => array($this, 'get_flats'),
                'permission_callback' => array($this, 'flats_permissions_check'),
                'args' => array(),
            ),
        ));

        register_rest_route($namespace, $endpoint, array(
            array(
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => array($this, 'update_flat'),
                'permission_callback' => array($this, 'flats_permissions_check'),
                'args' => array(),
            ),
        ));

        register_rest_route($namespace, $endpoint, array(
            array(
                'methods' => \WP_REST_Server::DELETABLE,
                'callback' => array($this, 'delete_flat'),
                'permission_callback' => array($this, 'flats_permissions_check'),
                'args' => array(),
            ),
        ));
    }

    /**
     * Get Method
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_flats($request)
    {

        $args = array(
            'post_type' => 'mieszkania',
            'posts_per_page' => 100
        );

        $flats = get_posts($args);

        foreach ($flats as $flat) {

            $x = new stdClass();

            $post_meta = get_post_meta($flat->ID, 'mieszkania_extend', true);

            $flat->flat_meta_fields = $post_meta[0];

        }

        // Don't return false if there is no option
        if (!$flats) {
            return new \WP_REST_Response(array(
                'success' => true,
                'value' => null
            ), 200);
        }

        return new \WP_REST_Response(array(
            'url' => get_home_url(),
            'success' => true,
            'value' => $flats
        ), 200);
    }

    /**
     * Update Method
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_flat($request)
    {

        $flat = $request->get_param('flat');
        $flat_meta_fields = $flat['flat_meta_fields'];

        foreach ($flat_meta_fields as $key => $value) {
            update_post_meta($flat['ID'], $key = $key, $value = $value);
        }

        return new \WP_REST_Response(array(
            'success' => true,
            'value' => $request->get_param('flat')
        ), 200);
    }


    /**
     * Delete Method
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_flat($request)
    {
        $id = $request->get_param('id');

        $post = array(
            'ID' => $id,
            'post_status' => 'draft',
        );

        // Update the post into the database
        wp_update_post($post);

        return new \WP_REST_Response(array(
            'success' => true
        ), 200);
    }


    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function flats_permissions_check($request)
    {
        return current_user_can('manage_options');
    }
}