# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# FlowQuest: ServiceNow Mobile Interface

## Project Overview

FlowQuest is an experimental mobile interface for ServiceNow that transforms traditional table-based workflows into card-based, gesture-driven mobile experiences. The project explores whether modern mobile UX patterns can make ServiceNow workflows faster and more engaging.

**Key Vision**: Replace "6+ click workflows" with "swipe-to-action" gestures for common ServiceNow operations.

## Current Development Status

**Environment**: ✅ Functional (with limitations)
- React Native 0.73.6 + Expo SDK 50 monorepo working configuration
- Metro bundler + Safari development workflow (workaround for CocoaPods issues)
- iOS Simulator accessible via http://localhost:8081
- Docker services: PostgreSQL (5432) + Redis (6379) operational
- GitHub repository: https://github.com/stormy2021/FlowQuestv2

**Critical Limitations**:
- 🚨 **CocoaPods SSL Certificate Issue** - Blocking full Expo testing capabilities
- 🚨 **@babel/runtime Module Resolution** - JavaScript bundle generation fails
- **Current Workaround**: Metro + Safari interface functional for development

**Next Phase**: Building core features from PRD documents while resolving infrastructure issues

## Architecture

### Monorepo Structure
```
/mobile/          - React Native app (main development focus)
/backend/         - Azure Functions (minimal serverless backend)
/shared/          - TypeScript types and constants
/docs/           - Active project documentation
/prds/           - Product Requirements Documents
/archive/        - Historical documentation and debugging notes
```

### Client-Heavy Architecture
- **Direct ServiceNow API Integration** - React Native → ServiceNow REST APIs
- **Local SQLite Caching** - Offline-first data strategy
- **Minimal Azure Backend** - OAuth refresh + webhooks only
- **Hub-Based Navigation** - Work, Assets, People, Me hubs

## Development Commands

### Primary Development Workflow
```bash
# Start Metro bundler (keep running)
cd mobile && npm start

# Open iOS Simulator and navigate Safari to:
# http://localhost:8081

# Alternative native build (when CocoaPods working)
npx expo run:ios
```

### Monorepo Commands
```bash
# Setup entire project
npm run setup

# Development servers
npm run dev                    # Start mobile + backend
npm run mobile:start          # Metro bundler only
npm run docker:dev            # PostgreSQL + Redis

# Code quality
npm run lint                  # ESLint all workspaces
npm run format               # Prettier all workspaces
npm run type-check           # TypeScript all workspaces
```

### Testing
```bash
# Run tests
npm test                     # All workspaces
npm run test:mobile         # Mobile app only

# Mobile specific
cd mobile
npm run test                # Jest tests
npm run type-check          # TypeScript checking

# Individual test files
cd mobile
npm test -- --testNamePattern="YourTestName"
npm test -- path/to/test/file.test.ts

# Watch mode for development
npm test -- --watch
```

## Key Technologies

### Mobile Stack
- **React Native 0.73.6** - Mobile framework
- **Expo SDK 50** - Development platform
- **TypeScript** - Type safety
- **React Navigation 6** - Tab + stack navigation
- **React Native Reanimated 3.10.0** - 60+ FPS animations
- **Lottie** - Vector animations and gamification
- **SQLite** - Local caching
- **Zustand** - State management

### Backend Stack
- **Azure Functions** - Serverless functions (Node.js + TypeScript)
- **Azure Key Vault** - Secret management
- **Azure SignalR** - Real-time notifications

## Project Structure

### Mobile App (`/mobile/src/`)
```
src/
├── App.tsx                 # Root component
├── navigation/            # React Navigation setup
│   ├── AppNavigator.tsx   # Main navigation
│   └── TabNavigator.tsx   # Bottom tabs
├── screens/              # Hub screens
│   ├── work/             # Work Hub (incidents, changes)
│   ├── assets/           # Assets Hub (hardware, software)
│   ├── people/           # People Hub (HR, customer cases)
│   ├── me/              # Me Hub (profile, preferences)
│   └── auth/            # Authentication screens
├── components/          # Reusable UI components
├── services/           # API clients and data services
├── store/             # State management
├── types/             # TypeScript definitions
└── utils/             # Helper functions
```

## Hub Framework

