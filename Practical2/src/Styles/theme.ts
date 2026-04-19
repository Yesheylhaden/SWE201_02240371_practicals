import { Platform } from 'react-native';

export const Colors = {
  primary:      '#0A1628',
  accent:       '#E8A020',
  success:      '#10B981',
  info:         '#3B82F6',
  warning:      '#F59E0B',
  danger:       '#EF4444',
  purple:       '#8B5CF6',
  white:        '#FFFFFF',
  offWhite:     '#F8F9FB',
  lightGray:    '#EDF0F5',
  midGray:      '#C8CDD8',
  darkGray:     '#6B7280',
  cardBorder:   '#E8ECF4',
};

export const Typography = {
  fontSizes: {
    xs:   11,
    sm:   13,
    base: 15,
    md:   17,
    lg:   20,
    xl:   24,
    xxl:  30,
  },
  fontWeights: {
    regular:   '400' as const,
    medium:    '500' as const,
    semibold:  '600' as const,
    bold:      '700' as const,
    extrabold: '800' as const,
  },
};

export const Spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  base: 16,
  lg:   20,
  xl:   24,
  xxl:  32,
  xxxl: 48,
};

export const BorderRadius = {
  sm:   6,
  md:   10,
  lg:   16,
  xl:   24,
  full: 9999,
};

export const Shadows = {
  sm: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 10 },
    android: { elevation: 4 },
  }),
};
