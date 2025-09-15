# FlowQuest Client Architecture

## Overview

FlowQuest's React Native client transforms boring ServiceNow data tables into engaging, gesture-driven experiences that feel native to mobile platforms while introducing delightful interactions that make enterprise workflows enjoyable.

## Design Philosophy

### Native-First Interactions
- **Platform Conventions** - iOS/Android native gesture patterns and feedback
- **Performance Standards** - 60+ FPS animations, instant responsiveness  
- **Accessibility** - VoiceOver/TalkBack support, dynamic text sizing
- **Platform Integration** - Haptic feedback, biometric authentication, notifications

### Data Transformation Strategy
Transform ServiceNow's traditional data presentation:
- **Static Tables** → **Interactive Cards** with micro-animations
- **Form Fields** → **Progressive Disclosure** with contextual actions
- **Status Indicators** → **Visual Progress** with color psychology
- **Bulk Actions** → **Gesture-Driven** swipe interactions

## Component Architecture

### Hub-Based Navigation System

```typescript
interface Hub {
  id: HubId;
  displayName: string;
  icon: LottieAnimationSource;
  primaryColor: string;
  secondaryColor: string;
  navigation: HubNavigationConfig;
  dataTypes: ServiceNowTable[];
  interactions: GestureInteraction[];
}

enum HubId {
  WORK = 'work',
  ASSETS = 'assets', 
  PEOPLE = 'people',
  ME = 'me'
}
```

**Hub Interaction Pattern**:
```
Hub Landing → Feed View → Card Detail → Action Layer
     ↓             ↓            ↓           ↓
  Overview      Infinite     Expandable   Gesture
  Cards         Scroll       Sheet        Actions
```

### Animation System Architecture

#### Core Animation Libraries
```typescript
// Primary animation stack
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

import LottieView from 'lottie-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// Performance monitoring
import { InteractionManager } from 'react-native';
```

#### Animation Design System

**Motion Principles**:
- **Purposeful** - Every animation serves a functional purpose
- **Performant** - 60+ FPS on mid-range devices (5-year target)
- **Personality** - Inject delight without sacrificing professionalism  
- **Platform-aware** - iOS/Android specific animation curves

**Animation Categories**:
```typescript
interface AnimationSystem {
  // Structural animations (navigation, layout)
  structural: {
    pageTransitions: SharedElementTransition;
    cardExpansion: SpringAnimation;
    listReordering: LayoutAnimation;
  };
  
  // Feedback animations (user interactions)  
  feedback: {
    buttonPress: ScaleAnimation;
    swipeActions: TranslationAnimation;
    pullToRefresh: ElasticAnimation;
  };
  
  // Delightful animations (gamification, celebration)
  delight: {
    taskCompletion: LottieAnimation;
    progressMilestones: ParticleAnimation;
    achievementUnlock: BurstAnimation;
  };
  
  // Data visualization animations
  dataViz: {
    chartAppear: StaggeredAnimation;
    counterIncrement: NumberAnimation;
    progressUpdate: MorphAnimation;
  };
}
```

## Hub Implementations

### Work Hub: ITSM Workflows

#### Card Design for Incident Data
Transform boring incident tables into engaging cards:

```typescript
// Traditional ServiceNow: Incident Table Row
// INC0001234 | P1 | John Doe | Database down | 2h ago

// FlowQuest: Interactive Incident Card
interface IncidentCard {
  priority: PriorityIndicator;    // Animated color + pulse for P1
  status: ProgressRing;           // Circular progress vs SLA
  assignee: AvatarStack;          // Profile photos with online status
  description: TruncatedText;     // Expandable with "show more"
  timeline: RelativeTime;         // "2h ago" with live updates
  actions: SwipeActions;          // Left: resolve, Right: escalate
  celebration: CompletionEffect;  // Lottie burst when resolved
}
```

