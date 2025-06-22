import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Calendar, Phone, Clock, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const featuredDishes = [
    { name: 'Adobo', price: '₱280', description: 'Traditional Filipino braised pork and chicken' },
    { name: 'Lechon Kawali', price: '₱320', description: 'Crispy pork belly with liver sauce' },
    { name: 'Kare-Kare', price: '₱350', description: 'Oxtail stew with peanut sauce' },
    { name: 'Lumpia Shanghai', price: '₱180', description: 'Crispy spring rolls with ground pork' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg' }}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Kamayan Filipino Restaurant</Text>
            <Text style={styles.heroSubtitle}>Authentic Filipino Cuisine Since 1995</Text>
            <View style={styles.ratingContainer}>
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>4.9 • 1,247 reviews</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/reservations')}
        >
          <Calendar size={24} color="#fff" />
          <Text style={styles.primaryButtonText}>Reserve a Table</Text>
        </TouchableOpacity>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={20} color="#e67e22" />
            <Text style={styles.actionButtonText}>Call Now</Text>
            <Text style={styles.actionButtonSubtext}>+63 2 123 4567</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Clock size={20} color="#e67e22" />
            <Text style={styles.actionButtonText}>Hours</Text>
            <Text style={styles.actionButtonSubtext}>11AM - 10PM</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Dishes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Dishes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dishesContainer}>
          {featuredDishes.map((dish, index) => (
            <View key={index} style={styles.dishCard}>
              <ImageBackground
                source={{ uri: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg' }}
                style={styles.dishImage}
                imageStyle={styles.dishImageStyle}
              >
                <View style={styles.dishOverlay}>
                  <Text style={styles.dishPrice}>{dish.price}</Text>
                </View>
              </ImageBackground>
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishDescription}>{dish.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Restaurant Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Kamayan?</Text>
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🍽️</Text>
            <Text style={styles.featureTitle}>Authentic Recipes</Text>
            <Text style={styles.featureDescription}>Traditional Filipino dishes passed down through generations</Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🌿</Text>
            <Text style={styles.featureTitle}>Fresh Ingredients</Text>
            <Text style={styles.featureDescription}>Sourced locally and prepared daily for maximum freshness</Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>👨‍🍳</Text>
            <Text style={styles.featureTitle}>Expert Chefs</Text>
            <Text style={styles.featureDescription}>Filipino culinary masters with over 20 years of experience</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    height: 280,
    marginBottom: 20,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroImageStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#e67e22',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#e67e22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  actionButtonSubtext: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  dishesContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dishCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  dishImage: {
    height: 120,
    justifyContent: 'flex-end',
  },
  dishImageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dishOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    alignItems: 'flex-end',
  },
  dishPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#e67e22',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dishInfo: {
    padding: 12,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  features: {
    gap: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  featureTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginLeft: 36,
    marginTop: -20,
  },
  bottomSpacing: {
    height: 20,
  },
});