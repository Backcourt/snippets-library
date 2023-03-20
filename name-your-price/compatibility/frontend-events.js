# Custom script events

The frontend javascript has multiple jQuery events.

## Price updated

`wc-nyp-updated` event that fires whenever the price is updated.

You can use this event to integrate with your plugin by listening for the event and getting the currently entered price:

/**
 * Do something when the price is updated
 */
function wc_nyp_price_updated_listener() {

    wp_add_inline_script( 'woocommerce-nyp', '
				
        jQuery(".cart").on("wc-nyp-updated",".nyp", function( e, nypProduct ) {
            console.debug("entered price", nypProduct.getPrice());
        } );

    ' );
}
add_action( 'wp_enqueue_scripts', 'wc_nyp_price_updated_listener', 99 );