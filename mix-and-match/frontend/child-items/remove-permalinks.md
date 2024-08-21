# Prevent display of child item permalinks

Navigating away from the Mix and Match product can reduce conversion so if you don't need to show more information about the child items you can remove the permalinks so that users cannot navigate away.

```[php]
/**
* Remove peramlinks by setting catalog visibility to hidden when part of container
*
* @param obj WC_Product $product the child item's product object
*/
function wc_mnm_hide_child_item_catalog_visibility( $product ) { 
	$product->set_catalog_visibility( 'hidden' );
	return $product;
}
add_filter( 'wc_mnm_child_item_product', 'wc_mnm_hide_child_item_catalog_visibility' );
```