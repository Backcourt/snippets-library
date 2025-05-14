# Display a price range

The min to max price range can be rendered via the following:

```[php]
function wc_nyp_display_price_range( $product ) {

    // Get the minimum price.
    $minimum = WC_Name_Your_Price_Helpers::get_minimum_price( $product );

    // Get the maximum price.
    $maximum = WC_Name_Your_Price_Helpers::get_maximum_price( $product );

    if ( false !== $minimum && false !== $maximum && ! WC_Name_Your_Price_Helpers::is_minimum_hidden( $product ) ) {

        // Range html.
        echo '<p>' .  sprintf( _x( 'Enter an amount between %s and %s', 'custom price range', 'your-text-domain' ), wc_price( $minimum ), wc_price( $maximum ) ) . '</p>';

    }

}
add_action( 'wc_nyp_before_price_input', 'wc_nyp_display_price_range' );
```