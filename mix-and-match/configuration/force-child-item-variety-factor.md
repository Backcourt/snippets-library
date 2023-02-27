# Force child item variety factor

By default Mix and Match allows the customer full control of their configuration... their options only limited by stock. So a customer _can_ choose to fill their pack with only one, single product.

This may not always be ideal for the store. While there's no user interface for setting restrictions at the child item level, there are some filters we can use.

The following checks if the Mix and Match product has a maximum size and if so, limits the child maximum to the smaller of it's stock restriction or 20% of the max container size. You can set the `$variety` factor variable to different percentages.


```[php]
/**
 * Limit child item max quantity to 20% of container size.
 *
 * @param int $max_qty
 * @param obj $child_item WC_MNM_Child_Item
 * @param obj $product WC_Product_Mix_and_Match the container product object
 */
function kia_limit_max_mnm_quantity( $max_qty, $child_item, $product ) {
	$variety       = .2; // No one product can make up more than 20% of container.
    $container_max = $product->get_max_container_size();
    
	if ( $container_max ) {
        $child_max = floor( $container_max * $variety );
        $max_qty   = $max_qty > 0 ? min( $max_qty, $child_max ) : $child_max;
    }
    return $max_qty;
}
add_filter( 'wc_mnm_child_item_quantity_input_max', 'kia_limit_max_mnm_quantity', 10, 3 );
```