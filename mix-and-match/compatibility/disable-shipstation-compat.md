# Disable ShipStation compatibility module

The ShipStation compatibility module treats child items that are packed together inside a container as "virtual", so they are _not_ imported into ShipStation. The container's configuration is instead passed to ShipStation as line item meta.

This can sometimes be hard to read, so if that's not ideal for you, you can disable our module with the following. Note, because of how early the compatibility modules are loaded, this probably cannot be run from your theme's `functions.php`.

We have been in touch with ShipStation and they import the items and sort them by price automatically... regardless of the order they are exported them in. This can cause unfortunate ordering on the ShipStation where it can look like the pack is broken. For example, if you have a per-item priced mix and match "pack" without a base price, the main "pack" product could end up at the bottom of your list on the ShipStation side. Until they decide to change that forced sorting, we will stick with our current compatibility module.


```[php]

/**
 * Disable ShipStation compatibility module.
 *
 * @param  array $module_paths
 * @return array
 */
function wc_mnm_disable_shipstation_compat_module( $module_paths ) {
    unset( $module_paths['shipstation'] );
    return $module_paths;
}
add_filter( 'wc_mnm_compatibility_modules', 'wc_mnm_disable_shipstation_compat_module' );
```