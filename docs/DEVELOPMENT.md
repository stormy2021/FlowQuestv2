# FlowQuest Development Workflow

## 🚀 Daily Development Commands

### Quick Start
```bash
cd /Users/brian/Projects/FlowQuest/mobile
npx expo start
```

### Development Server Options
```bash
# Standard development server
npx expo start

# Clear Metro cache (when having module resolution issues)
npx expo start --clear

# Specific port (when 8081 is occupied)
npx expo start --port 8082

# Check if server is running
curl http://localhost:8081
```

---

## 🏗️ Build and Testing Commands

### iOS Development (Metro + Safari Workflow)
```bash
# Primary development workflow (RECOMMENDED)
# 1. Start Metro bundler
npx expo start

# 2. Open iOS Simulator
open -a Simulator

# 3. Open Safari in simulator and navigate to:
# http://localhost:8081

# Alternative: Native build (when CocoaPods SSL issues resolved)
npx expo run:ios
```

### Android Development (Future)
```bash
# Run on Android
npx expo run:android
```

### Bundle Testing
```bash
# Test JavaScript bundle generation
curl "http://localhost:8081/index.bundle?platform=ios" | head -50

# Test Metro bundler status
curl http://localhost:8081
```

---

## 🧹 Cleanup and Reset Commands

### Metro Cache Clear
```bash
# Clear Metro bundler cache
rm -rf node_modules/.cache
npx expo start --clear

# Clear all caches
rm -rf .expo
rm -rf node_modules/.cache
rm -rf ios/build
npm start
```

### Complete Environment Reset
```bash
# Nuclear option - complete reset
cd mobile
rm -rf node_modules
rm -rf ios
rm -rf .expo
npm install --legacy-peer-deps
npx expo prebuild --platform ios
```

### Dependency Management
```bash
# Install packages with legacy peer deps (preferred)
npm install --legacy-peer-deps

# Fix Expo package versions
npx expo install --fix

# Check for version compatibility
npx expo doctor
```

---

## 🔍 Debugging Commands

### Environment Health Check
```bash
# Check React Native setup
npx react-native doctor

# Check Expo environment
npx expo doctor

# Check iOS project structure
xcodebuild -project mobile/ios/FlowQuest.xcodeproj -list

# Check package versions
npm list expo react-native react-native-reanimated
```

### Common Issue Diagnostics
```bash
# Check for "FlowQuestTemp" remnants (should return nothing)
grep -r "FlowQuestTemp" mobile/ios/

# Verify Metro bundle accessibility
curl -s http://localhost:8081 | grep "React Native"

# Check for SSL certificate issues with CocoaPods
cd mobile/ios && pod repo update
```

---

## 📦 Package Management

### Core Dependencies (Locked Versions)
```bash
# Install specific compatible versions
npm install expo@~50.0.0 react-native@^0.73.6 react@^18.2.0 react-native-reanimated@~3.10.0

# Install @babel/runtime in correct location
npm install @babel/runtime
```

### Development Dependencies
```bash
# TypeScript and tools
npm install -D typescript @types/react @typescript-eslint/eslint-plugin

# Testing tools
npm install -D jest @testing-library/react-native detox
```

---

## 🏗️ Project Structure

```
FlowQuest/
├── mobile/                 # React Native app
│   ├── ios/               # iOS native project (generated)
│   ├── src/               # App source code
│   │   ├── screens/       # Screen components
│   │   ├── components/    # Reusable components
│   │   └── navigation/    # Navigation setup
│   ├── app.json           # Expo configuration
│   ├── metro.config.js    # Metro bundler config
│   └── package.json       # Mobile dependencies
├── backend/               # Azure Functions (future)
├── shared/                # Shared types and utilities
├── TODO.md               # Development roadmap
├── DEBUGGING.md          # Issue solutions
└── DEVELOPMENT.md        # This file
```

---

## 🔧 Configuration Files

### Important Files to Monitor
- `mobile/package.json` - Dependencies and versions
- `mobile/app.json` - Expo configuration
- `mobile/metro.config.js` - Module resolution
- `mobile/ios/FlowQuest/AppDelegate.mm` - iOS module registration
- `mobile/babel.config.js` - Babel configuration

### Key Configuration Settings
```javascript
// metro.config.js - Monorepo support
module.exports = {
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ]
  }
};
```

---

## 🚨 Emergency Procedures

### When Metro Won't Start
1. Kill all Metro processes: `pkill -f "expo start"`
2. Clear all caches: `rm -rf .expo node_modules/.cache`
3. Reinstall: `npm install --legacy-peer-deps`
4. Restart: `npx expo start --clear`

### When iOS Build Fails
1. Clean iOS build: `cd ios && xcodebuild clean && cd ..`
2. Reinstall pods: `cd ios && rm -rf Pods && pod install && cd ..`
3. If CocoaPods SSL issue: Check DEBUGGING.md solutions

### When Module Resolution Fails
1. Check for "FlowQuestTemp": `grep -r "FlowQuestTemp" .`
2. Verify Metro config paths
3. Clear Metro cache and restart
4. Test with curl bundle endpoint

---

## 📱 Testing Checklist

### Pre-Development Session
- [ ] Metro bundler starts without errors
- [ ] JavaScript bundle generates successfully
- [ ] iOS simulator available and working
- [ ] No "FlowQuestTemp" references in codebase

### Post-Development Session  
- [ ] All new code linted and formatted
- [ ] TypeScript compilation successful
- [ ] iOS app builds and launches
- [ ] Git commits with proper messages

---

## 🔗 Useful Links

- [Expo CLI Reference](https://docs.expo.dev/more/expo-cli/)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
- [Metro Configuration](https://facebook.github.io/metro/docs/configuration)
- [CocoaPods Troubleshooting](https://guides.cocoapods.org/using/troubleshooting.html)

---

**Environment**: macOS Ventura, Xcode 15, Node.js 18+, Expo SDK 50  
**Last Updated**: September 11, 2025