# Asset Management Hub - Product Requirements Document

## Overview

Transform ServiceNow's ITAM (IT Asset Management) tables into an interactive, lifecycle-aware mobile interface with visual asset tracking, contract management, and intuitive carousel navigation.

## Problem Statement

Current ServiceNow asset management experience:
- Complex CI (Configuration Item) tables with 20+ columns
- Asset lifecycle hidden in dropdown fields and audit logs
- Contract expiration dates buried in related records
- No visual indication of asset health or compliance status
- Mobile interface replicates desktop complexity

## Solution

**Asset Carousel Interface**: Swipeable categories (Hardware, Software, Facilities) with card-based asset display
**Lifecycle Visualization**: Visual timeline showing asset journey from procurement to retirement
**Contract Pulse System**: Animated indicators for contract renewals and expirations
**Asset Profile Cards**: Expandable cards showing key metrics, assignment, and related contracts

## User Stories

### Core Stories
- **As an IT asset manager**, I want to see assets organized by category in swipeable carousels, so I can quickly navigate between hardware, software, and facilities
- **As a procurement specialist**, I want contract expiration dates shown as animated progress bars, so I can prioritize renewals
- **As a facility manager**, I want to see asset lifecycle stages visually, so I understand replacement planning needs
- **As an admin**, I want to assign/reassign assets through drag-and-drop gestures, so I can manage allocations efficiently

### Secondary Stories
- **As a compliance officer**, I want expired/expiring contracts highlighted with pulsing indicators, so I don't miss renewals
- **As an asset owner**, I want to see all my assigned assets in a personalized view, so I can track my responsibilities
- **As a technician**, I want to update asset status through quick actions, so I can maintain accurate records

## Functional Requirements

### Asset Carousel Navigation
- **Category carousels**: Hardware, Software, Facilities, Vehicles (if applicable)
- **Horizontal scrolling**: Smooth carousel with momentum and snap-to-card
- **Category indicators**: Dots or tabs showing current carousel position
- **Quick jump**: Tap category headers to jump between carousels

### Asset Profile Cards
- **Visual hierarchy**: Asset image/icon, name, status, assigned user
- **Lifecycle indicator**: Progress ring or timeline showing current stage
- **Contract status**: Visual indicators for active, expiring, expired contracts
- **Quick stats**: Purchase date, warranty status, cost center

### Lifecycle Visualization
- **Stage timeline**: Requested → Ordered → Received → In Use → Retired
- **Progress indicators**: Animated progression through lifecycle stages
- **Time-based visuals**: Show duration in each stage, expected retirement
- **Health scoring**: Visual indicators for asset condition and compliance

### Contract Management
- **Expiration alerts**: Pulsing red indicators for contracts expiring <30 days
- **Renewal reminders**: Orange indicators for contracts expiring <90 days
- **Contract timeline**: Visual representation of contract periods and renewals
- **Cost tracking**: Budget vs actual spending indicators

## Technical Requirements

### Mock Asset Data Service
- **Asset categories**: Hardware (laptops, servers), Software (licenses), Facilities (desks, conference rooms)
- **Realistic lifecycle data**: Various stages with appropriate time distributions
- **Contract relationships**: Link assets to contracts with expiration dates
- **User assignments**: Mix of assigned and unassigned assets

### Data Models
```typescript
interface Asset {
  sys_id: string;
  asset_tag: string;
  display_name: string;
  category: AssetCategory;
  state: AssetState;
  lifecycle_stage: LifecycleStage;
  lifecycle_progress: number; // 0-100
  assigned_to?: User;
  install_status: InstallStatus;
  purchase_date: Date;
  warranty_expiration?: Date;
  cost: number;
  cost_center: string;
  contracts: Contract[];
  location?: Location;
}
```

### UI Components
- **AssetCarousel**: Horizontal scrolling container for asset categories
- **AssetCard**: Individual asset display with lifecycle and contract indicators
- **LifecycleRing**: Circular progress component showing asset lifecycle stage
- **ContractIndicator**: Visual alert system for contract status
- **AssetDetail**: Expandable sheet with full asset information

### Animation Requirements
- **Smooth carousel scrolling**: 60+ FPS horizontal scrolling with physics
- **Lifecycle animations**: Progress ring fills and stage transitions
- **Contract pulsing**: Attention-grabbing animations for urgent renewals
- **Card interactions**: Smooth expansion/collapse of asset details

## Acceptance Criteria

### Must Have
- [ ] Assets Hub displays horizontal carousels for Hardware, Software, Facilities
- [ ] Each carousel shows realistic mock asset data with proper categorization
- [ ] Asset cards display lifecycle progress as animated rings or timelines
- [ ] Contract expiration indicators pulse for urgent renewals (<30 days)
- [ ] Tap asset card to expand full details in bottom sheet
- [ ] Pull-to-refresh updates asset data across all carousels

### Should Have
- [ ] Lifecycle timeline shows asset journey from procurement to retirement
- [ ] Contract renewal alerts with visual urgency indicators
- [ ] Asset assignment drag-and-drop or swipe gestures
- [ ] Search and filter assets within each category
- [ ] Asset health scoring based on warranty, age, and maintenance

### Could Have
- [ ] Asset QR code scanning for quick lookup
- [ ] Location-based asset filtering and mapping
- [ ] Cost analytics with spending trends and budget alerts
- [ ] Photo capture for asset documentation
- [ ] Bulk asset operations and batch updates

## Success Metrics

### User Experience
- **Navigation efficiency**: <3 seconds to find specific asset across categories
- **Contract awareness**: 100% of expiring contracts (<30 days) visually highlighted
- **Data comprehension**: Users identify asset lifecycle stage within 2 seconds

### Technical Performance
- **Carousel performance**: Smooth 60+ FPS scrolling with 100+ assets per category
- **Memory management**: <150MB memory usage with full asset dataset
- **Animation responsiveness**: Lifecycle and contract animations maintain performance

## Implementation Phases

### Phase 1: Basic Structure
- Carousel navigation between asset categories
- Static asset cards with mock data
- Basic lifecycle indicators (text-based)

### Phase 2: Visual Enhancement
- Animated lifecycle progress rings
- Contract expiration visual indicators
- Asset card expansion with detailed views

### Phase 3: Interactive Features
- Asset assignment gestures
- Search and filtering within categories
- Contract management workflows

### Phase 4: Advanced Features
- QR code integration
- Cost analytics and trending
- Bulk operations and batch management

## Future Considerations

### ServiceNow Integration
- CMDB (Configuration Management Database) sync
- Real-time asset tracking with IoT sensors
- Automated lifecycle stage progression
- Contract workflow integration

### Enterprise Features
- Multi-location asset management
- Compliance reporting and audit trails
- Integration with procurement and finance systems
- Asset performance analytics and predictive maintenance

---

**Priority**: P1
**Estimate**: 3-4 sprints
**Dependencies**: Mock data service, carousel component library, animation framework
**Success Criteria**: Intuitive asset browsing experience with clear lifecycle visibility and proactive contract management