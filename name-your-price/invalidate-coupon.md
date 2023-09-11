# Invalidate a coupon when an NYP product is in the cart

```[php]

/**
 * Disable coupons for use with Name Your Price products.
 *
 * @param  bool $valid
 * @param  WC_Coupon $coupon Coupon data.
 * @param  WC_Discounts $discount Discount data.
 * @throws Exception Error message.
 * @return bool
 */
function wc_nyp_invalidate_coupon_nyp_items( $valid, $coupon, $discounts ) {

    $valid = true;

    foreach ( $discounts->get_items_to_validate() as $item ) {

        if ( $item->object && isset( $item->object['nyp'] ) ) {
            $valid = false;
            break;
        }
    }

    if ( ! $valid ) {
        throw new Exception( __( 'Sorry, this coupon is not valid for Name Your Price items.', 'woocommerce' ), 120 );
    }

    return true;
}
add_filter( 'woocommerce_coupon_is_valid', 'wc_nyp_invalidate_coupon_nyp_items', 10, 3 );
```
