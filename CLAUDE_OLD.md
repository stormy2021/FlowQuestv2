# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# FlowQuest: Next-Generation ServiceNow Mobile Experience

## Project Context & Vision

**FlowQuest** is a revolutionary mobile interface for ServiceNow that transforms the traditional "endless menus and static tables" experience into a fluid, interactive, mobile-native workflow application. This project represents a complete reimagining of how enterprise users interact with ServiceNow on mobile devices.

### The Challenge
ServiceNow's current mobile experience largely recycles web navigation patterns, inheriting complexity instead of rethinking workflows for mobile-first users. Users often click through 6+ steps (module → submodule → list → form → sub-tab → action) just to resolve an incident or approve a change.

### FlowQuest's Solution
- **Cards instead of tables** - Visual, scannable incident/asset/people data
- **Carousels instead of static lists** - Swipeable, categorized content  
- **Inline quick actions** - Resolve, assign, escalate via gestures
- **Guided flows** - Progressive disclosure replacing 30-field forms
- **Animated dashboards** - Live, engaging metrics vs static charts
- **Hub-based navigation** - 6 intuitive hubs vs endless menu hierarchies

## Project Context

**Creator Background**: ServiceNow platform professional exploring mobile UX improvements. Learning modern mobile development while applying ServiceNow domain knowledge to create better mobile workflows.

## Strategic Goals

### Primary Objectives
1. **Learning Project**: Explore modern mobile development while solving real ServiceNow UX problems
2. **Community Value**: Share learnings and hopefully create something useful for ServiceNow users
3. **Open Source Contribution**: First attempt at building and maintaining a public project
4. **UX Exploration**: Test ideas for improving ServiceNow's mobile experience

### Success Metrics
- **Technical**: Working mobile app that improves on ServiceNow's current mobile experience
- **Learning**: Gain experience with React Native, Azure, and modern mobile development
- **Community**: Positive feedback and potential contributions from ServiceNow community
- **Open Source**: Learn to manage and maintain a public project

## Technical Architecture Philosophy

### Experimental Approach: Client-Heavy, Server-Light  
**Core Idea**: ServiceNow already provides APIs and global infrastructure. Instead of building complex middleware, try connecting mobile apps directly to ServiceNow APIs.

**Architecture Decisions**:
- **Direct API Integration**: React Native → ServiceNow APIs (no middleware proxy)
- **Local-First Data**: SQLite caching, secure storage, offline-capable
- **Minimal Backend**: Azure Functions for OAuth refresh + webhooks only ($5-10/month)
- **Enterprise Alignment**: Azure platform (strategic ServiceNow partnership)
- **Security-First**: Leverage ServiceNow's enterprise security vs custom middleware risks

## ServiceNow Version Targeting

### Target Version: Zurich (Latest, Q4 2025)
**Strategic Rationale**:
- **Innovation Leader**: Position as cutting-edge vs legacy-focused
- **API Advantage**: Latest REST APIs, enhanced real-time capabilities
- **Market Timing**: Enterprises upgrade within 1-2 release cycles
- **Instructor Credibility**: Showcases expertise with latest platform features

**Backward Compatibility**: Core APIs stable across Vancouver → Washington → Zurich
**Future-Proof**: Built for upcoming Yokohama (Q2 2026) features

## Mobile Platform Strategy

### React Native + TypeScript
**Framework Rationale**:
- **Animation Excellence**: Reanimated 3 (60+ FPS), Lottie (gamification), Skia (GPU rendering)
- **Enterprise Familiarity**: JavaScript ecosystem aligns with ServiceNow developer community
- **Direct Integration**: Superior HTTP clients, OAuth libraries, TypeScript support
- **Community Appeal**: More accessible for ServiceNow developers vs Flutter/Dart

**Device Targets**:
- **iOS**: 13.0+ (devices from 2018+, covers 95%+ active devices)
- **Android**: API 24+ (Android 7.0+, devices from 2017+, covers 94%+ active devices)

## Hub Framework (MVP Scope)

### Phase 1 Hubs
1. **Work Hub** - ITSM (Incidents, Problems, Changes, Requests)
2. **Assets Hub** - ITAM (Hardware, Software, Contracts, Lifecycle)  
3. **People Hub** - HRSD/CSM (HR Cases, Onboarding, Customer Cases)
4. **Me Hub** - User Profile, Preferences, Contributions, Notifications

### Future Hubs
5. **Insight Hub** - Analytics, GRC, Compliance, Dashboards
6. **Security Hub** - SecOps, Vulnerability, Threat Intelligence
7. **Automation Hub** - Flow Designer, App Engine, Integrations

## Development Approach

