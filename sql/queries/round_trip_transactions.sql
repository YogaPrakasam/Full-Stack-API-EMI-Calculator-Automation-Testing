-- SQL Scenario 1: Detect round-trip transactions
-- Conditions:
-- 1. Account A sends money to Account B.
-- 2. Account B sends money back to Account A.
-- 3. Both transactions occur within 24 hours.
-- 4. Returned amount is within 10% of original amount.

SELECT
    t1.transaction_id AS outgoing_transaction_id,
    t1.from_account AS account_a,
    t1.to_account AS account_b,
    t1.amount AS amount_sent,
    t1.transaction_time AS sent_time,

    t2.transaction_id AS return_transaction_id,
    t2.amount AS amount_returned,
    t2.transaction_time AS returned_time,

    ROUND(
        ABS(t2.amount - t1.amount) / t1.amount * 100,
        2
    ) AS amount_difference_percentage

FROM transactions t1

INNER JOIN transactions t2
    ON t1.from_account = t2.to_account
    AND t1.to_account = t2.from_account
    AND t2.transaction_time > t1.transaction_time
    AND t2.transaction_time <= t1.transaction_time + INTERVAL '24 hours'

WHERE
    ABS(t2.amount - t1.amount) <= t1.amount * 0.10

ORDER BY t1.transaction_time;