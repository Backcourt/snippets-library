# Add a placeholder to the price input

The placeholder is what is visible in the input before any value is entered. It can help prompt customers to enter a value there.

The placeholder can be added via the following:

```[php]
/**
 * Add placeholder to NYP print input.
 * 
 * @param  array $args
 * @param  WC_Product $product
 * @return array - The modified input args.
 */
function wc_nyp_add_placeholder_to_nyp_input( $args, $product ) {
    $args['placeholder'] = esc_html__( 'Enter a price', 'your-textdomain' );
    return $args;
}
add_filter( 'wc_nyp_price_input_attributes', 'wc_nyp_add_placeholder_to_nyp_input', 10, 2 );
```

We can introduce some conditional logic so that the placeholder is different in a specific product category. As an example, we might change the placeholder to something unique for any product in the "tacos" category:


```[php]
/**
 * Add placeholder to NYP print input, conditionally dependant on product category.
 * 
 * @param  array $args
 * @param  WC_Product $product
 * @return array - The modified input args.
 */
function wc_nyp_conditionally_modify_placeholder_in_nyp_input( $args, $product ) {
    if ( $product && has_term( 'tacos', 'product_cat', $product->get_id() ) ) {
        $args['placeholder'] = esc_html__( 'Enter a taco', 'your-textdomain' );
    } else {
        $args['placeholder'] = esc_html__( 'Enter a price', 'your-textdomain' );
    }
    return $args;
}
add_filter( 'wc_nyp_price_input_attributes', 'wc_nyp_conditionally_modify_placeholder_in_nyp_input', 10, 2 );
```
