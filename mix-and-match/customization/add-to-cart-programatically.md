# Add to cart programatically

If you are doing some heavy customization of Mix and Match you may need to add the product to the cart yourself. The best way to do that would be to add the bundle/container product with a specified configuration. Both the parent and the child products need certain cart item data in order to maintain that parent/child relationship so the easiest way to achieve that is to allow Mix and Match to add the selected child items automatically. 

## Mix and Match contents configuration array

The configuration array defines the selected child products and their quantities for a given mix and match product. This is an example for adding mix and match product #99 to the cart with the following configuration: 3 of simple product #299 and 4 of variation product #301 (the "blue" color variation of product #300.

```[php]
$mnm_config = array(
	299 => array(                             
		'product_id'        => 299,            // ID of child product.
		'quantity'          => 3,             // Qty of child product.
	),
	301 => array(                       
		'product_id'        => 300,           // ID of child product.
        'variation_id'      => 301,           // Variation ID of the child product.
        'variation'         => array( 'pa_color' => 'blue' ) // Variation attributes.
		'quantity'          => 3,             // Qty of child product.
	)
);
```

## Validation

We also need to use core `woocommerce_add_to_cart_validation` filter but we want to include the configuration by passing the `$cart_item_data` there as well.

## Putting it all together

In addition to the `$mnm_config` variable above, we can add the mix and match product to the cart if it passes validation using the following snippet:

```[php]
$container_id = 99;
$quantity = 1;
$variation_id = 0;
$variation = array();

$cart_item_data = array( 'mnm_config' => $mnm_config );

if ( apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity, $variation_id, $variation, $cart_item_data ) ) {
	wc()->cart->add_to_cart( $container_id, $quantity, $variation_id, $variation, $cart_item_data );
}
```
