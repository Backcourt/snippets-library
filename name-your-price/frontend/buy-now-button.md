# Add a Buy Now Button next to the add to cart button

![A sample product named 'Simple NYP' with the image of a record. There is a price input field. There is an add to cart button and next to it, there is a button labeled 'Buy now for $113.' ](https://github.com/user-attachments/assets/f132cc25-e254-4b04-be10-4e840e187b97)

To offer a buy now button with a set price you can use the following snippet. If you'd rather use the minimum price you could alter the snippet references from get_suggested_price() to get_minimum_price() and otherwise the rest should remain the same.

```[php]
/**
 * Add Button after Add to Cart Button
 */
function wc_nyp_buy_now() {
	global $product;
	
	if ( class_exists( 'WC_Name_Your_Price_Helpers' ) && WC_Name_Your_Price_Helpers::is_nyp( $product ) ) {
		echo '<button name="wc_nyp_buy_now" type="submit" style="float:none" value="'. esc_attr( $product->get_id() ) . '" class="button wc-nyp-buy-now ' . esc_attr( wp_theme_get_element_class_name( 'button' ) ) . '" >' . sprintf( esc_html__( 'Buy now for %s', 'your-textdomain' ), wc_price( WC_Name_Your_Price_Helpers::get_suggested_price( $product ) ) ) . '</button>';
	}

}
add_action( 'woocommerce_after_add_to_cart_button', 'wc_nyp_buy_now' );

/**
 * Listen for quick add to cart requests and switch the REQUEST vars so Woo will handle the add to cart correctly.
 */
function wc_nyp_quick_add_to_cart() {
	if (
		! class_exists( 'WC_Name_Your_Price_Helpers' ) ||
		! isset( $_REQUEST['wc_nyp_buy_now'] ) ||
		! WC_Name_Your_Price_Helpers::is_nyp( wp_unslash( $_REQUEST['wc_nyp_buy_now'] ) )
	) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		return;
	}

	// Manipulate the request to make it look like a normal NYP add to cart.
	$_REQUEST['add-to-cart'] = absint( wp_unslash( $_REQUEST['wc_nyp_buy_now'] ) );
	$_REQUEST['nyp'] = WC_Name_Your_Price_Helpers::get_suggested_price( $_REQUEST['add-to-cart'] );
}
add_action( 'wp_loaded', 'wc_nyp_quick_add_to_cart' );
```
