# Add Variations to Category Contents

By default, Woo taxonomy terms such as product categories are not saved for variations. However, we can use some more complicated SQL queries to enable this, but since it is a more complex query it could have potential performance slowdowns. You can use the following snippet to enable:

```[php]
/**
 * Add variations to Mix and Match products by category.
 * 
 * @param string[] $clauses {
 *     Associative array of the clauses for the query.
 *     @type string $where    The WHERE clause of the query.
 *     @type string $groupby  The GROUP BY clause of the query.
 *     @type string $join     The JOIN clause of the query.
 *     @type string $orderby  The ORDER BY clause of the query.
 *     @type string $distinct The DISTINCT clause of the query.
 *     @type string $fields   The SELECT clause of the query.
 *     @type string $limits   The LIMIT clause of the query.
 * }
 */
add_filter( 'posts_clauses', function( $clauses, $query ) {
	global $wpdb;

	// Limit to Mix and Match category queries.
	if ( 'wc_mnm_query_child_items_by_category' ===	$query->get('query_id' ) ) {
		// Dynamically replace the JOIN condition with a regex, using the table prefix
		$table_prefix = $wpdb->prefix;

		$clauses['join'] = preg_replace(
			// Match the specific JOIN condition for tt1
			"/LEFT JOIN {$wpdb->prefix}term_relationships AS tt1 ON\s+\({$wpdb->prefix}posts\.ID = tt1\.object_id\)/",
			// Replace with the updated condition
			"LEFT JOIN {$wpdb->prefix}term_relationships AS tt1 ON ({$wpdb->prefix}posts.ID = tt1.object_id OR {$wpdb->prefix}posts.post_parent = tt1.object_id)",
			$clauses['join']
		);

	}

    return $clauses;
}, 10, 2 );
```
