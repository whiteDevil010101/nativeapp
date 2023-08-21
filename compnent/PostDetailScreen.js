import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PostDetailScreen = ({ route }) => {
  const { title, body } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  body: {
    fontSize: 18,
    lineHeight: 28,
    color: '#666',
  },
});

export default PostDetailScreen;
