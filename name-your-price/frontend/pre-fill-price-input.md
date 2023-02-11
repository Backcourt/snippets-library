# Pre-fill the price input

The pre-filled value was _intentionally_ removed in version 3.0 after an accessibility audit revealed that pre-filling the input is less accessible for users who rely on keyboard navigation and screen-readers to navigate the web. So while it's possible via the above snippet, you should know that you are making your site less accessible.

You can use the following the pre-fill the input with the suggested amount:

```[php]

/**
 * Force suggested price as initial input
 * 
 * @param   string $price
 * @param   mixed obj|int $product
 * @return  string
 */
function wc_nyp_display_suggested_as_initial_price( $price, $product ) {

    $product = WC_Name_Your_Price_Helpers::maybe_get_product_instance( $product );

    $suggested = WC_Name_Your_Price_Helpers::get_suggested_price( $product );

    if ( $suggested ) {
        $price = $suggested;
    }

    return $price;
}
add_filter( 'wc_nyp_get_initial_price', 'wc_nyp_display_suggested_as_initial_price', 10, 2 );
```

And you can use the following to pre-fill the input with the minimum amount:

```[php]
/**
* Force minimum price as initial input
*
* @param string $price
* @param mixed obj|int $product
* @return string
*/
function wc_nyp_display_minimum_as_initial_price( $price, $product ) {

    $product = WC_Name_Your_Price_Helpers::maybe_get_product_instance( $product );

    $minimum = WC_Name_Your_Price_Helpers::get_minimum_price( $product );

    if ( $minimum ) {
        $price = $minimum;
    }

    return $price;
}
add_filter( 'wc_nyp_get_initial_price', 'wc_nyp_display_minimum_as_initial_price', 10, 2 );
```
