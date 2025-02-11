-- Add columns last_checked, response_time, uptime to the websites table
ALTER TABLE websites ADD COLUMN last_checked INTEGER;
ALTER TABLE websites ADD COLUMN response_time INTEGER;
ALTER TABLE websites ADD COLUMN uptime INTEGER;