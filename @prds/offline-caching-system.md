# Offline & Caching System - Product Requirements Document

## Overview

Implement a robust offline-first architecture with intelligent SQLite caching, smart synchronization, and seamless online/offline transitions to ensure FlowQuest works reliably regardless of network connectivity.

## Problem Statement

ServiceNow mobile users frequently work in environments with poor connectivity:
- Field technicians need incident details in areas with weak cell service
- Executives need dashboard data while traveling internationally
- Remote workers experience unreliable internet connections
- Current ServiceNow mobile app becomes unusable without connectivity
- No indication of data freshness or offline availability

## Solution

**Offline-First Architecture**: App designed to work offline by default with online as enhancement
**Intelligent Caching**: Priority-based data caching with predictive prefetching
**Smart Synchronization**: Efficient sync strategies that minimize data usage and battery drain
**Seamless Transitions**: Visual indicators and smooth handoffs between offline/online modes

## User Stories

### Core Offline Stories
- **As a field technician**, I want to view incident details offline, so I can continue working in areas with poor connectivity
- **As a mobile user**, I want to see which data is cached vs live, so I understand the freshness of information
- **As a traveling executive**, I want to view dashboard metrics offline, so I stay informed during flights or international travel
- **As an approver**, I want approval requests cached locally, so I can review them without connectivity

### Sync & Performance Stories
- **As a user returning online**, I want my offline actions automatically synced, so I don't lose work or need manual steps
- **As a mobile user**, I want efficient sync that doesn't drain my battery, so the app remains practical for daily use
- **As a user with limited data**, I want control over sync frequency and data usage, so I manage my mobile plan effectively

### Data Management Stories
- **As a user**, I want the most important data cached first (my assigned incidents), so critical information is always available
- **As an app user**, I want old cached data automatically cleaned up, so storage doesn't grow indefinitely
- **As a professional**, I want sensitive data properly secured in cache, so offline storage doesn't compromise security

## Technical Requirements

### SQLite Database Architecture
```sql
-- Core tables for cached ServiceNow data
CREATE TABLE incidents (
  sys_id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  state INTEGER,
  priority INTEGER,
  assigned_to TEXT,
  short_description TEXT,
  description TEXT,
  sys_created_on TIMESTAMP,
  sys_updated_on TIMESTAMP,
  cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cache_priority INTEGER DEFAULT 1,
  is_dirty BOOLEAN DEFAULT 0 -- Modified offline
);

CREATE TABLE assets (
  sys_id TEXT PRIMARY KEY,
  asset_tag TEXT,
  display_name TEXT,
  state INTEGER,
  model_category TEXT,
  assigned_to TEXT,
  install_status INTEGER,
  sys_updated_on TIMESTAMP,
  cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cache_priority INTEGER DEFAULT 1,
  is_dirty BOOLEAN DEFAULT 0
);

-- Metadata tables
CREATE TABLE sync_metadata (
  table_name TEXT PRIMARY KEY,
  last_sync_timestamp TIMESTAMP,
  sync_token TEXT,
  sync_strategy TEXT, -- 'priority', 'incremental', 'full'
  next_sync_due TIMESTAMP
);

CREATE TABLE offline_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  record_sys_id TEXT NOT NULL,
  action_type TEXT NOT NULL, -- 'create', 'update', 'delete'
  payload TEXT, -- JSON of changes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  retry_count INTEGER DEFAULT 0,
  last_retry TIMESTAMP,
  error_message TEXT
);

-- User preferences
CREATE TABLE cache_preferences (
  user_sys_id TEXT,
  setting_key TEXT,
  setting_value TEXT,
  PRIMARY KEY (user_sys_id, setting_key)
);
```