### Docker Development Environment
- **Containerized Development**: Docker + Cursor IDE for isolated, consistent development
- **Monorepo Structure**: React Native (mobile/) + Azure Functions (backend/) + Shared types (shared/)
- **Development Tools**: ESLint, Prettier, TypeScript across all workspaces
- **Hot Reload**: Metro bundler, Azure Functions local development

### Agile, Community-Driven Development
- **Sprint-Based**: 30-day MVP with 6 phases
- **Open Development**: Public GitHub, transparent progress
- **Community Input**: ServiceNow developer feedback integration
- **Iterative UX**: Continuous animation/interaction refinement

### Quality Standards
- **Enterprise-Grade**: Security, performance, scalability from day 1
- **User-Centric**: Mobile-first design, gesture-driven interactions
- **Developer-Friendly**: Clean architecture, comprehensive documentation
- **Production-Ready**: App Store guidelines, enterprise deployment support

## Contribution Guidelines

### Target Contributors
- **ServiceNow Developers**: Platform developers, consultants, partners
- **Mobile Engineers**: React Native, iOS/Android specialists  
- **UX Designers**: Enterprise UX, mobile interaction designers
- **DevOps Engineers**: Azure, CI/CD, mobile deployment specialists

### Contribution Philosophy
- **Quality Over Quantity**: Well-tested, documented contributions
- **Enterprise Focus**: Features that serve real ServiceNow use cases
- **Mobile-Native**: Interactions that feel natural on mobile devices
- **Performance-Conscious**: 60+ FPS animations, efficient data handling

## Business Model & Licensing

### Open Source Strategy
- **License**: MIT (maximum flexibility for enterprise adoption)
- **Commercial Use**: Explicitly encouraged for ServiceNow consultants/partners
- **Attribution**: Required for derivative works
- **Community**: Welcoming to all skill levels, with clear contribution paths

### Revenue Opportunities
- **Consulting**: ServiceNow mobile UX consulting based on FlowQuest success
- **Training**: Mobile development workshops for ServiceNow community
- **Partnership**: Potential ServiceNow technology partnership opportunities
- **Recognition**: Industry speaking, thought leadership positioning

## Risk Mitigation

### Technical Risks
- **ServiceNow API Changes**: Abstraction layer, version compatibility testing
- **Mobile Platform Changes**: React Native community support, upgrade strategies
- **Performance Issues**: Continuous profiling, optimization sprints
- **Security Concerns**: Regular security audits, ServiceNow security best practices

### Business Risks
- **ServiceNow Competition**: Complementary vs competitive positioning
- **Market Adoption**: Strong community engagement, real-world value demonstration  
- **Resource Constraints**: Sustainable development pace, community contribution cultivation
- **Platform Dependencies**: Multi-platform strategy, vendor relationship management

## Long-Term Vision

### 6-Month Goals
- **MVP Launch**: 4 core hubs, App Store publication
- **Community**: 100+ GitHub stars, active contributor base
- **Recognition**: ServiceNow community showcase, conference presentations

### 12-Month Goals  
- **Feature Complete**: All 6 hubs, advanced animations, enterprise integrations
- **Adoption**: 1000+ downloads, enterprise pilot programs
- **Ecosystem**: Plugin architecture, community extensions
- **Partnership**: ServiceNow technology partner discussions

### 24-Month Goals
- **Market Leader**: Primary alternative to ServiceNow native mobile
- **Enterprise Adoption**: Major ServiceNow customers using in production
- **Platform Evolution**: Influence ServiceNow's mobile roadmap
- **Business Impact**: Consulting practice, training programs, industry recognition

---

## Development Commands

### Quick Start/Stop Scripts
```bash
# Start complete development environment (Docker + Expo in new terminal)
./dev-start.sh

# Stop all development processes and Docker containers
./dev-stop.sh
```

### Mobile Development (React Native + Expo)
```bash
# Navigate to mobile directory first
cd mobile

# Start Expo development server (primary development command)
npx expo start --clear

# Platform-specific builds (requires iOS/Android simulators)
npm run ios                 # iOS simulator (uses expo run:ios)
npm run android            # Android emulator (uses expo run:android)

# Code quality
npm run lint               # Check linting
npm run lint:fix          # Fix linting issues
npm run format            # Format code with Prettier
npm run type-check        # TypeScript type checking

# Native platform cleanup (if build issues)
npm run clean:ios         # Clean iOS build cache
npm run clean:android     # Clean Android build cache
npm run pod-install       # Reinstall iOS dependencies
```

