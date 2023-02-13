# Add a CSS class to the price input

If your theme styles inputs a certain class, you can add a custom CSS class to the price `<input>` element via the following:

```[php]
/**
 * Add classes to the NYP price input.
 * 
 * @param  array $attributes The array of attributes for the NYP div
 * @param  obj $product WC_Product The product object
 * @return string
 */
function wc_nyp_custom_nyp_input_classes( $attributes, $product  ) {
    
    $new_classes = array( 'bonus-class');
    
    $attributes['classes'] = array_merge( $attributes['classes'], $new_classes );
    
    return $attributes;
}
add_filter( 'wc_nyp_price_input_attributes', 'wc_nyp_custom_nyp_input_classes', 10, 2 );
```
