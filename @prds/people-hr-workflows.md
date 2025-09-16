# People & HR Workflows - Product Requirements Document

## Overview

Transform ServiceNow's HRSD (HR Service Delivery) and CSM (Customer Service Management) into engaging, human-centered mobile experiences with gamified onboarding, visual case management, and employee journey tracking.

## Problem Statement

Current ServiceNow HR and customer service experience:
- Generic case tables treat people like tickets
- Onboarding checklists are static, overwhelming forms
- Employee and customer information scattered across multiple modules
- No visual progress indicators for HR processes
- Mobile experience lacks human touch and engagement

## Solution

**People-First Interface**: Profile-based cards showing employees/customers as individuals, not records
**Gamified Onboarding**: Visual journey maps with milestone celebrations and progress tracking
**Contextual Case Management**: HR and customer cases linked to person profiles with smart suggestions
**Journey Visualization**: Timeline views showing employee lifecycle and interaction history

## User Stories

### Employee Onboarding Stories
- **As an HR coordinator**, I want to see new hire onboarding as a visual journey with completed/pending milestones, so I can track progress at a glance
- **As a new employee**, I want to complete onboarding tasks with clear progress indicators and celebrations, so the process feels engaging rather than overwhelming
- **As a manager**, I want to see my team's onboarding progress with visual indicators, so I can provide support where needed

### HR Case Management Stories
- **As an HR specialist**, I want employee cases displayed as person-centered cards, so I can see the human context behind each request
- **As an employee**, I want to submit HR requests with guided forms and smart suggestions, so I get faster resolution
- **As a case manager**, I want related cases and employee history surfaced automatically, so I can provide better support

### Customer Service Stories
- **As a CSM agent**, I want customer profiles with interaction history and case context, so I can personalize service
- **As a customer**, I want to track my case status with visual progress indicators, so I know what to expect

## Functional Requirements

### People Hub Interface
- **Person-centered cards**: Employee/customer photos, names, roles, key contact info
- **Smart grouping**: New hires, my team, VIP customers, active cases
- **Quick actions**: Call, email, message, view profile, create case
- **Search and filter**: By department, location, case type, priority

### Onboarding Journey Visualization
- **Progress timeline**: Visual journey from pre-boarding through first 90 days
- **Milestone cards**: IT setup, badge creation, training completion, manager check-ins
- **Completion celebrations**: Lottie animations for completed milestones
- **Progress scoring**: Percentage complete with visual progress rings

### HR Case Management
- **Case-to-person linking**: Cases always connected to employee profiles
- **Contextual information**: Show employee's department, manager, recent cases
- **Smart suggestions**: Recommend solutions based on similar cases
- **Status visualization**: Clear progress indicators for case resolution

### Employee Profiles
- **Comprehensive view**: Role, department, manager, direct reports, location
- **Interaction history**: Timeline of HR cases, performance reviews, feedback
- **Quick stats**: Tenure, case history, satisfaction scores
- **Related content**: Team members, recent cases, upcoming milestones

## Technical Requirements

### Mock People Data Service
- **Employee profiles**: Realistic names, roles, departments, photos (placeholder avatars)
- **Onboarding stages**: Various completion states and milestone progress
- **HR cases**: Mix of benefits, IT requests, policy questions, time-off requests
- **Customer profiles**: B2B customers with company context and case history

### Data Models
```typescript
interface Person {
  sys_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  type: 'employee' | 'customer';

  // Employee-specific
  employee_number?: string;
  department?: string;
  job_title?: string;
  manager?: Person;
  location?: Location;
  hire_date?: Date;

  // Customer-specific
  company?: string;
  account_tier?: 'bronze' | 'silver' | 'gold' | 'platinum';

  // Common
  cases: Case[];
  interactions: Interaction[];
}

interface OnboardingJourney {
  employee: Person;
  stages: OnboardingStage[];
  overall_progress: number;
  current_stage: string;
  completion_date?: Date;
}

interface OnboardingStage {
  id: string;
  name: string;
  description: string;
  tasks: OnboardingTask[];
  progress: number;
  completed: boolean;
  celebration_animation?: string;
}
```

