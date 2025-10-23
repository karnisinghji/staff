-- Location History Table
-- Stores GPS location updates with timestamps for historical tracking

CREATE TABLE IF NOT EXISTS location_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- References users(id) but no FK constraint due to missing PK
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(10, 2), -- GPS accuracy in meters (optional)
    location_name VARCHAR(255), -- Reverse geocoded address (optional)
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(50) DEFAULT 'manual', -- 'manual', 'auto', 'background', etc.
    
    -- Constraints for data validation
    CONSTRAINT valid_latitude CHECK (latitude >= -90 AND latitude <= 90),
    CONSTRAINT valid_longitude CHECK (longitude >= -180 AND longitude <= 180)
);

-- Index for fast user queries
CREATE INDEX idx_location_history_user_id ON location_history(user_id);

-- Index for time-based queries (most recent first)
CREATE INDEX idx_location_history_recorded_at ON location_history(recorded_at DESC);

-- Composite index for user + time range queries
CREATE INDEX idx_location_history_user_time ON location_history(user_id, recorded_at DESC);

-- Optional: Create a function to auto-cleanup old records (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_location_history()
RETURNS void AS $$
BEGIN
    DELETE FROM location_history 
    WHERE recorded_at < CURRENT_TIMESTAMP - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Optional: Schedule automatic cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-location-history', '0 2 * * *', 'SELECT cleanup_old_location_history()');

COMMENT ON TABLE location_history IS 'Stores historical GPS location data for users with timestamps';
COMMENT ON COLUMN location_history.accuracy IS 'GPS accuracy in meters from device';
COMMENT ON COLUMN location_history.source IS 'How location was captured: manual, auto, background';
COMMENT ON COLUMN location_history.recorded_at IS 'When this location was recorded';
