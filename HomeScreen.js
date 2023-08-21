import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Button, ActivityIndicator } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = (pageNumber) => {
    setIsLoadingMore(true);
    setError(null);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10`)
      .then(response => response.json())
      .then(data => {
        if (pageNumber === 1) {
          setPosts(data);
        } else {
          setPosts(prevPosts => [...prevPosts, ...data]);
        }
        setIsRefreshing(false);
        setIsLoadingMore(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError('An error occurred while fetching data.');
        setIsRefreshing(false);
        setIsLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', {
      title: post.title,
      body: post.body,
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Posts</Text>
        <Button title="Refresh" onPress={() => fetchPosts(1)} disabled={isRefreshing} />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => handlePostPress(item)}
              underlayColor="#E0E0E0"
            >
              <View style={styles.post}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            </TouchableHighlight>
          )}
          refreshing={isRefreshing}
          onRefresh={() => fetchPosts(1)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isLoadingMore && <ActivityIndicator style={styles.loadingIndicator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  post: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  body: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default HomeScreen;
