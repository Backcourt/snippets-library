# Change Mix and Match “Select Options” Button Text

![A screenshot showing an example Shop Page with the Mix and Match "Select options" button highlighted](https://github.com/user-attachments/assets/1a895c3b-f307-4c2d-be1a-fc628bc379f0)

By default, Mix and Match products on the shop/archive pages use a generic “Select options” label. You can swap that out for any text your store needs (e.g. “Choose flavors,” “Build your box,” etc.) by dropping the following into your theme’s functions.php or with the use of a plugin, and then replacing the "Your Text Here" text with your preferred text.

```
/**
 * Change Mix and Match loop add to cart button text
 *
 * @param string      $text    The original button text.
 * @param WC_Product  $product The current product in the loop.
 * @return string              The modified button text.
 */
function wc_mnm_change_add_to_cart_button_text( $text, $product ) {
    // Only target Mix and Match products that are purchasable and in stock.
    if ( $product->is_type( 'mix-and-match' ) && $product->is_purchasable() && $product->is_in_stock() ) {
        // Swap in your preferred text by replacing the "Your Text Here" string. Translate it if needed.
        $text = __( 'Your Text Here', 'your-text-domain' );
    }

    return $text;
}
add_filter( 'mnm_add_to_cart_text', 'wc_mnm_change_add_to_cart_button_text', 10, 2 );
```
