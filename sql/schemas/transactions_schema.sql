-- SQL Scenario 1: Round-trip Transactions
-- Table structure

CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY,
    from_account VARCHAR(50) NOT NULL,
    to_account VARCHAR(50) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    transaction_time TIMESTAMP NOT NULL
);