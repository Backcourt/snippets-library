# Discount from sale price

By default, Mix and Match defaults to discounting the per-item price from the _regular_ price and not the _sale price_ to prevent unexpected bonus discounts.

However, that's switchable with the following:

```[php]
add_filter( 'wc_mnm_child_item_discount_from_regular', '__return_true' );
```