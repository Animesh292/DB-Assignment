#DB- Assignment for Full Stack Developer

Answers

Ans 1 - As per the above diagram, the relationship that we can draw between the product and product_category entities of the two tables(or collections) is that for every product entity there exist a property of product_id which references to the product_category table(or collection) which consists of the details of the category of that product such as name of that category associated with that id, description of that category associated with that product id and the timestamps which consists of the time or duration of each operation performed for each entity in the table(or collections) such as created at, modified and deleted a particular record.

Ans 2 - In order to ensure that each product in the product table has a valid entity assigned to it is by ensuring that each of the product's category_id must be present inside category table which will validate that this product has a category assigned to it. Or in other word's if the product's category_id references to the category in category table by id which will make it a valid category for a product.
