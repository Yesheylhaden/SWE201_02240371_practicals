import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#6200ee" />
        </View>
        <Text style={styles.name}>Yeshey Lhaden</Text>
        <Text style={styles.title}>Software Engineer</Text>
        <Text style={styles.location}>📍Choekhorling, Dekiling, Sarpang</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 About Me</Text>
        <Text style={styles.cardText}>
          I am a passionate mobile app developer specializing in React Native and Expo. 
          I love creating beautiful, performant, and user-friendly mobile applications 
          that solve real-world problems.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎓 Education</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Degree:</Text>
          <Text style={styles.infoText}>Bachelor of Software Engineering</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>University:</Text>
          <Text style={styles.infoText}>College of Science and Technology</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Year:</Text>
          <Text style={styles.infoText}>2024 - 2028</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💼 Skills</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillTag}><Text style={styles.skillText}>React Native</Text></View>
          <View style={styles.skillTag}><Text style={styles.skillText}>Expo</Text></View>
          <View style={styles.skillTag}><Text style={styles.skillText}>TypeScript</Text></View>
          <View style={styles.skillTag}><Text style={styles.skillText}>JavaScript</Text></View>
          <View style={styles.skillTag}><Text style={styles.skillText}>Node.js</Text></View>
          <View style={styles.skillTag}><Text style={styles.skillText}>Figma</Text></View>
          <View style={styles.skillTag}><Text style={styles.skillText}>React</Text></View>
          <View style={styles.skillTag}><Text style={styles.skillText}>REST APIs</Text></View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📫 Contact Me</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={20} color="#6200ee" />
          <Text style={styles.contactText}>lhadenyeshey66@gmail.com</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={20} color="#6200ee" />
          <Text style={styles.contactText}>+975 77406930</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="logo-github" size={20} color="#6200ee" />
          <Text 
            style={styles.linkText} 
            onPress={() => Linking.openURL('https://github.com/yesheylhaden')}
          >
            github.com/yesheylhaden
          </Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="logo-linkedin" size={20} color="#6200ee" />
          <Text 
            style={styles.linkText} 
            onPress={() => Linking.openURL('https://linkedin.com/in/yourusername')}
          >
            linkedin.com/in/yesheylhaden
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#6200ee',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
  },
  skillText: {
    fontSize: 14,
    color: '#6200ee',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  linkText: {
    fontSize: 14,
    color: '#6200ee',
    marginLeft: 12,
    textDecorationLine: 'underline',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    marginHorizontal: 15,
  },
});