import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../Styles/ThemeContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../Styles/theme';
import { RootStackParamList, Course } from '../Types';

type Nav = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const COURSES: Course[] = [
  { id: '1', code: 'CS301', name: 'Data Structures',     instructor: 'Dr. Karma',    credits: 4, grade: 'A',  color: '#3B82F6' },
  { id: '2', code: 'SE302', name: 'Software Engineering',instructor: 'Prof. Dorji',  credits: 3, grade: 'B+', color: '#8B5CF6' },
  { id: '3', code: 'CS305', name: 'Database Systems',    instructor: 'Dr. Pema',     credits: 4, grade: 'A-', color: '#10B981' },
  { id: '4', code: 'EN301', name: 'Technical Writing',   instructor: 'Prof. Deki',   credits: 2, grade: 'B',  color: '#F59E0B' },
];

const TODAY_TASKS = [
  { id: '1', task: 'Submit CS301 Assignment 2', done: false },
  { id: '2', task: 'Read SE302 Chapter 5',       done: true  },
  { id: '3', task: 'Prepare for CS305 Quiz',     done: false },
];

export default function DashboardScreen() {
  const navigation = useNavigation<Nav>();
  const { colors, isDark, toggle } = useTheme();
  const insets     = useSafeAreaInsets();
  const { width }  = useWindowDimensions();

  const isTablet  = width >= 600;
  const cardWidth = isTablet
    ? (width - Spacing.lg * 2 - Spacing.md) / 2
    : width - Spacing.lg * 2;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View>
          <Text style={styles.headerSub}>Good morning 👋</Text>
          <Text style={styles.headerTitle}>My Dashboard</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={toggle}>
            <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={22} color={Colors.accent} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.avatarText}>YL</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Summary */}
        <View style={styles.summaryRow}>
          {[
            { label: 'Courses', value: '4',  color: '#3B82F6' },
            { label: 'Credits', value: '13', color: '#10B981' },
            { label: 'GPA',     value: '3.6',color: '#F59E0B' },
          ].map((s) => (
            <View key={s.label} style={[styles.summaryCard, { backgroundColor: s.color + '18', flex: 1 }]}>
              <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Courses */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>My Courses</Text>
        <View style={[styles.coursesWrap, isTablet && styles.coursesGrid]}>
          {COURSES.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={[styles.courseCard, { backgroundColor: colors.card, borderColor: colors.border, width: cardWidth }, Shadows.sm]}
              onPress={() => navigation.navigate('CourseDetail', { course })}
              activeOpacity={0.75}
            >
              <View style={[styles.courseStripe, { backgroundColor: course.color }]} />
              <View style={styles.courseInfo}>
                <View style={styles.courseTopRow}>
                  <View style={[styles.codePill, { backgroundColor: course.color + '20' }]}>
                    <Text style={[styles.codeText, { color: course.color }]}>{course.code}</Text>
                  </View>
                  <Text style={[styles.gradeText, { color: course.color }]}>{course.grade}</Text>
                </View>
                <Text style={[styles.courseName, { color: colors.text }]}>{course.name}</Text>
                <Text style={[styles.instructorText, { color: colors.textSecondary }]}>{course.instructor}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Go to profile */}
        <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Profile')} activeOpacity={0.85}>
          <MaterialIcons name="person" size={20} color={Colors.white} />
          <Text style={styles.profileBtnText}>Go to Profile</Text>
          <MaterialIcons name="arrow-forward" size={20} color={Colors.white} />
        </TouchableOpacity>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    backgroundColor: Colors.primary,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSub:    { fontSize: Typography.fontSizes.sm, color: 'rgba(255,255,255,0.6)' },
  headerTitle:  { fontSize: Typography.fontSizes.xl, fontWeight: Typography.fontWeights.extrabold, color: Colors.white },
  headerRight:  { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconBtn:      { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  avatarBtn:    { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText:   { fontSize: Typography.fontSizes.sm, fontWeight: Typography.fontWeights.bold, color: Colors.primary },
  scroll:       { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl },
  summaryRow:   { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl },
  summaryCard:  { borderRadius: BorderRadius.lg, padding: Spacing.md, alignItems: 'center' },
  summaryValue: { fontSize: Typography.fontSizes.xl, fontWeight: Typography.fontWeights.extrabold },
  summaryLabel: { fontSize: Typography.fontSizes.xs, marginTop: 2 },
  sectionTitle: { fontSize: Typography.fontSizes.md, fontWeight: Typography.fontWeights.bold, marginBottom: Spacing.md },
  coursesWrap:  { gap: Spacing.sm, marginBottom: Spacing.xl },
  coursesGrid:  { flexDirection: 'row', flexWrap: 'wrap' },
  courseCard:   { flexDirection: 'row', alignItems: 'center', borderRadius: BorderRadius.lg, borderWidth: 1, overflow: 'hidden' },
  courseStripe: { width: 4, alignSelf: 'stretch' },
  courseInfo:   { flex: 1, padding: Spacing.md },
  courseTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.xs },
  codePill:     { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.full },
  codeText:     { fontSize: Typography.fontSizes.xs, fontWeight: Typography.fontWeights.bold },
  gradeText:    { fontSize: Typography.fontSizes.sm, fontWeight: Typography.fontWeights.extrabold },
  courseName:   { fontSize: Typography.fontSizes.base, fontWeight: Typography.fontWeights.semibold, marginBottom: 2 },
  instructorText: { fontSize: Typography.fontSizes.xs },
  tasksCard:    { borderRadius: BorderRadius.lg, borderWidth: 1, paddingHorizontal: Spacing.md, marginBottom: Spacing.xl },
  taskRow:      { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  taskText:     { flex: 1, fontSize: Typography.fontSizes.base },
  taskDone:     { textDecorationLine: 'line-through' },
  divider:      { height: 1 },
  profileBtn:   { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: Spacing.md, borderRadius: BorderRadius.lg },
  profileBtnText: { fontSize: Typography.fontSizes.base, fontWeight: Typography.fontWeights.semibold, color: Colors.white },
});