### Monorepo Development
```bash
# Install all dependencies (from project root)
npm run setup

# Development with all services
npm run dev                # Start mobile + backend concurrently
npm run mobile:start       # Start mobile only
npm run backend:start      # Start backend only

# Quality checks across all packages
npm run lint               # Lint all packages
npm run format             # Format all packages
npm run type-check         # Type check all packages
npm test                   # Run all tests

# Docker development environment
npm run docker:dev         # Start PostgreSQL + Redis
npm run docker:down        # Stop containers
npm run docker:logs        # View container logs
```

### Debugging and Troubleshooting
```bash
# Test Metro bundler status
curl http://localhost:8081

# Test JavaScript bundle generation
curl "http://localhost:8081/index.bundle?platform=ios" | head -20

# Check iOS project scheme
xcodebuild -project mobile/ios/FlowQuest.xcodeproj -list

# Emergency reset (if Metro/bundling issues)
cd mobile
rm -rf node_modules .expo
npm install --legacy-peer-deps
npx expo start --clear
```

## Project Architecture

### Monorepo Structure
- **mobile/**: React Native app with Expo - main application code
- **backend/**: Azure Functions - minimal serverless backend for OAuth/webhooks
- **shared/**: TypeScript types and constants shared across packages

### Mobile App Architecture (mobile/)
- **src/navigation/**: React Navigation setup with Auth → Tab flow
- **src/screens/**: 4 hub screens (Work, Assets, People, Me) + Auth
- **src/components/**: Reusable UI components
- **src/services/**: ServiceNow API clients and data services
- **src/store/**: Zustand state management
- **src/types/**: TypeScript type definitions
- **src/utils/**: Helper functions and utilities

### Key Technology Stack
- **React Native 0.73.6**: Mobile framework (compatible version with Expo SDK 50)
- **Expo SDK 50**: Development platform and tooling (downgraded for compatibility)
- **React Navigation 6**: Tab + stack navigation
- **React Native Reanimated 3.10.0**: 60+ FPS animations for cards/carousels
- **Lottie React Native**: Premium animations and gamification
- **SQLite**: Local data caching and offline support
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for ServiceNow REST APIs

### ServiceNow Integration Strategy
- **Direct API Integration**: Mobile app → ServiceNow REST APIs (no middleware)
- **Client-Heavy Architecture**: Maximum functionality in mobile app
- **Minimal Backend**: Azure Functions only for OAuth token refresh + webhooks
- **Local-First Data**: SQLite caching with online/offline sync
- **Target Version**: ServiceNow Zurich (latest) with backward compatibility

## Development Context for Claude

**Project Stage**: Environment Stabilization Phase - Major debugging session completed, resolving final blockers
**Current Priority**: Resolve @babel/runtime module resolution and CocoaPods SSL issues, then ServiceNow API client
**Architecture Type**: Client-heavy React Native + Azure Functions serverless backend
**Development Environment**: Docker containers running, Metro bundler operational, iOS simulator ready
**Quality Standards**: Production-ready from day 1, enterprise security requirements

## Critical Issues Resolved
- ✅ **iOS Module Name Mismatch**: Fixed AppDelegate.mm (`FlowQuestTemp` → `FlowQuest`)
- ✅ **Xcode Scheme Configuration**: Regenerated iOS project with correct scheme
- ✅ **Version Compatibility Matrix**: Established Expo SDK 50 + React Native 0.73.6 + Reanimated 3.10.0
- ✅ **Metro Bundler**: JavaScript bundler operational on localhost:8081/8082

## Remaining Critical Blockers
- 🟡 **@babel/runtime Module Resolution**: Metro can't find babel helpers despite package being installed
- 🟡 **CocoaPods SSL Certificate Issue**: SSL verification failed connecting to cdn.cocoapods.org
- 🟡 **iOS Simulator End-to-End**: Complete validation needed after blockers resolved

## Key Development Notes
- **Expo Limitation**: Cannot run `npx expo start` from Claude terminal - user must run manually
- **Quick Start Scripts**: Use `./dev-start.sh` and `./dev-stop.sh` for complete environment management
- **Emergency Reset**: Use `npm install --legacy-peer-deps` for dependency issues
- **Documentation**: DEBUGGING.md, DEVELOPMENT.md, and NEXT-SESSION.md contain comprehensive solutions

## Version Compatibility Requirements
- **React Native**: 0.73.6 (not 0.79.5) - matches Expo SDK 50
- **Expo SDK**: 50.0.0 (not 53.0.0) - compatible with RN 0.73.x
- **React Native Reanimated**: 3.10.0 (not 4.x) - v4 requires New Architecture
- **React**: 18.2.0 (not 19.0.0) - matches React Native 0.73.x
- exclude @docs/External_References.md from git/hub as well