### Caching Strategy Framework
```typescript
interface CacheStrategy {
  // Priority-based caching
  priority: {
    level1: string[]; // User's assigned records
    level2: string[]; // Team records
    level3: string[]; // Department records
    level4: string[]; // Recently viewed
  };

  // Cache limits
  limits: {
    maxStorageSize: number; // 500MB default
    maxRecordsPerTable: number; // 1000 default
    maxAge: number; // 7 days default
  };

  // Sync strategies
  sync: {
    incremental: boolean; // Use sys_updated_on timestamps
    batchSize: number; // Records per sync request
    frequency: number; // Minutes between syncs
    wifiOnly: boolean; // Only sync on WiFi
  };
}
```

### Offline Action Queuing
```typescript
interface OfflineAction {
  id: number;
  tableName: string;
  recordSysId: string;
  actionType: 'create' | 'update' | 'delete' | 'comment';
  payload: any;
  createdAt: Date;
  retryCount: number;
  lastRetry?: Date;
  errorMessage?: string;
}

interface OfflineActionManager {
  queue: (action: OfflineAction) => Promise<void>;
  sync: () => Promise<SyncResult>;
  retry: (actionId: number) => Promise<void>;
  cancel: (actionId: number) => Promise<void>;
  getPendingActions: () => Promise<OfflineAction[]>;
}
```

## Cache Management Implementation

### Intelligent Prefetching
- **User Pattern Analysis**: Learn which data user accesses most frequently
- **Predictive Loading**: Preload related records (incidents → assets → users)
- **Time-based Patterns**: Cache data for user's typical work hours
- **Location Awareness**: Preload data when entering areas with poor connectivity

### Cache Prioritization Algorithm
```typescript
interface CachePriority {
  calculatePriority: (record: ServiceNowRecord, context: UserContext) => number;

  factors: {
    assignment: number;     // Weight: 10 - Assigned to user
    recent: number;         // Weight: 8  - Recently accessed
    priority: number;       // Weight: 7  - P1/P2 incidents
    team: number;          // Weight: 5  - Team member records
    department: number;    // Weight: 3  - Department records
    age: number;          // Weight: -2 - Older records negative weight
  };
}
```

### Storage Management
- **Automatic Cleanup**: Remove least-recently-used data when approaching storage limits
- **User Control**: Settings for cache size, sync frequency, WiFi-only mode
- **Data Categories**: Different retention policies for incidents vs reference data
- **Emergency Cleanup**: Aggressive cleanup when device storage critically low

## Synchronization Strategies

### Incremental Sync Protocol
```typescript
interface SyncProtocol {
  // For each table, track last sync timestamp
  getLastSync: (tableName: string) => Promise<Date>;

  // Query ServiceNow for records newer than last sync
  getIncrementalData: (tableName: string, since: Date) => Promise<ServiceNowRecord[]>;

  // Update local cache and sync timestamp
  updateCache: (tableName: string, records: ServiceNowRecord[]) => Promise<void>;

  // Handle conflicts (ServiceNow wins, queue user changes)
  resolveConflicts: (localRecord: any, serverRecord: any) => ConflictResolution;
}
```

### Conflict Resolution
- **Server Authoritative**: ServiceNow is always source of truth
- **Queue User Changes**: Local modifications queued for retry
- **Merge Strategies**: Smart merging for non-conflicting fields
- **User Notification**: Alert users when conflicts occur with resolution options

### Sync Performance Optimization
- **Batch Operations**: Group multiple record updates into single requests
- **Compressed Payloads**: Use gzip compression for sync data
- **Delta Sync**: Only transfer changed fields, not entire records
- **Background Sync**: Use iOS Background App Refresh and Android background services

## User Experience Design

### Offline Indicators
```typescript
interface OfflineUIState {
  connectionStatus: 'online' | 'offline' | 'syncing';
  dataFreshness: {
    lastSync: Date;
    cacheStatus: 'fresh' | 'stale' | 'offline-only';
  };
  syncProgress: {
    isActive: boolean;
    completed: number;
    total: number;
    currentTable: string;
  };
  offlineActions: {
    pending: number;
    failed: number;
  };
}
```

