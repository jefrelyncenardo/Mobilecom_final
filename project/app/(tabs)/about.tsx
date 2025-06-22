import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { MapPin, Phone, Clock, Mail, Star, Award, Users } from 'lucide-react-native';

export default function AboutScreen() {
  const handleCall = () => {
    Linking.openURL('tel:+6321234567');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:info@kamayanrestaurant.com');
  };

  const handleDirections = () => {
    const url = Platform.select({
      ios: 'maps:0,0?q=Kamayan Filipino Restaurant',
      android: 'geo:0,0?q=Kamayan Filipino Restaurant',
      web: 'https://maps.google.com?q=Kamayan Filipino Restaurant'
    });
    if (url) Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>About Kamayan</Text>
        <Text style={styles.subtitle}>Authentic Filipino Dining Experience</Text>
      </View>

      {/* Story Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.storyText}>
          Since 1995, Kamayan Filipino Restaurant has been serving authentic Filipino cuisine to the community. 
          Founded by the Dela Cruz family, we've maintained our commitment to traditional recipes, 
          fresh ingredients, and warm Filipino hospitality for nearly three decades.
        </Text>
        <Text style={styles.storyText}>
          The name "Kamayan" refers to the traditional Filipino way of eating with hands, 
          symbolizing the communal and familial spirit that defines Filipino culture. 
          We invite you to experience this tradition in our welcoming atmosphere.
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.section}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Star size={24} color="#FFD700" fill="#FFD700" />
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Users size={24} color="#e67e22" />
            <Text style={styles.statNumber}>29</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
          <View style={styles.statItem}>
            <Award size={24} color="#e67e22" />
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Awards</Text>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
          <Phone size={20} color="#e67e22" />
          <View style={styles.contactText}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>+63 2 123 4567</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
          <Mail size={20} color="#e67e22" />
          <View style={styles.contactText}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>info@kamayanrestaurant.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleDirections}>
          <MapPin size={20} color="#e67e22" />
          <View style={styles.contactText}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>
              123 Rizal Street, Makati City{'\n'}Metro Manila, Philippines
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.contactItem}>
          <Clock size={20} color="#e67e22" />
          <View style={styles.contactText}>
            <Text style={styles.contactLabel}>Hours</Text>
            <View>
              <Text style={styles.contactValue}>Monday - Thursday: 11:00 AM - 10:00 PM</Text>
              <Text style={styles.contactValue}>Friday - Saturday: 11:00 AM - 11:00 PM</Text>
              <Text style={styles.contactValue}>Sunday: 12:00 PM - 9:00 PM</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Specialties Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Specialties</Text>
        <View style={styles.specialties}>
          <View style={styles.specialty}>
            <Text style={styles.specialtyEmoji}>🍖</Text>
            <Text style={styles.specialtyName}>Traditional Adobo</Text>
            <Text style={styles.specialtyDescription}>Our signature dish with perfectly balanced vinegar and soy sauce</Text>
          </View>
          
          <View style={styles.specialty}>
            <Text style={styles.specialtyEmoji}>🥘</Text>
            <Text style={styles.specialtyName}>Kare-Kare</Text>
            <Text style={styles.specialtyDescription}>Rich oxtail stew with authentic peanut sauce</Text>
          </View>
          
          <View style={styles.specialty}>
            <Text style={styles.specialtyEmoji}>🐷</Text>
            <Text style={styles.specialtyName}>Lechon Kawali</Text>
            <Text style={styles.specialtyDescription}>Crispy pork belly served with traditional liver sauce</Text>
          </View>
          
          <View style={styles.specialty}>
            <Text style={styles.specialtyEmoji}>🥟</Text>
            <Text style={styles.specialtyName}>Lumpia Shanghai</Text>
            <Text style={styles.specialtyDescription}>Golden crispy spring rolls with seasoned ground pork</Text>
          </View>
        </View>
      </View>

      {/* Mission Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.missionText}>
          To preserve and share the rich culinary heritage of the Philippines while creating 
          a gathering place where families and friends can enjoy authentic flavors, 
          warm hospitality, and unforgettable dining experiences.
        </Text>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#e67e22',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e67e22',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactText: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  specialties: {
    gap: 16,
  },
  specialty: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  specialtyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  specialtyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  specialtyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  missionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});