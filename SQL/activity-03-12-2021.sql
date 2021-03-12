--0

SELECT 
    count(distinct rental.inventory_id) as unique_inventory_rented,
    count(inventory.inventory_id) as total_rented 
from inventory join rental on inventory.inventory_id = rental.inventory_id;

--1
SELECT 
    film.title as film_title, film.release_year, film.rating, 
    concat(actor.first_name,' ', actor.last_name) as actor_full_name
from 
    film join film_actor on film.film_id = film_actor.film_id 
    join actor on actor.actor_id = film_actor.actor_id
where 
    concat(actor.first_name,' ', actor.last_name) = 'Dan Torn' or 
    concat(actor.first_name,' ', actor.last_name) = 'Dan Streep' 
ORDER BY film_title ASC;

--2
SELECT 
    concat(actor.first_name,' ', actor.last_name) as actor_full_name, 
    film.title as film_title, category.name as category_name
from 
    category join film_category on category.category_id =  film_category.category_id join
    film on film.film_id = film_category.film_id join
    film_actor on film.film_id = film_actor.film_id join 
    actor on actor.actor_id = film_actor.actor_id
where 
    category.name = 'Comedy' and 
    actor.last_name like 'D%' 
ORDER BY actor_full_name ASC;