**Example: Swipe-to-Resolve Gesture**
```typescript
const IncidentCard = ({ incident }: { incident: Incident }) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  
  const resolveGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.max(0, event.translationX);
    })
    .onEnd((event) => {
      if (event.translationX > RESOLVE_THRESHOLD) {
        // Animate out and resolve
        translateX.value = withTiming(SCREEN_WIDTH);
        opacity.value = withTiming(0, undefined, () => {
          runOnJS(resolveIncident)(incident.sys_id);
        });
      } else {
        // Snap back
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value
  }));

  return (
    <GestureDetector gesture={resolveGesture}>
      <Animated.View style={animatedStyle}>
        <IncidentCardContent incident={incident} />
        {/* Reveal action underneath as user swipes */}
        <ResolveActionIndicator progress={translateX.value / RESOLVE_THRESHOLD} />
      </Animated.View>
    </GestureDetector>
  );
};
```

#### Progressive Disclosure Pattern
Replace overwhelming 30-field forms with layered information:

```
Card Summary (Always Visible)
├── Priority Badge + Status Ring
├── Title + Assignee Avatar  
├── Time Indicators + SLA Status
└── Quick Action Buttons

Expandable Details (Tap to Expand)
├── Description + Comments Tab
├── Work Notes + Activity Tab
├── Related Records + CMDB Tab
└── Attachments + History Tab

Action Layer (Context-Aware)
├── State-specific actions (resolve, escalate, etc.)
├── Assignment actions (reassign, watch, etc.)  
└── Communication actions (comment, notify, etc.)
```

### Assets Hub: ITAM Lifecycle Visualization

#### Asset Carousel Interaction
Transform static asset lists into swipeable, categorized carousels:

```typescript
interface AssetCarousel {
  categories: AssetCategory[];     // Hardware, Software, Facilities
  visualization: CarouselView;     // Horizontal scrolling cards
  filtering: DynamicFilters;       // Animated filter pills
  actions: ContextualActions;      // Tap for details, long-press for actions
}

// Example: Asset Lifecycle Visualization
const AssetLifecycleRing = ({ asset }: { asset: Asset }) => {
  const progressValue = useSharedValue(0);
  
  useEffect(() => {
    // Animate lifecycle progress on mount
    progressValue.value = withTiming(asset.lifecycleProgress, {
      duration: 1500,
      easing: Easing.out(Easing.cubic)
    });
  }, [asset.lifecycleProgress]);

  return (
    <View style={styles.lifecycleContainer}>
      <Svg width={120} height={120}>
        <Circle
          cx="60"
          cy="60" 
          r="50"
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="none"
        />
        <AnimatedCircle
          cx="60"
          cy="60"
          r="50"
          stroke={asset.lifecycleColor}
          strokeWidth="8"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={animatedStrokeDashoffset}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.lifecycleLabel}>
        <Text style={styles.lifecycleStage}>{asset.currentStage}</Text>
        <Text style={styles.lifecyclePercentage}>{asset.lifecycleProgress}%</Text>
      </View>
    </View>
  );
};
```

### People Hub: Human-Centered Workflows

#### Onboarding Flow Gamification
Transform HR onboarding checklists into engaging progress flows:

```typescript
// Traditional ServiceNow: Static checklist
// ☐ IT Setup | ☐ Badge Created | ☐ Training Complete

// FlowQuest: Gamified Progress Journey
interface OnboardingJourney {
  stages: OnboardingStage[];
  progress: AnimatedProgress;
  celebrations: MilestoneAnimations;
  guidance: ContextualHelp;
}

const OnboardingProgress = ({ employee }: { employee: Employee }) => {
  const progressStages = [
    { id: 'setup', label: 'IT Setup', icon: 'laptop-setup.json', completed: true },
    { id: 'badge', label: 'Badge Ready', icon: 'id-card.json', completed: true },
    { id: 'training', label: 'Training', icon: 'graduation.json', completed: false },
    { id: 'welcome', label: 'Welcome!', icon: 'celebration.json', completed: false }
  ];

  return (
    <View style={styles.journeyContainer}>
      {progressStages.map((stage, index) => (
        <OnboardingStageCard
          key={stage.id}
          stage={stage}
          isActive={index === 2} // Current stage
          onComplete={() => handleStageComplete(stage)}
        />
      ))}
      
      {/* Animated connection lines between stages */}
      <ProgressConnector stages={progressStages} />
      
      {/* Celebration animation when stage completes */}
      <LottieView
        ref={celebrationRef}
        source={require('./animations/stage-complete.json')}
        style={styles.celebrationOverlay}
      />
    </View>
  );
};
```

