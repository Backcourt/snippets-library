# Limit child item max quantity

By default Mix and Match allows the customer full control of their configuration... their options only limited by stock. 

This may not always be ideal for the store. While there's no user interface for setting restrictions at the child item level, there are some filters we can use.

The following checks limits the maximum of any one child item to exactly 3.

```[php]
/**
 * Limit child max quantity to 3.
 *
 * @param int $max_qty
 * @param obj $child_item WC_MNM_Child_Item
 * @param obj $product WC_Product_Mix_and_Match the container product object
 */
function kia_limit_max_mnm_quantity( $max_qty, $child_item, $product ) {
    $new_child_max = 3;
    return $max_qty > 0 ? min( $max_qty, $new_child_max ) : $new_child_max;
}
add_filter( 'wc_mnm_child_item_quantity_input_max', 'kia_limit_max_mnm_quantity', 10, 3 );
```

Between the child item and the parent product classes we have a lot of information with which to introduce some conditional logic. The following will limit any child product in a particular category to a maximum of 3.

```[php]
/**
 * Limit child items in "tacos" category to a max quantity of 3.
 *
 * @param int $max_qty
 * @param obj $child_item WC_MNM_Child_Item
 * @param obj $product WC_Product_Mix_and_Match the container product object
 */
function kia_limit_max_mnm_quantity( $max_qty, $child_item, $product ) {
	
    if ( $child_item->get_product() && has_term( 'tacos', 'product_cat', $child_item->get_product()->get_id() ) ) {
        $new_child_max = 3;
        $max_qty = $max_qty > 0 ? min( $max_qty, $new_child_max ) : $new_child_max;
    }
    return $max_qty;
}
add_filter( 'wc_mnm_child_item_quantity_input_max', 'kia_limit_max_mnm_quantity', 10, 3 );
```
