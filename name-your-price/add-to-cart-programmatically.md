# Add a NYP item to cart programatically

Price information is passed in the final `$cart_item_data` parameter of the WooCommerce cart classes' [`add_to_cart()`](https://github.com/woocommerce/woocommerce/blob/7.3.0/plugins/woocommerce/includes/class-wc-cart.php#L1017) method.

**Note**: In the cart, Name Your Price stores all prices using `.` period decimal point for calculations, but all prices will be displayed to the customer according to the store's currency settings.

## Directly add an item to the cart with the NYP data.

```[php]
$cart_item_data = array( 'nyp' => 99.99 );

if ( apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity, $variation_id, $variation, $cart_item_data ) ) {
	wc()->cart->add_to_cart( $container_id, $quantity, $variation_id, $variation, $cart_item_data );
}
```