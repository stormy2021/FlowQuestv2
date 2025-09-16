# FlowQuest - Technical Issues Tracker

This document consolidates all outstanding technical issues, development blockers, and known limitations across the FlowQuest project.

## 🚨 CRITICAL ISSUES (P0) - Blocking Full Development

### 1. CocoaPods SSL Certificate Verification Failed
**Status**: URGENT - Blocking full Expo testing capabilities
**Impact**: Cannot use native iOS builds, forced to use Metro + Safari workaround
**Error**:
```
[!] Couldn't determine repo type for URL: `https://cdn.cocoapods.org/`:
SSL_connect returned=1 errno=0 state=error: certificate verify failed
```

**Current Workaround**: Using Metro bundler + Safari development workflow
- Start Metro: `cd mobile && npm start`
- Open iOS Simulator Safari → http://localhost:8081
- Functional for development but lacks full native testing capabilities

**Attempted Solutions**:
- `pod repo update` - Failed
- Git-based sources in Podfile - Partial success
- Certificate trust updates with `brew install ca-certificates` - No effect

**Next Steps**:
- [ ] Try `--insecure` flags for CocoaPods operations
- [ ] Investigate corporate firewall/proxy SSL certificate issues
- [ ] Consider manual certificate installation
- [ ] Test on different network environments

**Why This Matters**: Full Expo testing capabilities (device testing, TestFlight builds) are essential for production deployment.

---

### 2. @babel/runtime Module Resolution Error
**Status**: CRITICAL - JavaScript bundle generation fails
**Impact**: Metro bundler can't generate complete JavaScript bundle
**Error**:
```
Unable to resolve module @babel/runtime/helpers/interopRequireDefault
```

**Root Cause Analysis**:
- Package exists: `npm list @babel/runtime` shows `@babel/runtime@^7.28.4`
- Metro resolver can't locate helpers in monorepo structure
- Package may be in wrong location: searches `mobile/node_modules`, `../node_modules`

**Current Workaround**: Metro web interface works despite bundle generation failure

**Investigation Steps**:
- [x] Verified package installation
- [x] Checked Metro resolver paths
- [ ] Install @babel/runtime specifically in `mobile/node_modules`
- [ ] Update `metro.config.js` resolver configuration
- [ ] Clear Metro cache: `npx expo start --clear`

**Why This Matters**: JavaScript bundle generation is required for device testing and production builds.

---

## 🟡 HIGH PRIORITY ISSUES (P1)

### 3. Version Compatibility Matrix Constraints
**Status**: MANAGED - Working configuration established
**Impact**: Limited to specific version combinations for stability

**Working Configuration**:
```json
{
  "expo": "~50.0.0",
  "react-native": "^0.73.6",
  "react": "^18.2.0",
  "react-native-reanimated": "~3.10.0",
  "@types/react": "~18.2.45"
}
```

**Constraints**:
- ❌ React Native 0.79.5+ (Reanimated compatibility issues)
- ❌ Expo SDK 53.0.0+ (Breaking changes)
- ❌ React 19.0.0+ (Not yet supported)
- ❌ React Native Reanimated 4.x+ (Requires New Architecture)

**Upgrade Path**: Must coordinate version bumps across entire stack

---

### 4. Metro + Safari Limitations
**Status**: ACTIVE WORKAROUND - Not sustainable long-term
**Impact**: Limited testing capabilities, not production-ready

**Current Limitations**:
- No device testing capabilities
- No TestFlight distribution possible
- No native debugging tools access
- No performance profiling on real devices
- Limited to iOS Simulator + Safari web interface

**Requirements for Resolution**: Fix CocoaPods SSL and @babel/runtime issues

---

## 🟠 MEDIUM PRIORITY ISSUES (P2)

### 5. Monorepo Module Resolution Architecture
**Status**: INVESTIGATION REQUIRED
**Impact**: Complex module resolution paths causing intermittent issues

**Configuration**:
```javascript
// metro.config.js - Current monorepo support
module.exports = {
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ]
  }
};
```

**Potential Issues**:
- Duplicate package installations
- Version mismatches between local and parent node_modules
- Complex dependency resolution paths

**Future Considerations**:
- Consider moving to yarn workspaces or npm workspaces
- Investigate hoisting strategies
- Evaluate whether monorepo structure adds necessary complexity

---

### 6. iOS Project Configuration Consistency
**Status**: RESOLVED - Monitoring for regression
**Previous Issue**: Module name mismatch between iOS and JavaScript

**Solution Applied**:
```objc
// Fixed in ios/FlowQuest/AppDelegate.mm
- (NSString *)moduleName {
  return @"FlowQuest";  // Was "FlowQuestTemp"
}
```

**Monitoring**: Check for "FlowQuestTemp" references after environment resets

---

## 🔵 LOW PRIORITY / TECHNICAL DEBT (P3)

### 7. Development Environment Complexity
**Status**: DOCUMENTED - Acceptable complexity for current phase
**Impact**: Onboarding friction for new developers

**Current Requirements**:
- Docker Desktop for services
- Specific Node.js version (18+)
- iOS Simulator setup
- Understanding of Metro + Safari workaround

**Future Improvements**:
- Simplified Docker Compose setup
- Better documentation and scripts
- Automated environment validation

---

### 8. Package Management Legacy Peer Dependencies
**Status**: MANAGED - Working with `--legacy-peer-deps`
**Impact**: Potential security and compatibility risks

**Current Command**: `npm install --legacy-peer-deps`

**Risks**:
- May mask real dependency conflicts
- Could lead to runtime issues
- Makes dependency auditing more complex

**Future Resolution**: Gradual migration to compatible package versions

---

## 🏗️ ARCHITECTURAL DECISIONS & REASONING

### Why Metro + Safari Workaround?
**Decision**: Use Metro web interface instead of native builds during development
**Reasoning**:
1. **Unblocks development**: Allows feature work to continue
2. **Maintains functionality**: All React Native features accessible via web interface
3. **Preserves momentum**: Team can build features while solving infrastructure issues
4. **Risk mitigation**: Reduces dependency on complex native build chain

**Trade-offs**:
- ✅ Enables immediate feature development
- ✅ Stable development environment
- ❌ Limited testing capabilities
- ❌ Cannot validate native-specific behaviors
- ❌ No device performance testing

### Why Expo SDK 50 vs Latest?
**Decision**: Stay on Expo SDK 50 instead of upgrading to 53+
**Reasoning**:
1. **Stability**: Known working configuration with React Native 0.73.6
2. **Reanimated compatibility**: v3.10.0 works well, v4+ requires New Architecture
3. **Team velocity**: Avoid version upgrade complexity during feature development

**Future Migration**: Plan coordinated upgrade when core features stable

---

## 📊 ISSUE STATUS SUMMARY

| Priority | Status | Count | Impact |
|----------|--------|-------|---------|
| P0 Critical | Open | 2 | Blocking production readiness |
| P1 High | Mixed | 2 | Limiting testing capabilities |
| P2 Medium | Investigation | 2 | Development complexity |
| P3 Low | Managed | 2 | Technical debt |

**Overall Status**: Development environment functional but not production-ready. Core feature development can proceed while infrastructure issues are resolved.

---

## 🔄 ISSUE RESOLUTION WORKFLOW

### For Critical Issues (P0)
1. **Document** current error state and workarounds
2. **Research** root causes and potential solutions
3. **Test** solutions in isolated environment
4. **Implement** fix with rollback plan
5. **Validate** fix doesn't break existing functionality
6. **Update** documentation and remove workarounds

### For High Priority Issues (P1)
1. **Assess** impact on current development velocity
2. **Plan** resolution timeline that doesn't block features
3. **Research** solutions during feature development downtime
4. **Coordinate** with team on resolution timing

### Issue Escalation Triggers
- Any P0 issue preventing deployment to TestFlight
- Multiple P1 issues creating development friction
- Version compatibility issues blocking library updates

---

**Last Updated**: Current session
**Next Review**: After each major development milestone
**Owner**: Development Team
**Escalation**: Project Lead for P0 issues blocking release