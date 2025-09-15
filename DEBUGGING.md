# FlowQuest Development Debugging Guide

## 🚨 Critical Issues and Solutions

This document captures solutions to critical development environment issues encountered during setup and debugging sessions.

---

## React Native Module Resolution Issues

### Issue: "Unable to resolve module ./mobile/index"
**Error Message**: 
```
Unable to resolve module ./mobile/index from /Users/brian/Projects/FlowQuest/mobile/.
```

### Root Cause Analysis
The issue was a **fundamental iOS module name mismatch** between native iOS code and JavaScript registration:

- **iOS AppDelegate.mm**: `self.moduleName = @"FlowQuestTemp"`
- **JavaScript index.js**: `AppRegistry.registerComponent("FlowQuest", () => App)`

### ✅ Solution
1. **Fix AppDelegate.mm module name**:
   ```objc
   // In ios/FlowQuest/AppDelegate.mm
   - (NSString *)moduleName {
     return @"FlowQuest";  // Changed from "FlowQuestTemp"
   }
   ```

2. **Regenerate iOS project with correct scheme**:
   ```bash
   rm -rf ios
   npx expo prebuild --platform ios
   ```

3. **Verify Xcode scheme alignment**:
   ```bash
   xcodebuild -project ios/FlowQuest.xcodeproj -list
   # Should show "FlowQuest" not "FlowQuestTemp"
   ```

---

## Version Compatibility Matrix

### Issue: Package Version Conflicts
**Error Messages**:
- `[Reanimated] Unsupported React Native version. Please use 75 or newer.`
- `Invalid Expo.podspec file: undefined method 'get_folly_config'`

### Root Cause
Mixing incompatible versions of Expo SDK, React Native, and related packages.

### ✅ Working Compatibility Matrix

| Package | Working Version | Expo SDK | Notes |
|---------|-----------------|----------|-------|
| `expo` | `~50.0.0` | 50 | Matches React Native 0.73.x |
| `react-native` | `^0.73.6` | 50 | Stable build with Expo SDK 50 |
| `react` | `^18.2.0` | 50 | Required for RN 0.73 |
| `react-native-reanimated` | `~3.10.0` | 50 | v4.x only supports New Architecture |
| `@types/react` | `~18.2.45` | 50 | Matches React 18.2 |

### Version Upgrade Path
```bash
# Downgrade from incompatible versions
npm install expo@~50.0.0 react-native@^0.73.6 react@^18.2.0 react-native-reanimated@~3.10.0
```

---

## CocoaPods Issues

### Issue: SSL Certificate Verification Failed
**Error Message**:
```
[!] Couldn't determine repo type for URL: `https://cdn.cocoapods.org/`: 
SSL_connect returned=1 errno=0 state=error: certificate verify failed
```

### Root Cause
SSL certificate trust issues with CocoaPods CDN (cdn.cocoapods.org).

### 🟡 Workaround Attempts
1. **Update CocoaPods repo**:
   ```bash
   pod repo update
   ```

2. **Use git-based sources** (add to Podfile):
   ```ruby
   source 'https://github.com/CocoaPods/Specs.git'
   ```

3. **Certificate trust update**:
   ```bash
   # Update macOS certificates
   brew install ca-certificates
   ```

**Status**: Still investigating permanent solution.

---

## @babel/runtime Module Resolution

### Issue: Metro Can't Find Babel Runtime Helpers
**Error Message**:
```
Unable to resolve module @babel/runtime/helpers/interopRequireDefault
```

### Root Cause Analysis
Despite `@babel/runtime` being installed, Metro module resolver can't locate the helpers.

### 🟡 Investigation Steps
1. **Verify package installation**:
   ```bash
   npm list @babel/runtime
   # Should show @babel/runtime@^7.28.4
   ```

2. **Check Metro resolver paths**:
   - Metro searches: `mobile/node_modules`, `../node_modules`
   - Package may be in wrong location for monorepo structure

3. **Potential solutions to test**:
   - Install @babel/runtime specifically in `mobile/node_modules`
   - Update `metro.config.js` resolver configuration
   - Clear Metro cache: `npx expo start --clear`

**Status**: Under active investigation.

---

## Development Environment Commands

### Working Setup Verification
```bash
# Check Metro bundler
curl http://localhost:8081
# Should return: "React Native packager is running"

# Check JavaScript bundle (when working)
curl "http://localhost:8081/index.bundle?platform=ios" | head -20
# Should return JavaScript code, not error JSON

# Check iOS project scheme
xcodebuild -project mobile/ios/FlowQuest.xcodeproj -list
# Should show scheme: "FlowQuest"
```

### Clean Development Reset
```bash
# Complete reset sequence
cd mobile
rm -rf node_modules
rm -rf ios
npm install --legacy-peer-deps
npx expo prebuild --platform ios
```

---

## Architecture Decisions

### Expo SDK vs React Native CLI Choice
**Decision**: Use Expo SDK 50 with prebuild (not Expo CLI managed workflow)
**Reasoning**: 
- Need native code access for ServiceNow OAuth integration
- Expo prebuild provides better iOS/Android project management
- Easier CocoaPods dependency management

### Monorepo Structure Impact
**Structure**: `FlowQuest/` (root) → `mobile/`, `backend/`, `shared/`
**Module Resolution**: Metro must resolve packages from both local and parent `node_modules`
**Metro Config**: Updated `nodeModulesPaths` for monorepo support

---

## Next Session Priority Actions

1. **Resolve @babel/runtime issue** - Critical blocker for JavaScript bundle
2. **Fix CocoaPods SSL certificates** - Required for iOS native build
3. **Complete iOS simulator testing** - End-to-end validation
4. **Package version alignment** - Use `npx expo install --fix`

---

## Success Indicators

### ✅ Environment Working When:
- Metro bundler returns JavaScript bundle (not error JSON)
- `npx expo run:ios` completes without SSL or config errors
- iOS simulator launches showing FlowQuest navigation tabs
- No critical version compatibility warnings

### 🚨 Known Issue Patterns:
- Any mention of "FlowQuestTemp" indicates incomplete iOS project regeneration
- SSL certificate errors point to CocoaPods CDN connectivity issues
- @babel/runtime errors suggest Metro module resolution problems
- Version warnings often indicate fundamental compatibility mismatches

---

**Last Updated**: September 11, 2025  
**Environment**: macOS Ventura, Xcode 15, Node.js 18+, React Native 0.73.6, Expo SDK 50