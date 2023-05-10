# Add custom supported product type

By default Mix and Match allows only simple products and fully-defined variations as options in the Allowed Contents. This can be extended via the `wc_mnm_supported_product_types` filter (or `wc_mnm_supported_products` prior to `2.4.6`). 

Keep in mind that Mix and Match does not have any built-in user interface for handling selections and may not be able to sync stock/prices for a variable product. It would be advisable to stick to simple-ish products.


```[php]

/**
 * Product types supported as Mix and Match allowed contents.
 *
 * @param array
 * @return array
 */
function wc_mnm_add_supported_type( $types ) {
	$types[] = 'new-type';
	return $types;
}
add_filter( 'wc_mnm_supported_product_types', 'wc_mnm_add_supported_type' );
```