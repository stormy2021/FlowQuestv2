#!/bin/bash

# FlowQuest Development Environment - START
# This script starts Docker services and launches Expo in a new terminal

echo "🚀 Starting FlowQuest Development Environment..."

# Start Docker services (PostgreSQL, Redis)
echo "📦 Starting Docker services..."
npm run docker:dev

# Wait for services to be ready
echo "⏳ Waiting for Docker services to start..."
sleep 3

# Check if Docker services are running
echo "🔍 Checking Docker services status..."
docker ps | grep -E "(postgres|redis)" || {
    echo "❌ Docker services failed to start"
    exit 1
}

echo "✅ Docker services running:"
docker ps --format "table {{.Names}}\t{{.Status}}" | grep -E "(postgres|redis)"

# Navigate to mobile directory and start Expo in a new terminal
echo "📱 Starting Expo Metro bundler in new terminal..."

# For macOS Terminal
if command -v osascript >/dev/null 2>&1; then
    osascript -e "
        tell application \"Terminal\"
            do script \"cd /Users/brian/Projects/FlowQuest/mobile && npx expo start --clear\"
            activate
        end tell
    "
# For iTerm2 (alternative)
elif command -v iterm >/dev/null 2>&1; then
    osascript -e "
        tell application \"iTerm\"
            create window with default profile
            tell current session of current window
                write text \"cd /Users/brian/Projects/FlowQuest/mobile && npx expo start --clear\"
            end tell
        end tell
    "
else
    echo "📱 Manual step: Open new terminal and run:"
    echo "   cd /Users/brian/Projects/FlowQuest/mobile"
    echo "   npx expo start --clear"
fi

echo ""
echo "🎉 FlowQuest Development Environment Started!"
echo "📊 Services running:"
echo "   • PostgreSQL: localhost:5432"
echo "   • Redis: localhost:6379" 
echo "   • Metro Bundler: localhost:8081"
echo ""
echo "🔗 Quick links:"
echo "   • Metro: http://localhost:8081"
echo "   • Project root: /Users/brian/Projects/FlowQuest"
echo ""
echo "🛑 To stop everything: ./dev-stop.sh"