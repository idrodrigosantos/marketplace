CREATE DATABASE marketplace;

CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "category_id" INT NOT NULL,
    "user_id" INT,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "old_price" INT,
    "price" INT NOT NULL,
    "quantity" INT DEFAULT 0,
    "status" INT DEFAULT 1,
    "created_at" TIMESTAMP DEFAULT (NOW()),
    "updated_at" TIMESTAMP DEFAULT (NOW())
);

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "path" text NOT NULL,
    "product_id" INT
);

-- Foreign key
ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "email" text UNIQUE NOT NULL,
    "password" text NOT NULL,
    "cpf_cnpj" text UNIQUE NOT NULL,
    "cep" text,
    "address" text,
    "created_at" TIMESTAMP DEFAULT (NOW()),
    "updated_at" TIMESTAMP DEFAULT (NOW())
);

-- Foreign key
ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- Create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto updated_at products
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Auto updated_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();