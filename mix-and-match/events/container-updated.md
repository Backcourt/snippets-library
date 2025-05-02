# Listen for container updated event

Advanced customization sometimes involves listening for updates to the container configuration.

## Classic jQuery triggers

`wc-mnm-form-updated` fires when any of the child quantities are changed:

```[js]
$( 'body' ).on( 'wc-mnm-form-updated', function( event, container ) {
    console.debug( 'current count', container.api.get_container_size() );
    console.debug( 'min size', container.api.get_min_container_size() );
    console.debug( 'max size', container.api.get_max_container_size() );
} );
```

### Example

```[php]
function wc_mnm_form_updated_script() {
	wp_add_inline_script(
				'wc-add-to-cart-mnm',
				"jQuery( 'body' ).on( 'wc-mnm-form-updated', function( event, container ) {
   					console.debug( 'current count', container.api.get_container_size() );
    				console.debug( 'min size', container.api.get_min_container_size() );
   					console.debug( 'max size', container.api.get_max_container_size() );
				});"
			);
}
add_action( 'wp_enqueue_scripts', 'wc_mnm_form_updated_script', 99 );
```

## @wordpress/hooks events

Mix and Match 2.7.0+ includes a custom wp.hooks action:

```[js]
wp.hooks.addAction( 'wc.mnm.container.container-updated', 'shakeThatWeight', function( validatedState ) {
    console.debug( 'validated State', validatedState );
} );
```

### Example

```[php]
function wc_mnm_form_updated_script_alt() {
	wp_add_inline_script(
				'wc-add-to-cart-mnm',
				"wp.hooks.addAction( 'wc.mnm.container.container-updated', 'shakeThatWeight', function( validatedState ) {
   					console.debug( 'validated State', validatedState );
				} );"
			);
}
add_action( 'wp_enqueue_scripts', 'wc_mnm_form_updated_script_alt', 99 );
```