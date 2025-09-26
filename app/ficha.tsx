import { api } from '@/api';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FichaModal() {
  const params = useLocalSearchParams();
  const { id } = params;

  const { title, overview, type, poster, director, runtime, genres, characters } = api.getTitleInfo(Number(id));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {poster && (
          <Image 
            source={{ uri: poster as string }} 
            style={styles.poster}
            resizeMode="contain"
          />
        )}
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          
          <View style={styles.metadata}>
            <Text style={styles.type}>{type === 'movie' ? 'Película' : 'Serie'} · {genres[0]?.name}</Text>            
            {runtime && <Text style={styles.runtime}>{runtime} min</Text>}
          </View>

          {director && (
            <View style={styles.directorContainer}>
              <Text style={styles.directorLabel}>Director</Text>
              <Text style={styles.director}>{director}</Text>
            </View>
          )}

          {overview && (
            <View style={styles.overviewContainer}>
              <Text style={styles.overview}>{overview}</Text>
            </View>
          )}

          {characters?.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 12, marginTop: 20, marginHorizontal: -24, paddingHorizontal: 24 }}>
            {characters.map((char) => (
                <View key={char.id} style={{ alignItems: 'center', width: 100 }}>
                    {char.image ? (
                        <Image 
                        source={{ uri: char.image }}
                        style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16 }}
                        resizeMode="cover"
                        />
                    ) : (
                        <View 
                            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ color: '#888' }}>No Image</Text>
                        </View>
                    )}
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }} numberOfLines={1}>{char.name}</Text>
                    <Text style={{ color: '#ccc', fontSize: 12, textAlign: 'center' }} numberOfLines={1}>{char.personName}</Text>
                </View>
            ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    padding: 20,
  },
  poster: {
    height: 200,
    aspectRatio: 2/3,
    borderRadius: 16,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  infoContainer: {
    gap: 24,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  metadata: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  type: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'medium',
  },
  rating: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'medium',
  },
  runtime: {
    color: 'white',
    fontSize: 16,
  },
  directorContainer: {
    gap: 4,
  },
  directorLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  director: {
    color: '#ccc',
    fontSize: 16,
  },
  overviewContainer: {
    gap: 8,
  },
  overviewTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overview: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
});