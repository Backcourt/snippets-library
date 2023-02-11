# Change the validation messages

Name Your Price will dynamically show the customer an error message if the price they have entered does not satisfy the minimum or maximum values you have configured.

The messages can be modified via the following:

```[php]
/**
 * Change front-end validation messages
 * 
 * @param array $args The data attributes for the NYP div
 * @return array
 */
function wc_nyp_modify_error_strings( $args ) {
	$args['minimum-error']      = esc_html__( 'Please enter more than %%MINIMUM%%.', 'your-textdomain' );
	$args['hide-minimum-error'] = esc_html__( 'Please send us more money.', 'your-textdomain' );
	$args['maximum-error']      = esc_html__( 'Whoa that is too much. The most you can enter is %%MAXIMUM%%.', 'your-textdomain' );
    return $args;
}
add_filter( 'wc_nyp_data_attributes', 'wc_nyp_modify_error_strings' );
```

We can introduce some conditional logic so that the new messages are only applied to certain products. As an example, we might change the text strings for any product in the "tacos" category


```[php]
/**
 * Change front-end validation messages, conditionally
 * 
 * @param array $args The data attributes for the NYP div
 * @param WC_Product $product
 * @return array
 */
function wc_nyp_conditionally_modify_error_strings( $args, $product ) {
    if ( $product && has_term( 'tacos', 'product_cat', $product->get_id() ) ) {
        $args['minimum-error']      = esc_html__( 'Please send us more than %%MINIMUM%% tacos.', 'your-textdomain' );
        $args['hide-minimum-error'] = esc_html__( 'Please send us more tacos.', 'your-textdomain' );
        $args['maximum-error']      = esc_html__( 'Hate to say, but that is too many tacos. The most you can enter is %%MAXIMUM%%.', 'your-textdomain' );
    }
    return $args;
}
add_filter( 'wc_nyp_data_attributes', 'wc_nyp_conditionally_modify_error_strings', 10, 2 );
```

**Note on placeholders**

`%%MINIMUM%%` and `%%MAXIMUM%%` are placeholders that the frontend script will replace with the currency formatted values and they should not be modified or translated.