### Visual Design Patterns
- **Connection Status Bar**: Subtle indicator at top of screen
- **Data Freshness Badges**: Small indicators on cards showing cache age
- **Sync Progress**: Animated progress indicator during background sync
- **Offline Action Queue**: Visual queue of pending actions with retry options

### Settings & Preferences
- **Sync Frequency**: Never, WiFi Only, Hourly, Daily options
- **Cache Size**: 100MB, 250MB, 500MB, 1GB options
- **Priority Tables**: User selects which ServiceNow tables to prioritize
- **Data Usage Warnings**: Alerts when approaching mobile data limits

## Acceptance Criteria

### Must Have - Core Offline Functionality
- [ ] App displays cached incident, asset, and people data when offline
- [ ] Visual indicators clearly show online/offline status and data freshness
- [ ] Most common read operations (view incidents, asset details) work offline
- [ ] Automatic sync when connectivity restored without user intervention

### Must Have - Data Management
- [ ] SQLite database properly encrypted and secured
- [ ] Cache size limits respected with automatic cleanup
- [ ] User's assigned records cached with highest priority
- [ ] Sync preferences accessible and functional in settings

### Should Have - Advanced Sync
- [ ] Offline actions queued and synced when online
- [ ] Incremental sync using timestamps for efficiency
- [ ] Conflict resolution with user notification
- [ ] Background sync with progress indicators

### Could Have - Intelligent Features
- [ ] Predictive caching based on user patterns
- [ ] Location-aware cache management
- [ ] Advanced conflict resolution with merge options
- [ ] Analytics on cache hit rates and sync efficiency

## Performance Requirements

### Storage Efficiency
- **Maximum Cache Size**: 500MB default, 1GB maximum
- **Database Performance**: <100ms for typical queries
- **Sync Efficiency**: <10MB data transfer for typical incremental sync
- **Background Impact**: <5% CPU usage during background sync

### Battery Optimization
- **Sync Frequency**: Configurable from hourly to daily
- **Background Activity**: Use iOS Background App Refresh efficiently
- **Network Usage**: Batch operations to minimize radio wake-ups
- **Storage Access**: Minimize SQLite writes to reduce power consumption

### Network Efficiency
- **Compression**: Achieve >50% reduction in sync data size
- **Request Batching**: Combine related API calls
- **CDN Usage**: Cache static data (choice lists) with long TTL
- **Retry Logic**: Exponential backoff for failed sync operations

## Implementation Phases

### Phase 1: Basic Caching
- SQLite database setup with core tables
- Basic data caching for incidents and assets
- Simple sync mechanism with manual triggers

### Phase 2: Intelligent Sync
- Automatic incremental sync with timestamp tracking
- Priority-based caching algorithm
- Basic offline action queuing

### Phase 3: Advanced Features
- Predictive caching and pattern learning
- Comprehensive conflict resolution
- Advanced UI indicators and sync progress

### Phase 4: Optimization
- Performance optimization and battery efficiency
- Advanced cache management and cleanup
- Analytics and monitoring of cache effectiveness

## Security Considerations

### Data Protection
- **SQLite Encryption**: Database encrypted with device keychain
- **Secure Cleanup**: Proper data wiping when clearing cache
- **Access Control**: Cache data respects ServiceNow ACLs
- **Audit Trail**: Log cache access for security monitoring

### Privacy Compliance
- **Data Minimization**: Only cache necessary data
- **Retention Policies**: Automatic cleanup based on data sensitivity
- **User Control**: Users can clear cache and control what's stored
- **Compliance**: Meet GDPR, CCPA requirements for cached data

---

**Priority**: P1 (High)
**Estimate**: 5-6 sprints
**Dependencies**: SQLite integration, ServiceNow API client, background sync framework
**Success Criteria**: Seamless offline experience with intelligent caching that makes the app faster and more reliable than online-only alternatives