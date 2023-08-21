import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from JSONPlaceholder API
    fetch.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostsScreen;