### Me Hub: Personal Dashboard & Gamification

#### Contribution Timeline Visualization
Transform boring user activity logs into engaging contribution stories:

```typescript
// Traditional ServiceNow: Activity list  
// 2024-01-15 | Resolved INC0001234
// 2024-01-14 | Updated REQ0005678

// FlowQuest: Interactive contribution arc
interface ContributionTimeline {
  activities: UserActivity[];
  visualization: TimelineArc;     // Curved timeline with activity nodes
  insights: PersonalMetrics;      // Streak counters, impact scores
  achievements: BadgeUnlocks;     // Gamified milestone rewards
}

const ContributionArc = ({ activities }: { activities: UserActivity[] }) => {
  const arcPath = useMemo(() => 
    generateCurvedPath(activities.map(a => a.date)), [activities]
  );
  
  return (
    <View style={styles.arcContainer}>
      <Svg width={SCREEN_WIDTH - 32} height={200}>
        {/* Background arc */}
        <Path
          d={arcPath}
          stroke="#E5E7EB"
          strokeWidth={4}
          fill="none"
        />
        
        {/* Activity nodes along the arc */}
        {activities.map((activity, index) => (
          <ActivityNode
            key={activity.id}
            activity={activity}
            position={getPositionOnArc(arcPath, index)}
            onPress={() => showActivityDetails(activity)}
          />
        ))}
        
        {/* Animated progress along arc */}
        <AnimatedPath
          d={arcPath}
          stroke="#10B981"
          strokeWidth={6}
          strokeDasharray={arcLength}
          strokeDashoffset={animatedDashOffset}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      
      {/* Floating metrics */}
      <PersonalMetrics
        streak={calculateStreak(activities)}
        impact={calculateImpact(activities)}
        style={styles.floatingMetrics}
      />
    </View>
  );
};
```

## Data Visualization Strategies

### Making Boring Data Engaging

#### Priority Visualization System
```typescript
// Instead of: "Priority: 1 - Critical"
// Show: Pulsing red indicator with urgency animation

const PriorityIndicator = ({ priority }: { priority: number }) => {
  const pulseValue = useSharedValue(1);
  
  useEffect(() => {
    if (priority <= 2) { // Critical/High priority
      pulseValue.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1, // Infinite repeat
        true // Reverse
      );
    }
  }, [priority]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
    shadowOpacity: priority <= 2 ? pulseValue.value * 0.3 : 0
  }));

  return (
    <Animated.View style={[styles.priorityBadge, animatedStyle]}>
      <Text style={styles.priorityText}>P{priority}</Text>
    </Animated.View>
  );
};
```

