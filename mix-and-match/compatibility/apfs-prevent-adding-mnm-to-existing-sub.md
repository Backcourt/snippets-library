# Prevent adding Mix and Match products to existing subscriptions

All Products for Subscriptions lets you optionally add products to existing subscriptions. If you'd like to disable that for a specific product type (in this case Mix and Match and Variable Mix and Match types) you can use the following:


```[php]
/**
 * Prevent adding Mix and Match products to existing subscriptions
 *
 * @param  bool        $is_feature_supported
 * @param  WC_Product  $product
 * @param  string      $feature
 * @return bool
 */
function wc_mnm_disable_support_for_adding_to_sub( $is_feature_supported, $product, $feature ) {
    if ( 'subscription_management_add_to_subscription_product_single' === $feature ) {
        $is_feature_supported = $product->is_type( ['mix-and-match', 'variable-mix-and-match'] ) ? false: $is_feature_supported;
    }
    return $is_feature_supported;
}
add_filter( 'wcsatt_product_supports_feature', 'wc_mnm_disable_support_for_adding_to_sub', 10, 3 );

```