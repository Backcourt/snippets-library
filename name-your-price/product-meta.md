# Name Your Price Product Meta

Name Your Price requires several meta data fields in order to function. 

## All Simple Products and Variations

| Meta key  | Value Type  |  Values  |  Description  |    
| ------------- | ------------- |------------- |------------- |     
| `_nyp`  | `string`  |  `yes` or `no`  |  Determines if this product is Name Your Price or not.
| `_suggested_price`  | `string`  |  `99.99`  |  The suggested price.
| `_min_price`  | `string`  |  `29.99`  |  The minimum price. 
| `_maximum_price`  | `string`  |  `9999.99`  |  The maximum price.   
| `_hide_nyp_minimum`  | `string` | `yes` or `no`  |  Determines if this product will display the minimum price.


**Notes**
1. Database prices always use a `.` decimal, but can be displayed in local currency via `wc_price( $meta_value )`.
2. The save routine also sets the `_price` meta equal to the `_min_price` value for sorting by price.
3. If a subscription product, the save routine also sets the `_subscription_price` meta equal to the `_min_price` value

## Variable Products.

Variable products have a single meta key that determines if any of it's variations are set to use Name Your Price.

| Meta key  | Value Type  |  Values  |  Description  |    
| ------------- | ------------- |------------- |------------- |     
| `_has_nyp`  | `string`  |  `yes` or `no`  |  `yes` if any variations have `_nyp` = `yes`
