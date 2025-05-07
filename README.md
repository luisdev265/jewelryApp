# Jewelry App - Documentation

## Used Tecnologies
- Frontend: React + Vite + TailwindCSS + typeScript + ShadCN
- Backend: Node.js + Express
- DataBase: MySQL con MySQL2/promise
- Mobile App: React Native
- Version Control: Git + GitHub
- Documentation: Markdown

### Admin Features
- Manage Products, Categories, Subcategories, Gallery
- Manage Clients
- Manage Orders and Sells

### Client Features
- Auth: Login, Register, Logout
- Account: View/Edit Profile, Change Password
- Shopping: View Products, Cart, Orders
- Navigation: View Categories, Subcategories, Gallery, Sells


### Mobile App Functions Admin
- Product Managment
- Clients Managment
- Categories Managment
- Sub Categories Managment
- Sells Managment
- Gallery Managment

### Database Structure

| Table             | Description                                 |
|-------------------|---------------------------------------------|
| `users`           | Admins and clients                          |
| `orders`          | Client orders with status tracking          |
| `products`        | Jewelry items                               |
| `categories`      | Top-level classification                    |
| `sub_categories`  | Second-level classification                 |
| `buy_cart`        | Temporary cart items per client             |
| `gallery_images`  | Images not tied to products                 |
| `product_images`  | Images tied to products                     |
| `sales`           | Historical sells per admin/client           |
| `payments`        | Information realationship with the payments |

### Table: `users`

**Description:** Stores information about the system users, including administrators and clients.

| Field         | Type                         | Constraints                      | Description                               |
|---------------|------------------------------|----------------------------------|-------------------------------------------|
| `id`          | INT                          | PRIMARY KEY, AUTO_INCREMENT      | Unique identifier for each user           |
| `name`        | VARCHAR(100)                 | NOT NULL                         | Full name of the user                     |
| `email`       | VARCHAR(255)                 | NOT NULL, UNIQUE                 | User's email address                      |
| `password`    | VARCHAR(255)                 | NOT NULL                         | Hashed password                           |
| `id_address`  | INT (FK)                     | FORGEIN KEY                      | Frogein Key to connect with Address       |
| `role`        | ENUM('admin', 'client')      | DEFAULT 'client'                 | User role: admin or client                |
| `created_at`  | DATETIME                     | DEFAULT CURRENT_TIMESTAMP        | Timestamp when the user was created       |
| `updated_at`  | DATETIME                     | ON UPDATE CURRENT_TIMESTAMP      | Timestamp of the last update              |

**Relations:**
- A user can have multiple `orders`.
- A user can have a `buy_cart`.
- Admin users are allowed to manage products, categories, subcategories, and sales.

### Table: `address`

**Description:** Stores shipping address information for users, used for product delivery.

| Field         | Type            | Constraints                      | Description                                |
|---------------|-----------------|----------------------------------|--------------------------------------------|
| `id`          | INT             | PRIMARY KEY, AUTO_INCREMENT      | Unique identifier for each address         |
| `user_id`     | INT             | FOREIGN KEY (`users(id)`)        | References the user to whom the address belongs |
| `street`      | VARCHAR(255)    | NOT NULL                         | Street address                            |
| `city`        | VARCHAR(100)    | NOT NULL                         | City                                      |
| `state`       | VARCHAR(100)    | NOT NULL                         | State/Province                            |
| `zip_code`    | VARCHAR(20)     | NOT NULL                         | Postal code                               |
| `country`     | VARCHAR(100)    | NOT NULL                         | Country                                   |
| `created_at`  | DATETIME        | DEFAULT CURRENT_TIMESTAMP        | Timestamp when the address was created    |
| `updated_at`  | DATETIME        | ON UPDATE CURRENT_TIMESTAMP      | Timestamp of the last update              |

**Relations:**
- The `user_id` field links this table to the `users` table, where each user can have multiple shipping addresses.

### Table: `orders`

**Description:** Stores information about customer orders, including status tracking, related payments, and shipping details.

