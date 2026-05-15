import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Task, Priority } from '../reducers/taskReducer';

type Props = {
  task: Task;
  onToggleDone: (id: number) => void;
  onEditTask:   (id: number, title: string) => void;
};

const PRIORITY_BADGE: Record<Priority, { bg: string; text: string; label: string }> = {
  low:    { bg: '#D1FAE5', text: '#065F46', label: '↓ Low'    },
  normal: { bg: '#DBEAFE', text: '#1E40AF', label: '→ Normal' },
  high:   { bg: '#FEE2E2', text: '#991B1B', label: '↑ High'   },
};

const FIVE_MINUTES = 5 * 60 * 1000;

export default function TaskCard({ task, onToggleDone, onEditTask }: Props) {
  const { colors } = useTheme();
  const badge = PRIORITY_BADGE[task.priority];

  // ── Part 5 mini exercise 2: "New" badge for tasks < 5 min old ────────────
  const [isNew, setIsNew] = useState(
    () => Date.now() - task.createdAt < FIVE_MINUTES
  );

  useEffect(() => {
    if (!isNew) return;
    // Schedule removal of "New" badge when the 5-min window closes
    const remaining = FIVE_MINUTES - (Date.now() - task.createdAt);
    if (remaining <= 0) { setIsNew(false); return; }
    const timer = setTimeout(() => setIsNew(false), remaining);
    return () => clearTimeout(timer);   // cleanup on unmount
  }, [task.createdAt, isNew]);

  // ── Local state: inline edit form (Part 4 exercise) ───────────────────────
  const [editing, setEditing]     = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSaveEdit = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) onEditTask(task.id, trimmed);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditing(false);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor:      task.done ? colors.success : colors.border,
          opacity:          task.done ? 0.7 : 1,
        },
      ]}
    >
      {editing ? (
        /* ── Inline edit form ─────────────────────────────────────────── */
        <View style={styles.editRow}>
          <TextInput
            style={[
              styles.editInput,
              { color: colors.text, borderColor: colors.primary, backgroundColor: colors.background },
            ]}
            value={editTitle}
            onChangeText={setEditTitle}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleSaveEdit}
          />
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: colors.success + '22' }]}
            onPress={handleSaveEdit}
          >
            <Ionicons name="checkmark" size={18} color={colors.success} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: colors.danger + '22' }]}
            onPress={handleCancelEdit}
          >
            <Ionicons name="close" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
      ) : (
        /* ── Normal display ───────────────────────────────────────────── */
        <View style={styles.displayRow}>
          <TouchableOpacity style={styles.left} onPress={() => onToggleDone(task.id)} activeOpacity={0.7}>
            {/* Checkbox */}
            <View
              style={[
                styles.checkbox,
                {
                  borderColor:     task.done ? colors.success : colors.border,
                  backgroundColor: task.done ? colors.success : 'transparent',
                },
              ]}
            >
              {task.done && <Ionicons name="checkmark" size={13} color="#fff" />}
            </View>

            {/* Text + badges */}
            <View style={styles.textBlock}>
              <View style={styles.titleRow}>
                <Text
                  style={[
                    styles.title,
                    {
                      color:              colors.text,
                      textDecorationLine: task.done ? 'line-through' : 'none',
                    },
                  ]}
                  numberOfLines={2}
                >
                  {task.title}
                </Text>
                {/* Part 5 mini exercise 2: "New" badge */}
                {isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>✨ New</Text>
                  </View>
                )}
              </View>
              {/* Priority badge */}
              <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Edit button */}
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => { setEditTitle(task.title); setEditing(true); }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="pencil-outline" size={17} color={colors.subtext} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card:        { borderRadius: 10, borderWidth: 1, padding: 12, marginBottom: 8 },
  displayRow:  { flexDirection: 'row', alignItems: 'center' },
  left:        { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox:    { width: 22, height: 22, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  textBlock:   { flex: 1, gap: 4 },
  titleRow:    { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  title:       { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  newBadge:    { backgroundColor: '#FEF9C3', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8 },
  newBadgeText:{ fontSize: 10, fontWeight: '700', color: '#92400E' },
  badge:       { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText:   { fontSize: 11, fontWeight: '600' },
  iconBtn:     { padding: 5, borderRadius: 6, marginLeft: 6, alignItems: 'center', justifyContent: 'center' },
  editRow:     { flexDirection: 'row', alignItems: 'center', gap: 6 },
  editInput:   { flex: 1, borderWidth: 1.5, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7, fontSize: 14 },
});
