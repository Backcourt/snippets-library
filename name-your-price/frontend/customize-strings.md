# Customize Strings

Name Your Price is translation-ready and we can take advantage of the WordPress core translation filters to customize the text strings used in the plugin.

The messages can be modified via the following:

```[php]

/**
 * Change text strings
 *
 * @link http://codex.wordpress.org/Plugin_API/Filter_Reference/gettext
 * @link http://codex.wordpress.org/Plugin_API/Filter_Reference/gettext_with_context
 * 
 * @param string $translation Translated text.
 * @param string $text        Text to translate.
 */
function wc_nyp_customize_text_strings( $translation, $text ) {
	switch ( $text ) {
		case 'Edit price' :
			$translation = esc_html__( 'Edit amount', 'my-textdomain' );
			break;
	}
	return $translation;
}
add_filter( 'gettext_wc_name_your_price', 'wc_nyp_customize_text_strings', 20, 2 );
add_filter( 'gettext_with_context_wc_name_your_price', 'wc_nyp_customize_text_strings', 20, 2 );
```