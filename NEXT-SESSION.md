# FlowQuest - Next Development Session Plan

## 📊 Current Status Summary

### ✅ Major Victories (Completed This Session)
- **Core Module Resolution FIXED** - Original "Unable to resolve module ./mobile/index" completely resolved
- **iOS Architecture Corrected** - AppDelegate.mm module name fixed (FlowQuestTemp → FlowQuest)
- **Xcode Project Regenerated** - Clean iOS project with correct "FlowQuest" scheme
- **Version Compatibility Established** - Working combination of Expo SDK 50 + React Native 0.73.x
- **Metro Bundler Operational** - JavaScript bundler running on localhost:8081/8082
- **Documentation Created** - DEBUGGING.md and DEVELOPMENT.md with comprehensive solutions

### 🚨 Blocking Issues (Must Resolve Next)

#### 1. @babel/runtime Module Resolution (CRITICAL - PRIORITY 1)
**Problem**: Metro can't find `@babel/runtime/helpers/interopRequireDefault`
**Impact**: JavaScript bundle generation fails
**Next Actions**:
- [ ] Check babel.config.js monorepo configuration
- [ ] Verify metro.config.js nodeModulesPaths resolution  
- [ ] Install @babel/runtime in mobile/node_modules specifically
- [ ] Test with minimal App component to isolate issue

#### 2. CocoaPods SSL Certificate Issue (CRITICAL - PRIORITY 2)  
**Problem**: SSL verification failed connecting to cdn.cocoapods.org
**Impact**: iOS native build fails, no Podfile.lock generated
**Next Actions**:
- [ ] Try git-based CocoaPods sources instead of CDN
- [ ] Update macOS certificate trust settings
- [ ] Test pod install with --insecure flag as workaround

#### 3. Package Version Alignment (PRIORITY 3)
**Problem**: Multiple packages newer than expected for Expo SDK 50
**Impact**: Potential runtime stability issues
**Next Actions**:
- [ ] Run `npx expo install --fix` to align versions
- [ ] Verify no breaking changes in downgraded packages

---

## 🎯 Next Session Action Plan

### Pre-Session Setup (5 minutes)
```bash
cd /Users/brian/Projects/FlowQuest/mobile
npx expo start --clear
# Verify Metro bundler starts without errors
```

### Phase 1: Resolve @babel/runtime (30-45 minutes)

#### Investigation Steps
1. **Check current babel configuration**:
   ```bash
   cat babel.config.js
   cat metro.config.js
   ```

2. **Test package installation location**:
   ```bash
   npm list @babel/runtime
   find . -name "@babel" -type d
   ```

3. **Install @babel/runtime locally in mobile/**:
   ```bash
   cd mobile
   npm install @babel/runtime
   ```

4. **Clear all caches and test**:
   ```bash
   rm -rf .expo node_modules/.cache
   npx expo start --clear
   curl "http://localhost:8081/index.bundle?platform=ios"
   ```

#### Success Criteria
- `curl` returns JavaScript code (not error JSON)
- Metro bundler successfully generates bundle
- No @babel/runtime resolution errors in logs

### Phase 2: Fix CocoaPods SSL (30-45 minutes)

#### Resolution Steps
1. **Try git-based sources** (add to ios/Podfile):
   ```ruby
   source 'https://github.com/CocoaPods/Specs.git'
   ```

2. **Alternative CDN bypass**:
   ```bash
   cd ios
   pod install --verbose --allow-root
   ```

3. **Update system certificates**:
   ```bash
   brew install ca-certificates
   pod repo remove trunk
   pod setup
   ```

#### Success Criteria  
- `pod install` completes without SSL errors
- Podfile.lock generated successfully
- iOS build configuration files present

### Phase 3: iOS Simulator Testing (15-30 minutes)

#### Final Validation
```bash
# Test complete iOS build and launch
npx expo run:ios
```

#### Success Criteria
- App builds successfully
- iOS simulator launches with FlowQuest
- All four hub tabs visible and functional
- No critical runtime errors

---

## 📋 Updated Development Priorities

### Immediate (Next 2-3 Hours)
1. ✅ Documentation complete (DEBUGGING.md, DEVELOPMENT.md)
2. 🟡 @babel/runtime resolution  
3. 🟡 CocoaPods SSL certificates
4. 🟡 iOS simulator end-to-end testing

### Week 1 (After Environment Complete)
- ServiceNow API client setup with OAuth 2.0
- Work Hub incident card component design
- SQLite caching foundation

### Week 2
- Incident card swipe gestures and animations
- Local data persistence and sync logic
- Background refresh implementation

---

## 🔧 Available Tools and Resources

### Documentation Created
- **DEBUGGING.md** - Comprehensive issue solutions
- **DEVELOPMENT.md** - Daily workflow commands  
- **TODO.md** - Updated roadmap and priorities
- **CLAUDE.md** - Architecture decisions and context

### Working Development Environment
- Docker services: PostgreSQL, Redis (localhost:5432, localhost:6379)
- Metro bundler: React Native JavaScript bundler working
- Xcode: iOS project correctly configured
- Git: Repository initialized with comprehensive commit history

### Known Working Configuration
```json
{
  "expo": "~50.0.0",
  "react-native": "^0.73.6", 
  "react": "^18.2.0",
  "react-native-reanimated": "~3.10.0",
  "@types/react": "~18.2.45"
}
```

---

## 🚨 Emergency Procedures

### If Metro Bundler Won't Start
1. `pkill -f "expo start"`
2. `rm -rf .expo node_modules/.cache`  
3. `npm install --legacy-peer-deps`
4. `npx expo start --clear`

### If iOS Build Completely Fails
1. `rm -rf ios`
2. `npx expo prebuild --platform ios`
3. Follow CocoaPods resolution steps

### If You Get Lost
1. Read DEBUGGING.md for specific error solutions
2. Check DEVELOPMENT.md for workflow commands
3. Verify no "FlowQuestTemp" references: `grep -r "FlowQuestTemp" .`

---

## 🎖️ Success Markers

**You'll know everything is working when:**
- Metro bundler generates JavaScript bundle without errors
- `npx expo run:ios` completes successfully  
- iOS simulator shows FlowQuest with 4 navigation tabs
- No critical version warnings or SSL errors

**At that point, you're ready for ServiceNow API integration!**

---

## 📞 Quick Reference Commands

```bash
# Start development session
cd /Users/brian/Projects/FlowQuest/mobile && npx expo start

# Test bundle generation  
curl "http://localhost:8081/index.bundle?platform=ios" | head -20

# iOS build and launch
npx expo run:ios

# Emergency reset
rm -rf node_modules ios .expo && npm install --legacy-peer-deps && npx expo prebuild --platform ios
```

---

**Session Date**: September 11, 2025  
**Environment**: React Native 0.73.6, Expo SDK 50, iOS 17.2 Simulator  
**Next Goal**: Complete iOS simulator launch → ServiceNow API client development