<?php

/**
 * Reviews Plugin
 *
 *
 * @package   Reviews Plugin
 * @author    patryk bejcer
 * @license   GPL-3.0
 * @link      https://gopatryk bejcer.com
 * @copyright 2017 patryk bejcer (Pty) Ltd
 */

namespace PB\RP;

/**
 * @subpackage Plugin
 */
class Plugin
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
	 * Setup instance attributes
	 *
	 * @since     1.0.0
	 */
	private function __construct()
	{
		$this->plugin_version = WP_REACTIVATE_VERSION;
	}

	/**
	 * Return the plugin slug.
	 *
	 * @since    1.0.0
	 *
	 * @return    Plugin slug variable.
	 */
	public function get_plugin_slug()
	{
		return $this->plugin_slug;
	}

	/**
	 * Return the plugin version.
	 *
	 * @since    1.0.0
	 *
	 * @return    Plugin slug variable.
	 */
	public function get_plugin_version()
	{
		return $this->plugin_version;
	}

	/**
	 * Fired when the plugin is activated.
	 *
	 * @since    1.0.0
	 */
	public static function activate()
	{
		flush_rewrite_rules();
		add_option('RP_example_setting');
		global $wpdb;

		$table_name = $wpdb->prefix . 'reviews';

		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		author varchar(55) DEFAULT '' NOT NULL,
		content text NOT NULL,
		site_url varchar(55) DEFAULT '' NOT NULL,
		time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
		PRIMARY KEY  (id)
		) $charset_collate;";

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);

		$wpdb->insert(
			$table_name,
			array(
				'author' => 'Patryk',
				'content' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam illum adipisci nobis ducimus nam explicabo mollitia optio voluptatem error.',
				'site_url' => 'https://codex.wordpress.org',
				'time' => current_time('mysql'),
			)
		);

	}

	/**
	 * Fired when the plugin is deactivated.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate()
	{
	}


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
}