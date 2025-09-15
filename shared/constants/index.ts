// Shared constants across mobile app and backend

// ServiceNow API Endpoints
export const SERVICENOW_ENDPOINTS = {
  INCIDENTS: '/api/now/table/incident',
  ASSETS: '/api/now/table/alm_asset',
  USERS: '/api/now/table/sys_user',
  OAUTH_TOKEN: '/oauth_token.do',
  OAUTH_REFRESH: '/oauth_token.do',
} as const;

// OAuth Scopes
export const OAUTH_SCOPES = [
  'useraccount',
  'glide.read',
  'glide.write', 
  'user_profile'
] as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  SPRING: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  TIMING: {
    duration: 300,
  },
  GESTURE_THRESHOLD: {
    SWIPE_RESOLVE: 120,
    SWIPE_ESCALATE: -120,
    LONG_PRESS: 500,
  },
} as const;

// Colors (will be expanded into full design system)
export const COLORS = {
  PRIMARY: '#2563EB',
  SECONDARY: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  SUCCESS: '#10B981',
  
  // Priority Colors
  PRIORITY: {
    1: '#EF4444', // Critical - Red
    2: '#F59E0B', // High - Amber  
    3: '#10B981', // Moderate - Green
    4: '#6B7280', // Low - Gray
    5: '#8B5CF6', // Planning - Purple
  },
  
  // State Colors
  INCIDENT_STATE: {
    1: '#3B82F6', // New - Blue
    2: '#F59E0B', // In Progress - Amber
    3: '#EF4444', // On Hold - Red
    6: '#10B981', // Resolved - Green
    7: '#6B7280', // Closed - Gray
    8: '#EF4444', // Canceled - Red
  },
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  TOKEN_EXPIRES_AT: 'token_expires_at',
  USER_SYS_ID: 'user_sys_id',
  INSTANCE_URL: 'instance_url',
  USER_PREFERENCES: 'user_preferences',
  CACHED_DATA_VERSION: 'cached_data_version',
} as const;

// Database Configuration
export const DB_CONFIG = {
  NAME: 'flowquest.db',
  VERSION: 1,
  TABLES: {
    INCIDENTS: 'incidents',
    ASSETS: 'assets', 
    USERS: 'users',
    SYNC_METADATA: 'sync_metadata',
  },
} as const;