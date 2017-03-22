INSERT INTO products
(name, description, price, imageurl)
values
($1, $2, $3, $4)
RETURNING *;