| Field            | Type             | Constraints                        | Description                                          |
|------------------|------------------|------------------------------------|------------------------------------------------------|
| `id`             | INT              | PRIMARY KEY, AUTO_INCREMENT        | Unique identifier for each order                     |
| `user_id`        | INT              | FOREIGN KEY (`users(id)`)          | References the user who placed the order             |
| `payment_id`     | INT              | FOREIGN KEY (`payments(id)`)       | References the payment transaction (if using Stripe) |
| `address_id`     | INT              | FOREIGN KEY (`address(id)`)        | References the shipping address for the order        |
| `total_amount`   | DECIMAL(10, 2)   | NOT NULL                           | Total amount of the order                            |
| `status`         | ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled') | DEFAULT 'pending' | Current status of the order (`pending`, `paid`, `shipped`, `delivered`, `canceled`)                                                                           |
| `created_at`     | DATETIME         | DEFAULT CURRENT_TIMESTAMP          | Timestamp when the order was placed                  |
| `updated_at`     | DATETIME         | ON UPDATE CURRENT_TIMESTAMP        | Timestamp of the last update to the order            |

**Relations:**
- The `user_id` field links this table to the `users` table. Each order is associated with a user.
- The `payment_id` field links this table to the `payments` table, keeping track of the payment status.
- The `address_id` field links to the `address` table, indicating the shipping address for each order.


### Table: `payments`

**Description:** Stores payment transaction information related to orders.

| Field             | Type           | Constraints                        | Description                                 |
|-------------------|----------------|------------------------------------|---------------------------------------------|
| `id`              | INT            | PRIMARY KEY, AUTO_INCREMENT        | Unique identifier for each payment          |
| `order_id`        | INT            | FOREIGN KEY (`orders(id)`)         | References the order being paid             |
| `stripe_payment_id` | VARCHAR(255) | UNIQUE, NOT NULL                   | Stripe's unique payment transaction ID      |
| `amount`          | DECIMAL(10, 2) | NOT NULL                           | Total amount paid for the order             |
| `currency`        | VARCHAR(10)    | NOT NULL                           | Currency of the payment (e.g., USD)         |
| `status`          | ENUM('pending', 'succeeded', 'failed') | DEFAULT 'pending' | Payment status                       |
| `payment_method`  | VARCHAR(100)   | NOT NULL                           | Payment method used (e.g., card, wallet)    |
| `created_at`      | DATETIME       | DEFAULT CURRENT_TIMESTAMP          | Timestamp when the payment was made         |
| `updated_at`      | DATETIME       | ON UPDATE CURRENT_TIMESTAMP        | Timestamp of the last update                |

**Relations:**
- `order_id` references `orders(id)`; each payment is tied to a specific order.

### Table: `products`

**Description:** Stores information about jewelry products available in the store.

| Field            | Type             | Constraints                        | Description                                 |
|------------------|------------------|------------------------------------|---------------------------------------------|
| `id`             | INT              | PRIMARY KEY, AUTO_INCREMENT        | Unique identifier for each product          |
| `name`           | VARCHAR(255)     | NOT NULL                           | Name of the product                         |
| `description`    | TEXT             | NOT NULL                           | Detailed description of the product         |
| `price`          | DECIMAL(10, 2)   | NOT NULL                           | Price of the product                        |
| `stock_quantity` | INT              | DEFAULT 0                          | Number of items available in stock          |
| `category_id`    | INT              | FOREIGN KEY (`categories(id)`)     | References the product's category           |
| `sub_category_id`| INT              | FOREIGN KEY (`sub_categories(id)`) | References the product's sub-category       |
| `created_at`     | DATETIME         | DEFAULT CURRENT_TIMESTAMP          | Timestamp when the product was added        |
| `updated_at`     | DATETIME         | ON UPDATE CURRENT_TIMESTAMP        | Timestamp of the last update                |

**Relations:**
- The `category_id` field links this table to the `categories` table, categorizing products.
- The `sub_category_id` field links this table to the `sub_categories` table for further classification.

### Table: `categories`

**Description:** Stores the main categories of products, used for classifying jewelry items.

| Field            | Type             | Constraints                        | Description                                 |
|------------------|------------------|------------------------------------|---------------------------------------------|
| `id`             | INT              | PRIMARY KEY, AUTO_INCREMENT        | Unique identifier for each category         |
| `name`           | VARCHAR(255)     | NOT NULL, UNIQUE                   | Name of the category (e.g., "Rings", "Necklaces") |
| `description`    | TEXT             | NULL                               | Description of the category, optional       |
| `created_at`     | DATETIME         | DEFAULT CURRENT_TIMESTAMP          | Timestamp when the category was created     |
| `updated_at`     | DATETIME         | ON UPDATE CURRENT_TIMESTAMP        | Timestamp of the last update                |

