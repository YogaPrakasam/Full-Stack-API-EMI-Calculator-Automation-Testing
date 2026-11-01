-- Sample transaction records for Scenario 1

INSERT INTO transactions
(transaction_id, from_account, to_account, amount, transaction_time)
VALUES
-- Valid round trip: 10000 returned within 24 hours
(1, 'A101', 'B201', 10000.00, '2024-04-01 10:00:00'),
(2, 'B201', 'A101', 9500.00, '2024-04-01 18:00:00'),

-- Valid round trip: 20000 returned within 24 hours
(3, 'C301', 'D401', 20000.00, '2024-04-02 09:00:00'),
(4, 'D401', 'C301', 21000.00, '2024-04-03 08:00:00'),

-- Invalid: returned amount differs by more than 10%
(5, 'E501', 'F601', 10000.00, '2024-04-04 10:00:00'),
(6, 'F601', 'E501', 8000.00, '2024-04-04 15:00:00'),

-- Invalid: returned after more than 24 hours
(7, 'G701', 'H801', 15000.00, '2024-04-05 09:00:00'),
(8, 'H801', 'G701', 15000.00, '2024-04-06 11:00:00');