### Current Implementation
Each hub is a tab in bottom navigation with placeholder screens:
- **Work Hub** - ITSM workflows (incidents, problems, changes)
- **Assets Hub** - ITAM workflows (hardware, software, contracts)
- **People Hub** - HRSD/CSM workflows (HR cases, onboarding)
- **Me Hub** - User profile, preferences, notifications

### Development Approach
**PRD-Driven Development**: Core features defined in `/prds/` folder:
1. **work-hub-mvp.md** - Card-based incident interface with swipe gestures
2. **asset-management.md** - Lifecycle visualization and contract alerts
3. **people-hr-workflows.md** - Gamified onboarding and person-centered cases
4. **user-experience-gamification.md** - Personal achievements and contributions
5. **servicenow-integration.md** - OAuth 2.0 and real-time API integration
6. **offline-caching-system.md** - SQLite caching and sync strategies

## ServiceNow Integration Strategy

### API Approach
- **Direct Integration** - React Native → ServiceNow REST APIs
- **Target Version** - ServiceNow Zurich (latest)
- **Authentication** - OAuth 2.0 flow
- **Caching Strategy** - SQLite for offline capability

### Data Flow
```
ServiceNow APIs ←→ React Native App ←→ SQLite Cache
                                    ↓
                              Secure Storage
```

## Development Environment

### Metro + Safari Workflow (Primary)
This is the current working approach that bypasses CocoaPods SSL issues:

1. Start Metro: `cd mobile && npm start`
2. Open iOS Simulator: `open -a Simulator`
3. Open Safari in simulator → http://localhost:8081
4. Use Metro web interface for development

### Native Build Alternative
When CocoaPods SSL issues are resolved: `npx expo run:ios`

### Docker Services
```bash
npm run docker:dev    # Start PostgreSQL + Redis
docker ps            # Check running containers
npm run docker:down  # Stop services
npm run docker:logs  # View container logs

# Direct database access (when PostgreSQL running)
# Host: localhost, Port: 5432, DB: flowquest_dev, User: flowquest
```

## Code Quality Standards

### TypeScript Configuration
- Strict mode enabled across all workspaces
- Shared types in `/shared/` package
- No `any` types allowed

### Linting & Formatting
- ESLint with TypeScript rules
- Prettier for consistent formatting
- Pre-commit hooks for quality enforcement

### Version Compatibility
Critical version constraints for stability:
- **React Native**: 0.73.6 (not 0.79.5)
- **Expo SDK**: 50.0.0 (not 53.0.0)
- **React**: 18.2.0 (not 19.0.0)
- **React Native Reanimated**: 3.10.0 (not 4.x)

## Development Notes

### Current Session Focus
The project is ready for **PRD-driven feature development**. Environment functional with limitations:

**Immediate Priorities** (from `/prds/work-hub-mvp.md`):
1. Mock ServiceNow data service with realistic incident data
2. Card-based Work Hub interface replacing placeholder screens
3. Swipe gesture system for incident resolution
4. Priority-based visual indicators with animations

**Critical Infrastructure Issues** (see `/docs/ISSUES.md`):
- 🚨 **CocoaPods SSL Certificate** - Blocking full Expo testing capabilities
- 🚨 **@babel/runtime Module Resolution** - JavaScript bundle generation fails
- **Status**: Both issues don't block feature development via Metro + Safari workflow

**Development Strategy**: Build features using current workaround while resolving infrastructure issues in parallel

## Emergency Commands

### When Development Environment Breaks
```bash
# Kill all Metro processes
pkill -f "expo start"

# Complete cache clear
cd mobile
rm -rf .expo node_modules/.cache ios/build
npm install --legacy-peer-deps
npx expo start --clear

# Nuclear reset (last resort)
rm -rf node_modules ios .expo
npm install --legacy-peer-deps
npx expo prebuild --platform ios
```

### Common Issues and Solutions
```bash
# Module resolution errors
npm install @babel/runtime --save

# CocoaPods SSL issues (check if resolved)
cd mobile/ios && pod repo update

# Bundle generation test
curl "http://localhost:8081/index.bundle?platform=ios" | head -20

# Check for FlowQuestTemp remnants (should return nothing)
grep -r "FlowQuestTemp" mobile/ios/
```

### Git Repository
- **URL**: https://github.com/stormy2021/FlowQuestv2
- **Security**: Sensitive files excluded (.gitignore configured)
- **Documentation**: Comprehensive README.md and architecture docs