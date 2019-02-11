<?php

/**
 * Lumi Reviews
 *
 *
 * @package   Lumi Reviews
 * @author    PB
 * @license   GPL-3.0
 * @link      https://goPB.com
 * @copyright 2017 PB (Pty) Ltd
 */

namespace PB\RP;

use stdClass;


/**
 * @subpackage Plugin
 */
class CustomPostType
{

	/**
	 * The variable name is used as the text domain when internationalizing strings
	 * of text. Its value should match the Text Domain file header in the main
	 * plugin file.
	 *
	 * @since    1.0.0
	 *
	 * @var      string
	 */
	protected $plugin_slug = 'lumi-reviews';

	/**
	 * Instance of this class.
	 *
	 * @since    1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @since     1.0.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance()
	{

		// If the single instance hasn't been set, set it now.
		if (null == self::$instance) {
			self::$instance = new self;
		}

		return self::$instance;
	}


	private function __construct()
	{
		$plugin = Plugin::get_instance();
		$this->plugin_slug = $plugin->get_plugin_slug();
		$this->version = $plugin->get_plugin_version();

		$this->registerPostType();
		add_action('save_post', array($this, 'saveReviewMetaBoxFields'));
	}

	private function registerPostType()
	{
		add_action('init', array($this, 'reviewsInit'));
	}

	public function reviewsInit()
	{
		$args = array(
			'public' => true,
			'label' => 'Reviews',
			'register_meta_box_cb' => array($this, 'registerReviewMetaBox')
		);
		register_post_type('review', $args);
	}

	public function registerReviewMetaBox()
	{
		add_meta_box(
			'global-notice',
			__('Review Fields', 'sitepoint'),
			array($this, 'reviewMetaBoxCallBack')
		);

	}

	public function reviewMetaBoxCallBack($post)
	{
		wp_nonce_field('author_name_nonce', 'author_name_nonce');

		$value = get_post_meta($post->ID, '_author_name', true);

		echo '<label><b>Author/Company name:</b> <br/><br/></label><input type="text" style="width:100%" id="author_name" value="' . esc_attr($value) . '" name="author_name">';
	}

	public function saveReviewMetaBoxFields($post_id)
	{

    // Check if our nonce is set.
		if (!isset($_POST['author_name_nonce'])) {
			return;
		}

    // Verify that the nonce is valid.
		if (!wp_verify_nonce($_POST['author_name_nonce'], 'author_name_nonce')) {
			return;
		}

    // If this is an autosave, our form has not been submitted, so we don't want to do anything.
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
			return;
		}

    // Check the user's permissions.
		if (isset($_POST['post_type']) && 'page' == $_POST['post_type']) {

			if (!current_user_can('edit_page', $post_id)) {
				return;
			}

		} else {

			if (!current_user_can('edit_post', $post_id)) {
				return;
			}
		}

    /* OK, it's safe for us to save the data now. */

    // Make sure that it is set.
		if (!isset($_POST['author_name'])) {
			return;
		}

    // Sanitize user input.
		$my_data = sanitize_text_field($_POST['author_name']);

    // Update the meta field in the database.
		update_post_meta($post_id, '_author_name', $my_data);
	}

}