### UI Components
- **PersonCard**: Profile card with photo, name, role, quick actions
- **OnboardingProgress**: Visual journey with milestone indicators
- **CaseCard**: HR/customer case linked to person profile
- **PersonProfile**: Expandable full profile with history and context
- **JourneyTimeline**: Visual representation of employee lifecycle

### Gamification Elements
- **Progress celebrations**: Lottie animations for completed milestones
- **Achievement badges**: Recognize onboarding completion, case resolution
- **Progress scoring**: Visual indicators for completion percentages
- **Milestone rewards**: Virtual celebrations and acknowledgments

## Acceptance Criteria

### Must Have - Onboarding
- [ ] People Hub displays new hires with visual onboarding progress
- [ ] Onboarding journey shows stages: IT Setup, Badge, Training, Welcome
- [ ] Completed milestones trigger celebration animations
- [ ] Progress rings show overall completion percentage
- [ ] Managers can view team onboarding progress

### Must Have - HR Cases
- [ ] HR cases displayed as person-centered cards, not generic tickets
- [ ] Employee context (department, manager, location) visible in case view
- [ ] Case status shown with visual progress indicators
- [ ] Related cases and employee history surfaced automatically

### Should Have
- [ ] Employee profiles with comprehensive information and history
- [ ] Smart case categorization and routing based on employee context
- [ ] Customer service cases with similar person-centered approach
- [ ] Search and filtering by person attributes and case types

### Could Have
- [ ] Employee satisfaction scoring and feedback tracking
- [ ] Team relationship mapping and organizational charts
- [ ] Predictive case routing based on employee patterns
- [ ] Integration with calendar for scheduling and availability

## User Experience Principles

### Human-Centered Design
- **People first**: Always show person context before case/ticket details
- **Visual hierarchy**: Photos and names prominently displayed
- **Contextual information**: Surface relevant background automatically
- **Personalized interactions**: Tailor experience to role and relationships

### Gamification (Subtle)
- **Progress visualization**: Clear indicators without being childish
- **Milestone recognition**: Celebrate achievements appropriately for enterprise context
- **Achievement tracking**: Personal and team progress visibility
- **Positive reinforcement**: Focus on completion and success, not competition

## Success Metrics

### Onboarding Experience
- **Completion rates**: >95% of onboarding tasks completed within timeline
- **Time to productivity**: 25% reduction in new hire ramp-up time
- **Satisfaction scores**: >4.5/5 rating for onboarding experience

### Case Management
- **Resolution time**: 30% faster resolution for cases with full person context
- **First-contact resolution**: Increased success rate with employee history visibility
- **User satisfaction**: >4.0/5 rating for HR service experience

## Implementation Phases

### Phase 1: People Foundation
- Person-centered card interface
- Basic employee and customer profiles
- Mock data service with realistic people data

### Phase 2: Onboarding Gamification
- Visual onboarding journey with progress tracking
- Milestone celebrations and achievement animations
- Manager dashboard for team progress monitoring

### Phase 3: Case Integration
- HR cases linked to employee profiles
- Contextual information and history display
- Smart suggestions and case routing

### Phase 4: Advanced Features
- Customer service integration
- Predictive analytics and case routing
- Team relationship mapping and organizational insights

## Future Considerations

### ServiceNow Integration
- Active Directory sync for employee data
- HRSD case management integration
- CSM customer profile synchronization
- Performance management and review integration

### Advanced Analytics
- Employee satisfaction trend analysis
- Case resolution pattern recognition
- Predictive support and intervention recommendations
- Team dynamics and collaboration insights

---

**Priority**: P2
**Estimate**: 4-5 sprints
**Dependencies**: People data service, gamification animation library, profile component system
**Success Criteria**: Human-centered interface that makes HR and customer interactions feel personal and engaging while maintaining professional efficiency