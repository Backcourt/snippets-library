# Display Advanced Custom Fields data for child products

Most of the child item data is displayed on the `wc_mnm_child_items_details` hook. You can display almost anything there related to the individual child product. 


The following is an example that will add the value of an ACF field text called "flavor". You will need to edit the field ID, label, and output format as relevant to the information you are trying to show. 


```[php]
/**
* Display an ACF field for child items.
*
* @param obj WC_MNM_Child_Item $child_item of child item
* @param obj WC_Mix_and_Match $product the parent container
*/
function wc_mnm_display_child_item_acf_field( $child_item, $product ) {

    $flavor = function_exists( 'get_field' ) ? get_field( 'flavor', $child_item->get_product()->get_id() ) : '';

    if ( '' !== $flavor ) {
        echo '<p class="flavor">';
        printf( wp_kses_post( __( '<strong>Flavor:</strong> %s', 'your-textdomain' ) . '</strong>' ),  $flavor );
        echo '</p>';
    }
}
add_action( 'wc_mnm_child_item_details', 'wc_mnm_display_child_item_acf_field', 64, 2 ); 
```