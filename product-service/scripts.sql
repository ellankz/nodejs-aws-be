create extension if not exists "uuid-ossp"

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	image_url text,
	price real
)

create table stocks (
	product_id uuid,
	count smallint,
	foreign key ("product_id") references "products" ("id")
)

WITH products as (
    insert into products (title, description, image_url, price) values
    ('Red sweater', 'Big, nice and cozy.', '1', 200),
    ('Grey sweatshirt', 'Full how way even the sigh.', '2', 250),
    ('Cool jacket', 'Lose john poor same it case do year we.', '3', 50),
    ('Oldschool sweatshirt', 'Extremely nor furniture fat questions now provision incommode preserved.', '4', 40),
    ('Beige raincoat', 'Our side fail find like now. ', '5', 500),
    ('Check skirt', 'Bachelor possible marianne directly confined relation as on he.', '6', 760),
    ('Basketball shorts', 'Now for manners use has company believe parlors.', '7', 140),
    ('Black coat', 'Least nor party who wrote while did.', '8', 60),
    ('Cool and warm coat', 'Excuse formed as is agreed admire so on result parish.', '9', 300),
    ('Beige classic coat', 'Announcing of invitation principles in.', '10', 20)
        returning id, title
)
insert into stocks (product_id, count) values
((select products.id from products where products.title = 'Red sweater'), 4),
((select products.id from products where products.title = 'Grey sweatshirt'), 7),
((select products.id from products where products.title = 'Cool jacket'), 8),
((select products.id from products where products.title = 'Oldschool sweatshirt'), 1),
((select products.id from products where products.title = 'Beige raincoat'), 2),
((select products.id from products where products.title = 'Check skirt'), 11),
((select products.id from products where products.title = 'Basketball shorts'), 6),
((select products.id from products where products.title = 'Black coat'), 2),
((select products.id from products where products.title = 'Cool and warm coat'), 4),
((select products.id from products where products.title = 'Beige classic coat'), 9);