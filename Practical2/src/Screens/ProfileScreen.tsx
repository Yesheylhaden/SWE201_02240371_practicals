import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Styles/ThemeContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../Styles/theme';

const SKILLS = ['React Native', 'TypeScript', 'Python', 'SQL', 'Git', 'Figma'];

const CONTACT = [
  { icon: 'email',          label: 'Email',      value: 'student@cst.edu.bt' },
  { icon: 'phone',          label: 'Phone',      value: '+975-17-123456'     },
  { icon: 'business',       label: 'Department', value: 'Software Engineering' },
  { icon: 'calendar-today', label: 'Year',       value: '2nd Year, Sem 2'    },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const insets    = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // On tablets, show contact info and skills side by side
  const isTablet = width >= 600;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>YL</Text>
          </View>
          <Text style={styles.heroName}>Yeshey Lhaden</Text>
          <Text style={styles.heroSub}>Bachelor of Software Engineering</Text>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>2nd Year • CST Rinchending</Text>
          </View>
        </View>

        <View style={[styles.content, { paddingHorizontal: Spacing.lg }]}>

          {/* Contact + Skills — side by side on tablet */}
          <View style={[styles.twoCol, isTablet && styles.twoColRow]}>

            {/* Contact Info */}
            <View style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
              isTablet && { flex: 1 },
              Shadows.md,
            ]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Contact Info</Text>
              {CONTACT.map((item, i) => (
                <View key={item.label}>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoIcon, { backgroundColor: isDark ? colors.surface : Colors.lightGray }]}>
                      <MaterialIcons name={item.icon as any} size={16} color={Colors.accent} />
                    </View>
                    <View>
                      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{item.label}</Text>
                      <Text style={[styles.infoValue, { color: colors.text }]}>{item.value}</Text>
                    </View>
                  </View>
                  {i < CONTACT.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                </View>
              ))}
            </View>

            {/* Skills */}
            <View style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
              isTablet && { flex: 1 },
              Shadows.md,
            ]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Skills</Text>
              <View style={styles.skillsWrap}>
                {SKILLS.map((skill) => (
                  <View key={skill} style={[styles.skillChip, { backgroundColor: isDark ? colors.surface : Colors.lightGray, borderColor: colors.border }]}>
                    <Text style={[styles.skillText, { color: colors.text }]}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>

          {/* About */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, Shadows.sm]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>About Me</Text>
            <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
              I am a 2nd year Software Engineering student at the College of Science and Technology,
              Bhutan. I enjoy building mobile apps and learning new technologies.
            </Text>
          </View>

          {/* Back button */}
          <TouchableOpacity style={styles.backCta} onPress={() => navigation.goBack()}>
            <MaterialIcons name="dashboard" size={20} color={Colors.white} />
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
  avatar:        { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md, borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)' },
  avatarText:    { fontSize: Typography.fontSizes.lg, fontWeight: Typography.fontWeights.extrabold, color: Colors.primary },
  heroName:      { fontSize: Typography.fontSizes.xl, fontWeight: Typography.fontWeights.bold, color: Colors.white, marginBottom: Spacing.xs },
  heroSub:       { fontSize: Typography.fontSizes.sm, color: 'rgba(255,255,255,0.7)', marginBottom: Spacing.sm },
  heroBadge:     { backgroundColor: Colors.accent, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full },
  heroBadgeText: { fontSize: Typography.fontSizes.xs, fontWeight: Typography.fontWeights.bold, color: Colors.primary },
  content:       { marginTop: -Spacing.xl },
  twoCol:        { gap: Spacing.md, marginBottom: Spacing.md },
  twoColRow:     { flexDirection: 'row', alignItems: 'flex-start' },
  card:          { borderRadius: BorderRadius.xl, padding: Spacing.base, borderWidth: 1, marginBottom: Spacing.md },
  cardTitle:     { fontSize: Typography.fontSizes.md, fontWeight: Typography.fontWeights.bold, marginBottom: Spacing.md },
  infoRow:       { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm },
  infoIcon:      { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  infoLabel:     { fontSize: Typography.fontSizes.xs, marginBottom: 1 },
  infoValue:     { fontSize: Typography.fontSizes.base, fontWeight: Typography.fontWeights.medium },
  divider:       { height: 1, marginLeft: 50 },
  skillsWrap:    { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  skillChip:     { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, borderWidth: 1 },
  skillText:     { fontSize: Typography.fontSizes.sm },
  aboutText:     { fontSize: Typography.fontSizes.base, lineHeight: 24 },
  backCta:       { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: Spacing.md, borderRadius: BorderRadius.lg, marginTop: Spacing.sm },
  backCtaText:   { fontSize: Typography.fontSizes.base, fontWeight: Typography.fontWeights.semibold, color: Colors.white },
});
