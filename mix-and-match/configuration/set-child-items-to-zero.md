# Set initial child item quantity value to 0

By default the initial quantity input is left empty. This is for accessibility reasons. But sometimes this can cause trouble for themes/plugins that add plus/minus buttons as they sometimes expect a numeric value and attempt to perform calculations on the value without treating null as effectively 0.

To get around potential script errors, you can force the input to be pre-filled with an actual 0.

```[php]
/**
 * Set initial child max quantity to 0.
 *
 * @param int $qty
 * @param obj $child_item WC_MNM_Child_Item
 * @param obj $product WC_Product_Mix_and_Match the container product object
 */
function wc_mnm_set_child_item_default( $qty, $child_item, $product ) {
    return 0;
}
add_filter( 'wc_mnm_child_item_quantity_input_default_value', 'wc_mnm_set_child_item_default', 10, 3 );
```
