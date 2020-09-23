CREATE DATABASE marketplace;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    cpf_cnpj text UNIQUE NOT NULL,
    cep text,
    address text,
    created_at TIMESTAMP DEFAULT (NOW()),
    updated_at TIMESTAMP DEFAULT (NOW()),
    reset_token text,
    reset_token_expires text
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories (id),
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    name text NOT NULL,
    description text NOT NULL,
    old_price INT,
    price INT NOT NULL,
    quantity INT DEFAULT 0,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT (NOW()),
    updated_at TIMESTAMP DEFAULT (NOW()),
    deleted_at TIMESTAMP
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name text,
    path text NOT NULL,    
    product_id INTEGER REFERENCES products (id) ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES
('Comida'), ('Eletrônicos'), ('Automóveis');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES users (id),
    buyer_id INTEGER REFERENCES users (id),
    product_id INTEGER REFERENCES products (id),
    price INT NOT NULL,
    quantity INT DEFAULT 0,
    total INT NOT NULL,
    status text NOT NULL,
    created_at TIMESTAMP DEFAULT (NOW()),
    updated_at TIMESTAMP DEFAULT (NOW())
);

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

-- Auto updated_at orders
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON orders
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

-- Soft delete
-- Regra que será executada sempre que houver um delete
CREATE OR REPLACE RULE delete_product AS
ON DELETE TO products DO INSTEAD
UPDATE products
SET deleted_at = now()
WHERE products.id = old.id;
-- Cria view para mostrar apenas dos dados ativos
CREATE VIEW products_without_deleted AS
SELECT * FROM products WHERE deleted_at IS NULL;
-- Renomeia a view e a tabela
ALTER TABLE products RENAME TO products_with_deleted;
ALTER TABLE products_without_deleted RENAME TO products;