#### SLA Compliance Visualization
```typescript
// Instead of: "SLA: 85% within target"  
// Show: Animated progress ring with color psychology

const SLAComplianceRing = ({ percentage }: { percentage: number }) => {
  const progress = useSharedValue(0);
  
  useEffect(() => {
    progress.value = withTiming(percentage / 100, {
      duration: 2000,
      easing: Easing.out(Easing.cubic)
    });
  }, [percentage]);

  const ringColor = useMemo(() => {
    if (percentage >= 90) return '#10B981'; // Green - Excellent
    if (percentage >= 75) return '#F59E0B'; // Amber - Warning  
    return '#EF4444'; // Red - Critical
  }, [percentage]);

  return (
    <View style={styles.slaContainer}>
      <Svg width={80} height={80}>
        <Circle
          cx="40" cy="40" r="35"
          stroke="#E5E7EB" strokeWidth="6" fill="none"
        />
        <AnimatedCircle
          cx="40" cy="40" r="35"
          stroke={ringColor} strokeWidth="6" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animatedStrokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)" // Start from top
        />
      </Svg>
      <View style={styles.slaLabel}>
        <Text style={styles.slaPercentage}>{percentage}%</Text>
        <Text style={styles.slaLabel}>SLA</Text>
      </View>
    </View>
  );
};
```

## Gesture System Architecture

### Native-Feeling Gesture Patterns

#### iOS-Style Gesture Vocabulary
```typescript
interface iOSGestures {
  // Navigation gestures
  edgeSwipeBack: EdgeGesture;      // Navigate back from screen edge
  pullToRefresh: ElasticGesture;   // Elastic pull-to-refresh
  
  // Content gestures  
  longPressPreview: PreviewGesture; // 3D Touch style previews
  swipeActions: RevealGesture;     // Mail-style swipe actions
  
  // Selection gestures
  multiSelect: LassoGesture;       // Multi-touch selection
  dragReorder: SortableGesture;    // Drag to reorder lists
}

interface AndroidGestures {
  // Material Design gestures
  fabExpansion: ExpansionGesture;  // FAB morphing animations
  cardElevation: ElevationGesture; // Material elevation on touch
  
  // Navigation gestures
  bottomSheetGesture: SheetGesture; // Bottom sheet interactions
  tabSwipeGesture: PagerGesture;   // ViewPager style tab swiping
}
```

#### Cross-Platform Gesture Implementation
```typescript
const SwipeableIncidentCard = ({ incident }: { incident: Incident }) => {
  const translateX = useSharedValue(0);
  const contextualActions = useSharedValue<ContextualAction[]>([]);
  
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // Haptic feedback on gesture start
      if (Platform.OS === 'ios') {
        Haptics.selectionAsync();
      }
    })
    .onUpdate((event) => {
      const { translationX } = event;
      translateX.value = translationX;
      
      // Update contextual actions based on swipe direction/distance
      if (translationX > 80) {
        contextualActions.value = [{ type: 'resolve', color: '#10B981' }];
      } else if (translationX < -80) {
        contextualActions.value = [{ type: 'escalate', color: '#EF4444' }];
      } else {
        contextualActions.value = [];
      }
    })
    .onEnd((event) => {
      const { translationX, velocityX } = event;
      const shouldTriggerAction = Math.abs(translationX) > 120 || Math.abs(velocityX) > 500;
      
      if (shouldTriggerAction) {
        // Trigger action with completion animation
        const action = translationX > 0 ? 'resolve' : 'escalate';
        handleIncidentAction(incident.sys_id, action);
        
        // Animate card exit
        translateX.value = withTiming(translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH);
      } else {
        // Snap back to center
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <IncidentCardWithActions
        incident={incident}
        translateX={translateX}
        actions={contextualActions}
      />
    </GestureDetector>
  );
};
```

## Performance Architecture

### Animation Performance Optimization

#### Frame Rate Monitoring
```typescript
import { PerformanceMonitor } from '@react-native-async-storage/async-storage';

// Monitor animation performance in development
const AnimationPerformanceWrapper = ({ children }: { children: ReactNode }) => {
  const frameDropCount = useSharedValue(0);
  
  useAnimatedReaction(
    () => {
      return frameDropCount.value;
    },
    (current, previous) => {
      if (current > previous && __DEV__) {
        runOnJS(console.warn)(`Frame drop detected: ${current - previous} frames`);
      }
    }
  );
  
  return (
    <View style={{ flex: 1 }}>
      {children}
      {__DEV__ && <FrameRateIndicator frameDrops={frameDropCount} />}
    </View>
  );
};
```

