-- FlowQuest Development Database Initialization
-- This file initializes the PostgreSQL database for local development/mocking

-- Create development schema
CREATE SCHEMA IF NOT EXISTS flowquest_dev;

-- Mock ServiceNow incidents table for development
CREATE TABLE IF NOT EXISTS flowquest_dev.incidents (
    sys_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number VARCHAR(40) NOT NULL UNIQUE,
    state INTEGER NOT NULL DEFAULT 1,
    priority INTEGER NOT NULL DEFAULT 3,
    assigned_to VARCHAR(32),
    caller_id VARCHAR(32),
    short_description TEXT,
    description TEXT,
    category VARCHAR(40),
    subcategory VARCHAR(40),
    opened_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    closed_at TIMESTAMP,
    sys_updated_on TIMESTAMP DEFAULT NOW(),
    sys_created_on TIMESTAMP DEFAULT NOW()
);

-- Mock ServiceNow assets table for development
CREATE TABLE IF NOT EXISTS flowquest_dev.assets (
    sys_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_tag VARCHAR(40) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    state INTEGER NOT NULL DEFAULT 1,
    model_category VARCHAR(40),
    assigned_to VARCHAR(32),
    location VARCHAR(100),
    cost DECIMAL(10,2),
    purchase_date DATE,
    warranty_expiration DATE,
    sys_updated_on TIMESTAMP DEFAULT NOW(),
    sys_created_on TIMESTAMP DEFAULT NOW()
);

-- Insert sample development data
INSERT INTO flowquest_dev.incidents (number, state, priority, assigned_to, short_description, category) VALUES
('INC0001001', 2, 1, 'admin', 'Database server not responding', 'Software'),
('INC0001002', 1, 2, 'admin', 'User cannot access email', 'Network'),
('INC0001003', 3, 3, NULL, 'Printer toner replacement needed', 'Hardware'),
('INC0001004', 2, 2, 'admin', 'Application login issues', 'Software'),
('INC0001005', 1, 1, NULL, 'Critical system outage', 'Infrastructure')
ON CONFLICT (number) DO NOTHING;

INSERT INTO flowquest_dev.assets (asset_tag, display_name, state, model_category, assigned_to, location) VALUES
('LAPTOP001', 'Dell Latitude 7420', 1, 'Computer', 'john.doe', 'New York Office'),
('LAPTOP002', 'MacBook Pro 16"', 1, 'Computer', 'jane.smith', 'Remote'),
('PRINTER001', 'HP LaserJet Pro', 1, 'Printer', NULL, 'Floor 2 Copy Room'),
('MONITOR001', 'Dell UltraSharp 27"', 1, 'Monitor', 'bob.wilson', 'Chicago Office'),
('SERVER001', 'Dell PowerEdge R740', 1, 'Server', NULL, 'Data Center Rack A1')
ON CONFLICT (asset_tag) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_incidents_assigned_to ON flowquest_dev.incidents(assigned_to);
CREATE INDEX IF NOT EXISTS idx_incidents_state ON flowquest_dev.incidents(state);
CREATE INDEX IF NOT EXISTS idx_assets_assigned_to ON flowquest_dev.assets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_assets_state ON flowquest_dev.assets(state);