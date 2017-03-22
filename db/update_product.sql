update products
set description = $2
where product_id = $1
RETURNING *;