#### Memory Management for Animations
```typescript
// Efficient Lottie animation management
const useLottieAnimation = (source: LottieSource, shouldPlay: boolean) => {
  const animationRef = useRef<LottieView>(null);
  
  useEffect(() => {
    if (shouldPlay) {
      animationRef.current?.play();
    } else {
      animationRef.current?.pause();
    }
  }, [shouldPlay]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animationRef.current?.reset();
    };
  }, []);
  
  return animationRef;
};

// Shared value cleanup pattern
const useCleanupSharedValues = (...sharedValues: SharedValue<any>[]) => {
  useEffect(() => {
    return () => {
      sharedValues.forEach(sv => {
        if (sv && typeof sv.value !== 'undefined') {
          sv.value = null; // Help garbage collection
        }
      });
    };
  }, [sharedValues]);
};
```

## Accessibility Architecture

### Inclusive Animation Design

```typescript
// Respect user motion preferences
const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const checkMotionPreference = async () => {
      const isReducedMotion = await AccessibilityInfo.isReduceMotionEnabled();
      setReducedMotion(isReducedMotion);
    };
    
    checkMotionPreference();
    
    const listener = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReducedMotion
    );
    
    return () => listener?.remove();
  }, []);
  
  return reducedMotion;
};

// Accessible animation configuration
const createAccessibleAnimation = (
  targetValue: number,
  options: {
    duration: number;
    reduced: number; // Reduced duration for motion-sensitive users
  }
) => {
  const reducedMotion = useReducedMotion();
  
  return withTiming(targetValue, {
    duration: reducedMotion ? options.reduced : options.duration,
    easing: reducedMotion ? Easing.linear : Easing.out(Easing.cubic)
  });
};
```

## Testing Architecture

### Animation Testing Strategy

```typescript
// Jest tests for animation logic
describe('IncidentCard Animations', () => {
  it('should animate card exit on resolve gesture', async () => {
    const { getByTestId } = render(<IncidentCard incident={mockIncident} />);
    const card = getByTestId('incident-card');
    
    // Simulate swipe gesture
    fireGestureHandler(card, [
      { translationX: 0 },
      { translationX: 150 }, // Past resolve threshold
    ]);
    
    // Wait for animation completion
    await waitFor(() => {
      expect(card).toHaveAnimatedStyle({
        transform: [{ translateX: SCREEN_WIDTH }]
      });
    });
  });
});

// Detox E2E tests for gesture interactions
describe('Gesture Interactions', () => {
  it('should resolve incident with swipe gesture', async () => {
    await element(by.id('incident-card-123')).swipe('right');
    await expect(element(by.text('Incident Resolved!'))).toBeVisible();
  });
});
```

## Development Tools Integration

### Animation Debugging Tools

```typescript
// Flipper integration for animation debugging
import { flipperAnimatedDebugger } from 'react-native-reanimated/lib/reanimated2/core';

if (__DEV__) {
  // Enable Flipper animation debugging
  flipperAnimatedDebugger.addPlugin('Reanimated', {
    // Track shared values
    trackSharedValue: (name: string, value: SharedValue<any>) => {
      // Send to Flipper for real-time monitoring
    }
  });
}

// Performance profiling hooks
const useAnimationProfiler = (animationName: string) => {
  const startTime = useSharedValue<number>(0);
  
  const start = useCallback(() => {
    startTime.value = performance.now();
  }, []);
  
  const end = useCallback(() => {
    const duration = performance.now() - startTime.value;
    if (__DEV__) {
      console.log(`Animation ${animationName}: ${duration}ms`);
    }
  }, [animationName]);
  
  return { start, end };
};
```

This client architecture ensures FlowQuest delivers native-feeling performance while transforming ServiceNow's enterprise data into delightful, engaging mobile experiences.