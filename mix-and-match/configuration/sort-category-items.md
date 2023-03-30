# Sort category items order

By default Mix and Match orders the child products found in a category by title. However, the category products query uses `wc_get_products()` which ultimately maps back to WordPress' [`WP_Query`](https://developer.wordpress.org/reference/classes/wp_query/) so it is possible to modify this query with WooCommerce/WP query params via a snippet. 

## Order by date

The following should order the products by published date from newest to oldest. To go from oldest to newest you'd switch the 'order' param value to 'ASC'.


```[php]
/**
 * Sort category child products by date
 *
 * @param  array $args
 * @return array
 */
function wc_mnm_sort_query_products_by_categories_args( $args ) {
    $args['orderby'] = 'date';
    $args['order'] = 'DESC';
    return $args;
}
add_filter( 'wc_mnm_query_products_by_categories_args', 'wc_mnm_sort_query_products_by_categories_args' );
```