**Relations:**
- The `categories` table is linked to the `products` table through the `category_id` field. Each product is associated with one main category.

### Table: `sub_categories`

**Description:** Stores the subcategories of products, used for further classification under main categories.

| Field             | Type             | Constraints                        | Description                                 |
|-------------------|------------------|------------------------------------|---------------------------------------------|
| `id`              | INT              | PRIMARY KEY, AUTO_INCREMENT        | Unique identifier for each subcategory      |
| `name`            | VARCHAR(255)     | NOT NULL, UNIQUE                   | Name of the subcategory (e.g., "Silver Rings", "Gold Necklaces") |
| `category_id`     | INT              | FOREIGN KEY (`categories(id)`)     | References the main category of the subcategory |
| `description`     | TEXT             | NULL                               | Description of the subcategory, optional   |
| `created_at`      | DATETIME         | DEFAULT CURRENT_TIMESTAMP          | Timestamp when the subcategory was created |
| `updated_at`      | DATETIME         | ON UPDATE CURRENT_TIMESTAMP        | Timestamp of the last update               |

**Relations:**
- The `category_id` field links this table to the `categories` table, classifying subcategories under a main category.
- Each subcategory is linked to multiple products via the `sub_category_id` in the `products` table.

### Table: `sales`

**Description:** Stores completed sales records made by users, with payment and status details.

| Field             | Type             | Constraints                        | Description                                 |
|-------------------|------------------|------------------------------------|---------------------------------------------|
| `id`              | INT              | PRIMARY KEY, AUTO_INCREMENT        | Unique identifier for the sale              |
| `user_id`         | INT (FK)         | NOT NULL, FOREIGN KEY (users.id)   | References the users.id who made the sale   |
| `total_amount`    | DECIMAL(10,2)    | NOT NULL                           | Total value of the sale                     |
| `payment_method`  | VARCHAR(50)      | NOT NULL                           | Payment method used (e.g., Stripe, PayPal)  |
| `status`          | VARCHAR(50)      | NOT NULL                           | Status of the sale (e.g., completed, failed)|
| `created_at`      | DATETIME         | DEFAULT CURRENT_TIMESTAMP          | Timestamp when the sale was created         |
| `updated_at`      | DATETIME         | ON UPDATE CURRENT_TIMESTAMP        | Timestamp of the last update                |

### Table: `buy_cart`

**Description:** Temporary storage for products added by users before completing a purchase.

| Field             | Type             | Constraints                        | Description                                 |
|-------------------|------------------|------------------------------------|---------------------------------------------|
| `id`              | INT              | PRIMARY KEY, AUTO_INCREMENT        | Unique identifier for the cart item         |
| `user_id`         | INT (FK)         | NOT NULL, FOREIGN KEY (users.id)   | References the users.id who owns the cart   |
| `product_id`      | INT (FK)         | NOT NULL, FOREIGN KEY (product.id) | Total value of the sale                     |
| `quantity`        | INT              | DEFAULT 1                          | Quantity of the product	                  |
| `created_at`      | DATETIME         | DEFAULT CURRENT_TIMESTAMP          | When the cart item was created              |
| `updated_at`      | DATETIME         | ON UPDATE CURRENT_TIMESTAMP        | When the cart item was last updated         |

**Relations:**
- The `user_id` field links this table to the `users` table, providing us data user we need.
- The `product_id` field links this table to the `products` table, providing us data product we need.

### Table: `gallery_images`

**Description:** Stores uploaded images for the public gallery.

| Field          | Type           | Constraints                       | Description                           |
|----------------|----------------|-----------------------------------|---------------------------------------|
| `id`           | INT            | PRIMARY KEY, AUTO_INCREMENT       | Unique identifier for the image       |
| `img_url`      | VARCHAR(255)   | NOT NULL                          | Path or URL to the image              |
| `title`        | VARCHAR(100)   | NULLABLE                          | Optional title for the image          |
| `description`  | TEXT           | NULLABLE                          | Optional description                  |
| `created_at`   | DATETIME       | DEFAULT CURRENT_TIMESTAMP         | Upload date                           |
| `updated_at`   | DATETIME       | ON UPDATE CURRENT_TIMESTAMP       | Timestamp of the last update          |

