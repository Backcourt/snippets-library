# Enable Name Your Price support on a custom product type

By default, Name Your Price limits its support to certain product types that are in WooCommerce core or are by teams we have a good working relationship with. However, Name Your Price is extensible and depending on the complexity of your custom product type it is sometimes possible to add support.

Generally the closer the type is to a basic simple product, the better the odds of compatibility this way. You would need to customize the type names in the following snippets to match your product type's name as shown in the `get_type()` method of that type's product class. 

```[php]
/**
 * Add NYP supported "simple-ish" product types.
 * 
 * @param   array
 * @return  array
 */
function kia_add_simple_nyp_supported_type( $types ) {
    $types[] = 'some-variation';
    $types[] = 'some-product';
    return $types;
}
add_filter( 'wc_nyp_simple_supported_types', 'kia_add_simple_nyp_supported_type' );
```

Extending the variable product type is a lot more complex, and we're a lot less certain this will work on its own without additional customizations. Not for a varible-ish type you'd need to declare support for the variable-ish type _and_ the variation using the snippet above for simple-ish products.

```[php]
/**
 * Add NYP support to a "variable-ish" product types
 *
 * @param  array   $types
 * @return  array
 */
function kia_add_variable_nyp_supported_type( $types ) {
    $types[] = 'some-variable-product'; // Replace with the name of the product type if it extends the variable product class.
    return $types;
}
add_filter( 'wc_nyp_variable_supported_types', 'kia_add_variable_nyp_supported_type' );
```