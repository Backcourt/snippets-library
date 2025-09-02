## Mix and Match: Display Reviews for Child Products

This snippet extends WooCommerce's *Mix and Match Products* (MNM) by making reviews from all child products listed in the parent MNM product display on the MNM product page.

It’s designed for stores where the parent and child products are closely related — for example, when child variations share the same quality, experience, or overall feedback as the main bundle.

**Example**: If you sell a “Sample Box” Mix and Match product with 5 flavors as child products, reviews for each flavor will now show up on the main box product page — giving customers a fuller picture of product feedback.

### How It Works
- Hooks into the comment query using comments_pre_query
- Looks up the child product IDs for the parent Mix and Match product via WooCommerce's data store API
- Updates the query to include all child product reviews when viewing the parent
- Keeps WooCommerce’s default review behavior unchanged on non–Mix and Match products

### Usage

- Drop the snippet into your theme’s functions.php or a custom plugin.
- Clear your caches if using a persistent object cache.
- Reviews from all child items will now appear under the parent Mix and Match product page automatically.

### Snippet
```
/**
 * Adjust the comment query for Mix and Match products to include comments|reviews of the child items.
 * 
 * @param array|int|null   $comment_data Return an array of comment data to short-circuit WP's comment query,
 *                                       the comment count as an integer if `$this->query_vars['count']` is set,
 *                                       or null to allow WP to run its normal queries.
 * @param WP_Comment_Query $query        The WP_Comment_Query instance, passed by reference.
 * @return array|int|null
 */
function wc_mnm_modify_comments_pre_query( $comment_data, $query ) {
 
    if ( $query->query_vars['post_id'] ) {

		$post_id = absint( $query->query_vars['post_id'] );
	
		if ( 'mix-and-match' === WC_Product_Factory::get_product_type( $post_id ) ) {

			$data_store = WC_Data_Store::load( 'product-mix-and-match' );
			
			$child_ids = $data_store->query_child_items_by_container( $post_id );

			if ( ! empty ( $child_ids ) ) {
				$query->query_vars['post_id']  = 0;
				$query->query_vars['post__in'] = $child_ids;
			}
			
		}

	 }

	 return $comment_data; 
}
add_filter( 'comments_pre_query', 'wc_mnm_modify_comments_pre_query', 10, 2 );


/**
 * Adjust the comment count for Mix and Match products to include comments|reviews of the child items.
 * 
 * @param int        $count   The number of reviews
 * @param WC_Product $product The product instance
 * @return int
 */

function wc_mnm_combined_count( $count, $product ) {
	if ( $product->is_type( 'mix-and-match' ) ) {
       
        $count = get_transient( 'mnm_combined_review_count_' . $product->get_id() );

        if ( false === $count ) {
      		$data_store = WC_Data_Store::load( 'product-mix-and-match' );
            $child_ids  = $data_store->query_child_items_by_container( $product );
            array_push( $child_ids, $product->get_id() );
            $count      = array_sum( WC_Comments::get_review_counts_for_product_ids( $child_ids ) );

            set_transient( 'mnm_combined_review_count_' . $product->get_id(), $count, DAY_IN_SECONDS ); // Cache for 24 hours.
        }
	}
	return $count;
}
add_filter( 'woocommerce_product_get_review_count', 'wc_mnm_combined_count', 10, 2 );

/**
 * Flush comment count cache whenever there is a new comment or a comment status changes
 */
function wc_mnm_flush_combined_comment_counts() {
	global $wpdb;
	$transients = $wpdb->get_col(
		"SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE '_transient_mnm_combined_review_count_%' OR option_name LIKE '_transient_timeout_mnm_combined_review_count_%'"
	);
	foreach ( $transients as $transient ) {
		$key = str_replace( array( '_transient_', '_transient_timeout_' ), '', $transient );
		delete_transient( $key );
	}
	delete_expired_transients();
}
add_action( 'wp_insert_comment', 'wc_mnm_flush_combined_comment_counts' );
add_action( 'transition_comment_status', 'wc_mnm_flush_combined_comment_counts' );
add_action( 'woocommerce_delete_product_transients', 'wc_mnm_flush_combined_comment_counts' );
```

