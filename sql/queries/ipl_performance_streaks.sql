-- Find players scoring 30+ runs in at least
-- 3 consecutive matches during IPL 2024.

WITH batting_streaks AS (
    SELECT
        player_id,
        player_name,
        match_date,
        runs_scored,
        match_id,

        ROW_NUMBER() OVER (
            PARTITION BY player_id
            ORDER BY match_date, match_id
        ) AS match_number,

        ROW_NUMBER() OVER (
            PARTITION BY player_id, 
            CASE WHEN runs_scored >= 30 THEN 1 ELSE 0 END
            ORDER BY match_date, match_id
        ) AS streak_group

    FROM ipl_batting
),

qualified_streaks AS (
    SELECT
        player_name,
        MIN(match_date) AS streak_start_date,
        COUNT(*) AS consecutive_matches

    FROM batting_streaks

    WHERE runs_scored >= 30

    GROUP BY
        player_id,
        player_name,
        match_number - streak_group

    HAVING COUNT(*) >= 3
)

SELECT
    player_name,
    streak_start_date,
    consecutive_matches

FROM qualified_streaks

ORDER BY streak_start_date;git add sqlgit add sql