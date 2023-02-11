# Add a NYP item to cart programatically

Price information is passed in the final `$cart_item_data` parameter of the WooCommerce cart classes' [`add_to_cart()`](https://github.com/woocommerce/woocommerce/blob/7.3.0/plugins/woocommerce/includes/class-wc-cart.php#L1017) method.

**Note**: In the cart, Name Your Price stores all prices using `.` period decimal point for calculations, but all prices will be displayed to the customer according to the store's currency settings.


```[php]

// Directly add an item to the cart with the NYP data.
$cart_item_data = array( 'nyp' => 99.99 );
WC()->cart->add_to_cart( $product_id, $quantity, $variation_id, $variation, $cart_item_data );
```
