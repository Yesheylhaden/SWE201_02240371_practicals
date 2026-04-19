import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '../Styles/ThemeContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../Styles/theme';
import { RootStackParamList } from '../Types';

// Type for route params
type RouteType = RouteProp<RootStackParamList, 'CourseDetail'>;

// Static schedule data
const SCHEDULE = [
  { day: 'Monday',    time: '08:00 – 09:50', room: 'Lab B-204'  },
  { day: 'Wednesday', time: '09:00 – 10:50', room: 'Room A-101' },
  { day: 'Friday',    time: '11:00 – 12:50', room: 'Room A-101' },
];

// Static assessments data
const ASSESSMENTS = [
  { title: 'Assignment 1', weight: '10%', score: '9/10',   done: true  },
  { title: 'Quiz 1',       weight: '5%',  score: '14/15',  done: true  },
  { title: 'Mid-Term',     weight: '25%', score: '80/100', done: true  },
  { title: 'Assignment 2', weight: '10%', score: '—',      done: false },
  { title: 'Final Exam',   weight: '50%', score: '—',      done: false },
];

export default function CourseDetailScreen() {
  const route      = useRoute<RouteType>();
  const navigation = useNavigation();
  const { course } = route.params;
  const { colors } = useTheme();
  const insets     = useSafeAreaInsets();
  const { width }  = useWindowDimensions();

  // Side by side on tablet
  const isTablet = width >= 600;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>

      {/* Header with back button */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm, borderBottomColor: course.color }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Detail</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Course info (hero section) */}
        <View style={styles.hero}>
          <View style={[styles.codeBadge, { backgroundColor: course.color }]}>
            <Text style={styles.codeBadgeText}>{course.code}</Text>
          </View>
          <Text style={styles.heroName}>{course.name}</Text>
          <Text style={styles.heroSub}>{course.instructor}</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{course.credits}</Text>
              <Text style={styles.heroStatLabel}>Credits</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{course.grade}</Text>
              <Text style={styles.heroStatLabel}>Grade</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>Ongoing</Text>
              <Text style={styles.heroStatLabel}>Status</Text>
            </View>
          </View>
        </View>

        <View style={[styles.content, { paddingHorizontal: Spacing.lg }]}>

          {/* Responsive: side by side on tablet */}
          <View style={[styles.twoCol, isTablet && styles.twoColRow]}>

            {/* Schedule */}
            <View style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
              isTablet && { flex: 1 },
              Shadows.md,
            ]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Weekly Schedule</Text>
              {SCHEDULE.map((s, i) => (
                <View key={s.day}>
                  <View style={styles.scheduleRow}>
                    <View style={[styles.dayDot, { backgroundColor: course.color }]} />
                    <View>
                      <Text style={[styles.scheduleDay, { color: colors.text }]}>{s.day}</Text>
                      <Text style={[styles.scheduleSub, { color: colors.textSecondary }]}>{s.time} • {s.room}</Text>
                    </View>
                  </View>
                  {i < SCHEDULE.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                </View>
              ))}
            </View>
          </View>

          {/* Back button */}
          <TouchableOpacity
            style={[styles.backCta, { backgroundColor: course.color }]}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={20} color={Colors.white} />
            <Text style={styles.backCtaText}>Back to Dashboard</Text>
          </TouchableOpacity>

          <View style={{ height: Spacing.xxxl }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingBottom: Spacing.md, paddingHorizontal: Spacing.lg,
    borderBottomWidth: 3,
  },
  backBtn:     { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: Typography.fontSizes.md, fontWeight: Typography.fontWeights.semibold, color: Colors.white },
  hero: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingBottom: Spacing.xxl + Spacing.md,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  codeBadge:     { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, marginBottom: Spacing.md },
  codeBadgeText: { fontSize: Typography.fontSizes.sm, fontWeight: Typography.fontWeights.extrabold, color: Colors.white, letterSpacing: 1 },
  heroName:      { fontSize: Typography.fontSizes.lg, fontWeight: Typography.fontWeights.bold, color: Colors.white, textAlign: 'center', marginBottom: Spacing.xs },
  heroSub:       { fontSize: Typography.fontSizes.sm, color: 'rgba(255,255,255,0.7)', marginBottom: Spacing.lg },
  heroStats:     { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: BorderRadius.lg, padding: Spacing.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', width: '100%' },
  heroStat:        { flex: 1, alignItems: 'center' },
  heroStatValue:   { fontSize: Typography.fontSizes.md, fontWeight: Typography.fontWeights.extrabold, color: Colors.white },
  heroStatLabel:   { fontSize: Typography.fontSizes.xs, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  heroStatDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' },
  content:  { marginTop: -Spacing.xl },
  twoCol:   { gap: Spacing.md, marginBottom: Spacing.md },
  twoColRow:{ flexDirection: 'row', alignItems: 'flex-start' },
  card:     { borderRadius: BorderRadius.xl, padding: Spacing.base, borderWidth: 1, marginBottom: Spacing.md },
  cardTitle:{ fontSize: Typography.fontSizes.md, fontWeight: Typography.fontWeights.bold, marginBottom: Spacing.md },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  dayDot:      { width: 10, height: 10, borderRadius: 5 },
  scheduleDay: { fontSize: Typography.fontSizes.base, fontWeight: Typography.fontWeights.semibold },
  scheduleSub: { fontSize: Typography.fontSizes.sm, marginTop: 2 },
  assessRow:   { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  assessInfo:  { flex: 1 },
  assessTitle: { fontSize: Typography.fontSizes.sm, fontWeight: Typography.fontWeights.semibold },
  assessSub:   { fontSize: Typography.fontSizes.xs, marginTop: 1 },
  assessScore: { fontSize: Typography.fontSizes.sm, fontWeight: Typography.fontWeights.bold },
  divider:     { height: 1, marginLeft: Spacing.xl },
  backCta:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: Spacing.md, borderRadius: BorderRadius.lg, marginTop: Spacing.sm },
  backCtaText: { fontSize: Typography.fontSizes.base, fontWeight: Typography.fontWeights.semibold, color: Colors.white },
});
