# Sort category items order

By default Mix and Match orders the child products found in a category by title. However, the category products query uses `wc_get_products()` which ultimately maps back to WordPress' [`WP_Query`](https://developer.wordpress.org/reference/classes/wp_query/) so it is possible to modify this query with WooCommerce/WP query params via a snippet. 

## Order by date

The following should order the products by published date from newest to oldest. To go from oldest to newest you'd switch the `order` param value to `ASC`.


```[php]
/**
 * Sort category child products by date
 *
 * @param  array $args
 * @return array
 */
function wc_mnm_sort_category_children_by_date( $args ) {
    $args['orderby'] = 'date';
    $args['order'] = 'DESC';
    return $args;
}
add_filter( 'wc_mnm_query_products_by_categories_args', 'wc_mnm_sort_category_children_by_date' );
```

## Order by Menu Order

By default, the product post type doesn't use `menu_order` (like pages do) to order products. Or more accurately, similar to posts, all products have a `menu_order` of `0` which makes them non-sortable. However, it is sometimes achievable sortable custom post types with plugins. If that plugin is using the WordPress `menu_order` database column, the following should order the products by the `menu_order` value from lowest to higest. To go from highest to lowest you'd switch the `order` param value to `DESC`.

If your customization is _not_ using the core `menu_order` database column, this may not be possible. 

```
/**
 * Sort category child products by menu order
 *
 * @param  array $args
 * @return array
 */
function wc_mnm_sort_category_children_by_menu_order( $args ) {
    $args['orderby'] = 'menu_order';
    $args['order'] = 'ASC';
    return $args;
}
add_filter( 'wc_mnm_query_products_by_categories_args', 'wc_mnm_sort_category_children_by_menu_order' );
```