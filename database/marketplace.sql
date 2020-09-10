CREATE DATABASE marketplace;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    user_id INT,
    name text NOT NULL,
    description text NOT NULL,
    old_price INT,
    price INT NOT NULL,
    quantity INT DEFAULT 0,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT (NOW()),
    updated_at TIMESTAMP DEFAULT (NOW())
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name text,
    path text NOT NULL,
    product_id INT
);

-- Foreign key
ALTER TABLE products ADD FOREIGN KEY (category_id) REFERENCES categories (id);
ALTER TABLE files ADD FOREIGN KEY (product_id) REFERENCES products (id);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    cpf_cnpj text UNIQUE NOT NULL,
    cep text,
    address text,
    created_at TIMESTAMP DEFAULT (NOW()),
    updated_at TIMESTAMP DEFAULT (NOW())
);

-- Foreign key
ALTER TABLE products ADD FOREIGN KEY (user_id) REFERENCES users (id);

INSERT INTO categories (name) VALUES
('Comida'), ('Eletrônicos'), ('Automóveis');

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

-- Connect PG Simple
CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Token password recovery
ALTER TABLE users ADD COLUMN reset_token text;
ALTER TABLE users ADD COLUMN reset_token_expires text;

-- Cascade effect when delete user and products
ALTER TABLE products DROP CONSTRAINT products_user_id_fkey,
ADD CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE CASCADE;

ALTER TABLE files DROP CONSTRAINT files_product_id_fkey,
ADD CONSTRAINT files_product_id_fkey FOREIGN KEY (product_id)
REFERENCES products (id)
ON DELETE CASCADE;