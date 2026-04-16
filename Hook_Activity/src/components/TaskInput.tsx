import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Priority } from '../reducers/taskReducer';

// ─── Types ────────────────────────────────────────────────────────────────────
type Props = {
  onAddTask: (title: string, priority: Priority) => void;
};

const PRIORITIES: Priority[] = ['low', 'normal', 'high'];

const PRIORITY_COLORS: Record<Priority, string> = {
  low:    '#10B981',
  normal: '#3B82F6',
  high:   '#EF4444',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function TaskInput({ onAddTask }: Props) {
  // ── useState: two independent state variables ─────────────────────────────
  const [title, setTitle]       = useState('');
  const [priority, setPriority] = useState<Priority>('normal');

  const { colors } = useTheme();

  const MAX_LEN = 60;
  const overLimit = title.length > MAX_LEN;

  const handleSubmit = () => {
    if (!title.trim() || overLimit) return;
    onAddTask(title.trim(), priority);
    setTitle('');
    setPriority('normal');
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {/* Title input */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            color: colors.text,
            borderColor: overLimit ? colors.danger : colors.border,
          },
        ]}
        placeholder="What needs to be done?"
        placeholderTextColor={colors.subtext}
        value={title}
        onChangeText={setTitle}
        maxLength={MAX_LEN + 10}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      {/* Character counter — turns red over limit */}
      <Text
        style={[
          styles.charCount,
          { color: overLimit ? colors.danger : colors.subtext },
        ]}
      >
        {title.length} / {MAX_LEN}
      </Text>

      {/* Priority chips */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.subtext }]}>Priority:</Text>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.chip,
              {
                backgroundColor:
                  priority === p ? PRIORITY_COLORS[p] : colors.background,
                borderColor: PRIORITY_COLORS[p],
              },
            ]}
            onPress={() => setPriority(p)}
          >
            <Text
              style={[
                styles.chipText,
                { color: priority === p ? '#fff' : PRIORITY_COLORS[p] },
              ]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Live preview — updates on every keystroke */}
      {title.length > 0 && (
        <Text style={[styles.preview, { color: colors.subtext }]}>
          Preview: "{title}" · {priority}
        </Text>
      )}

      {/* Action buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.btnAdd,
            {
              backgroundColor:
                !title.trim() || overLimit ? colors.border : colors.primary,
            },
          ]}
          onPress={handleSubmit}
          disabled={!title.trim() || overLimit}
        >
          <Text style={[styles.btnAddText, { color: colors.primaryText }]}>
            + Add Task
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnClear, { borderColor: colors.border }]}
          onPress={() => setTitle('')}
        >
          <Text style={[styles.btnClearText, { color: colors.subtext }]}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 4,
  },
  charCount: {
    fontSize: 11,
    textAlign: 'right',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  preview: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  btnAdd: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnAddText: {
    fontWeight: '700',
    fontSize: 14,
  },
  btnClear: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  btnClearText: {
    fontWeight: '600',
    fontSize: 14,
  },
});
