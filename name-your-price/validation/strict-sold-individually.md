# Strict Sold Individually

By default WooCommerce generates a cart ID from the product ID and variation ID _and_ any additional cart item data. For Name Your Price, this means that two of the same products will be considered unique items if they have a different prices. This means that enabling the "Sold individually" setting for a Name Your Price product may not have the desired effect.

To enforce a stricter "sold individually" check you can force WooCommerce to _only_ consider the product and variation IDs when generating the cart ID. With this snippet, WooCommerce will ignore the configuration (and any other cart data) when comparing Name Your Price enabled products to products in the cart.


```[php]


/**
 * Attach hooks only when MNM is active.
 */
function wc_mnm_sold_individually_init() {
	add_filter( 'woocommerce_cart_id', 'wc_mnm_force_sold_individually', 10, 5 );
}
add_action( 'woocommerce_mnm_loaded', 'wc_mnm_sold_individually_init' );

/**
 * Regenerate a cart ID that *only* includes the Product ID
 *
 * @param string cart item key.
 * @param int   $product_id - id of the product the key is being generated for.
 * @param int   $variation_id of the product the key is being generated for.
 * @param array $variation data for the cart item.
 * @param array $cart_item_data other cart item data passed which affects this items uniqueness in the cart.
 * @return string 
 */
function wc_mnm_force_sold_individually( $cart_id, $product_id, $variation_id, $variation, $cart_item_data ) {

	if ( 'mix-and-match' === WC_Product_Factory::get_product_type( $product_id ) ) {

		$product = wc_get_product( $product_id );

		if ( $product->is_sold_individually() ){

			$id_parts = array( $product_id );

			$cart_id = md5( implode( '_', $id_parts ) );

		}

	}

	return $cart_id;
}
```