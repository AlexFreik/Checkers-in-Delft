# TUD-2Q-DB

1. List the titles of all movies. (1 point)
  

  ```sql
  SELECT title 
  FROM movies;
  ```
  ```
               title                
  ------------------------------------
   Episode IV: A New Hope
   Episode V: The Empire Strikes Back
   Episode VI: Return of the Jedi
  (3 rows)

  
  ```

2. List all planets of gas type.
```
SELECT name
FROM planets
WHERE type='gas';
```
```
  name  
--------
 Bespin
(1 row)
```
3. List all characters whose names contain the letter 's'.
  ```
  SELECT *
  FROM characters
  WHERE name ILIKE '%s%'
  ```
  
  ```
    starwars-# ;
         name       | race  | homeworld | affiliation 
  ------------------+-------+-----------+-------------
   Han Solo         | Human | Corellia  | rebels
   Luke Skywalker   | Human | Tatooine  | rebels
   Owen Lars        | Human | Tatooine  | neutral
   Princess Leia    | Human | Alderaan  | rebels
   Lando Calrissian | Human |           | rebels
  (5 rows)
  ```

4. List the names of all characters that appeared on planet ‘Tatooine’ (duplicates should be eliminated).
```
SELECT DISTINCT character
FROM timetable
WHERE planet='Tatooine';
```
```
    character     
------------------
 Han Solo
 Princess Leia
 Owen Lars
 Lando Calrissian
 Chewbacca
 C-3 PO
 Obi-Wan Kenobi
 Rancor
 R2-D2
 Jabba the Hutt
 Luke Skywalker
(11 rows)
```
5. List the name and affiliation of all characters that don’t have a homeworld.
  ```
  SELECT name, affiliation
  FROM characters
  WHERE homeworld IS NULL;
  ```
  
  ```
         name       | affiliation 
  ------------------+-------------
   C-3 PO           | rebels
   Darth Vader      | empire
   Jabba the Hutt   | neutral
   Lando Calrissian | rebels
   R2-D2            | rebels
   Rancor           | neutral
   Yoda             | neutral
  (7 rows)
  ```

6. List all distinct races represented by at least two characters. 
```
SELECT race, COUNT(name)
FROM characters
GROUP BY race 
HAVING COUNT(name) >= 2;
```
```
 race  | count 
-------+-------
 Droid |     2
 Human |     7
(2 rows)
```
7. List the average time spent by Chewbacca over all planets where he appeared.
```
SELECT ROUND(AVG(departure_time - arrival_time), 2) AS average_time_chewbacca_spent_on_planets 
FROM timetable 
WHERE character='Chewbacca';
```
```
 average_time_chewbacca_spent_on_planets 
-----------------------------------------
                                    3.00
(1 row)
```

8. For each movie, list the number of different planets where the characters appeared. 
```
SELECT movies.title, COUNT(DISTINCT planet)
FROM timetable
  JOIN movies ON timetable.movie=movies.id
GROUP BY movies.title;
```
```
               title                | count 
------------------------------------+-------
 Episode IV: A New Hope             |     4
 Episode VI: Return of the Jedi     |     4
 Episode V: The Empire Strikes Back |     4
(3 rows)
```
9. For the characters that have the same affiliation as their home planet, list the number of appearances for each planet they have visited (ordered by character name). 
```
SELECT c.name, t.planet, COUNT(*)
FROM characters c
  JOIN timetable t ON c.name = t.character
  JOIN planets p ON c.affiliation = p.affiliation AND c.homeworld = p.name
GROUP BY c.name, t.planet
ORDER BY c.name;
```
```
     name      |     planet     | count 
---------------+----------------+-------
 Chewbacca     | Bespin         |     1
 Chewbacca     | Endor          |     1
 Chewbacca     | Hoth           |     1
 Chewbacca     | Tatooine       |     2
 Han Solo      | Bespin         |     1
 Han Solo      | Endor          |     1
 Han Solo      | Hoth           |     1
 Han Solo      | Star Destroyer |     1
 Han Solo      | Tatooine       |     2
 Owen Lars     | Tatooine       |     1
 Princess Leia | Bespin         |     1
 Princess Leia | Endor          |     1
 Princess Leia | Hoth           |     1
 Princess Leia | Star Destroyer |     1
 Princess Leia | Tatooine       |     1
(15 rows)
```

10. List the names of the characters that have visited all types of planets (excluding planets that no character has visited).
```
SELECT characters.name
FROM characters
    JOIN timetable ON characters.name=timetable.character
    JOIN planets ON timetable.planet=planets.name
GROUP BY characters.name
HAVING COUNT(DISTINCT planets.type)=(
    SELECT COUNT(DISTINCT type)
    FROM planets
        RIGHT JOIN timetable ON planets.name=timetable.planet
);
```
```
      name      
----------------
 Luke Skywalker
(1 row)
```

11. For each planet, list the second longest time a character spent on it. (3 points)



12. Find the planet where characters spent the most amount of time (time spent in total by all characters in the planet) during Episode IV: A New Hope and:

- The characters have an affiliation different than the planet’s one.
```
SELECT planets.name
FROM characters
    JOIN timetable ON characters.name=timetable.character
    JOIN planets ON timetable.planet=planets.name
    JOIN movies ON timetable.movie=movies.id
WHERE movies.title='Episode IV: A New Hope'
    AND characters.affiliation<>planets.affiliation
GROUP BY planets.name
ORDER BY SUM(timetable.departure_time-timetable.arrival_time)
LIMIT 1;
```
```
    name    
------------
 Death Star
(1 row)
```

- The characters belong to any race containing rebel characters. (3 points)
```
SELECT planets.name
FROM characters
    JOIN timetable ON characters.name=timetable.character
    JOIN planets ON timetable.planet=planets.name
    JOIN movies ON timetable.movie=movies.id
WHERE movies.title='Episode IV: A New Hope'
    AND characters.race IN (
        SELECT DISTINCT race
        FROM characters
        WHERE characters.affiliation='rebels'
    )
GROUP BY planets.name
ORDER BY SUM(timetable.departure_time-timetable.arrival_time)
LIMIT 1;
```
```
    name    
------------
 Death Star
(1 row)
```
