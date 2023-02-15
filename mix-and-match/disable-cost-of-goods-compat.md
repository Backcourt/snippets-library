# Disable Cost of Goods compatibility module

The Cost of Goods compatibility module intentionally sets the cost of child items in a fixed-price pack to ZERO. We believe this makes sense as all the cost should be associated with the parent pack product in this case. 

However, if that's not ideal for you, you can disable our module with the following. Note, because of how early the compatibility modules are loaded, this probably cannot be run from your theme's `functions.php`.


```[php]

/**
 * Disable Cost of Goods compatibility module.
 *
 * @param  array $module_paths
 * @return array
 */
function wc_mnm_disable_cog_compat_module( $module_paths ) {
    unset( $module_paths['cog'] );
    return $module_paths;
}
add_filter( 'wc_mnm_compatibility_modules', 'wc_mnm_disable_cog_compat_module' );
```