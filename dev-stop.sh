#!/bin/bash

# FlowQuest Development Environment - STOP
# This script stops all Expo processes and shuts down Docker services

echo "🛑 Stopping FlowQuest Development Environment..."

# Kill all Expo and Metro processes
echo "📱 Stopping Expo and Metro bundler processes..."
pkill -f "expo start" 2>/dev/null || echo "   No Expo processes found"
pkill -f "react-native start" 2>/dev/null || echo "   No React Native processes found"
pkill -f "metro" 2>/dev/null || echo "   No Metro processes found"

# Kill any Node processes on common ports
echo "🔌 Stopping Node processes on development ports..."
lsof -ti:8081 | xargs kill -9 2>/dev/null || echo "   Port 8081 already free"
lsof -ti:8082 | xargs kill -9 2>/dev/null || echo "   Port 8082 already free"
lsof -ti:19000 | xargs kill -9 2>/dev/null || echo "   Port 19000 already free"
lsof -ti:19001 | xargs kill -9 2>/dev/null || echo "   Port 19001 already free"

# Stop Docker services
echo "📦 Stopping Docker services..."
npm run docker:down

# Wait for shutdown
echo "⏳ Waiting for services to stop..."
sleep 2

# Verify everything is stopped
echo "🔍 Verifying shutdown..."
REMAINING_PROCESSES=$(pgrep -f "expo\|metro\|react-native" || true)
if [ -n "$REMAINING_PROCESSES" ]; then
    echo "⚠️  Some processes may still be running:"
    pgrep -f "expo\|metro\|react-native" | xargs ps -p 2>/dev/null || true
else
    echo "✅ All development processes stopped"
fi

# Check Docker status
DOCKER_STATUS=$(docker ps -q 2>/dev/null | wc -l)
if [ "$DOCKER_STATUS" -eq 0 ]; then
    echo "✅ All Docker containers stopped"
else
    echo "📦 Docker containers still running:"
    docker ps --format "table {{.Names}}\t{{.Status}}"
fi

echo ""
echo "🎯 FlowQuest Development Environment Stopped!"
echo ""
echo "🚀 To restart everything: ./dev-start.sh"
echo "📚 Documentation available:"
echo "   • DEVELOPMENT.md - Daily workflow"
echo "   • DEBUGGING.md - Issue solutions" 
echo "   • NEXT-SESSION.md - Action plan"