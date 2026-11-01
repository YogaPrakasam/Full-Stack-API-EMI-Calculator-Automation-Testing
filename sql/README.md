# SQL Assessment Solutions

This folder contains solutions for both SQL challenges in the Streamhub QA Automation Assessment.

## Scenario 1: Round Trip Transactions

**Objective:** Identify transactions where Account A sends money to Account B, and Account B returns a similar amount (within 10%) within 24 hours.

- Schema: `schemas/transactions_schema.sql`
- Sample Data: `queries/round_trip_sample_data.sql`
- SQL Query: `queries/round_trip_transactions.sql`

**Execution Result:** Successfully identified two valid round-trip transactions.

**DB Fiddle:** https://www.db-fiddle.com/f/zpUSZnY1YMeYuehk8kZsS/5

## Scenario 2: IPL Player Performance Streaks

**Objective:** Identify IPL 2024 players who scored 30 or more runs in at least three consecutive matches.

- Schema and Sample Data: `schemas/ipl_batting_schema.sql`
- SQL Query: `queries/ipl_batting_streaks.sql`

**Execution Result:** Successfully identified players meeting the consecutive scoring criteria.

**Expected Results:**
- Virat Kohli – 3 consecutive matches.
- Ruturaj Gaikwad – 4 consecutive matches.

**DB Fiddle:** https://www.db-fiddle.com/f/dvd8NfQfaxNBYNTxKqbMGf/1

## Database

PostgreSQL v19 (Beta).

Both SQL solutions were executed successfully using DB Fiddle.