# Disable Edit in Cart buttons

By default, Mix and Match displays a button in the cart that allows customers to edit their Mix and Match selections. If you'd like to disable this button, you can do so with the following code snippet:

```[php]
add_filter( 'wc_mnm_show_edit_it_cart_link', '__return_false' );
```

