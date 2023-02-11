# Remove the minimum price template

By default, Name Your Price will show the user the minimum price limit. And there's a setting to hide the minimum in the Product data editor, though we feel it's always best to tell the customer any restrictions so they can successfully add the product to the cart.

But the minimum template can be entirely removed via the following:

```[php]
/**
 * Remove the minimum price template.
 */
function wc_nyp_remove_minimum_price() {
    if ( class_exists( 'WC_Name_Your_Price' ) ) {
        remove_action( 'wc_nyp_after_price_input', array( WC_Name_Your_Price()->display, 'display_minimum_price' ) );
    }
}
add_action( 'woocommerce_before_single_product' , 'wc_nyp_remove_minimum_price' );
```