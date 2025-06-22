import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Save } from 'lucide-react-native';
import { fetchReservations, updateReservation, type Reservation } from '@/utils/database';

export default function EditReservationScreen() {
  const { reservationId } = useLocalSearchParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [datetime, setDatetime] = useState('');
  const [guests, setGuests] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReservation();
  }, [reservationId]);

  const loadReservation = async () => {
    try {
      const reservations = await fetchReservations();
      const found = reservations.find(r => r.id.toString() === reservationId);
      
      if (found) {
        setReservation(found);
        setName(found.name);
        setPhone(found.phone);
        setDatetime(found.datetime);
        setGuests(found.guests.toString());
      } else {
        Alert.alert('Error', 'Reservation not found');
        router.back();
      }
    } catch (error) {
      console.error('Error loading reservation:', error);
      Alert.alert('Error', 'Failed to load reservation');
      router.back();
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !phone.trim() || !datetime.trim() || !guests.trim()) {
      Alert.alert('Incomplete Information', 'Please fill out all fields.');
      return;
    }

    const guestCount = parseInt(guests);
    if (isNaN(guestCount) || guestCount < 1) {
      Alert.alert('Invalid Guest Count', 'Please enter a valid number of guests.');
      return;
    }

    if (!reservation) return;

    setLoading(true);
    try {
      await updateReservation(
        reservation.id,
        name.trim(),
        phone.trim(),
        datetime.trim(),
        guestCount
      );
      
      Alert.alert('Updated!', 'Reservation has been updated successfully.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update reservation. Please try again.');
      console.error('Error updating reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!reservation) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Reservation</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Update Reservation Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date & Time</Text>
            <TextInput
              value={datetime}
              onChangeText={setDatetime}
              style={styles.input}
              placeholderTextColor="#999"
              placeholder="e.g., 2024-03-15 19:30"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Guests</Text>
            <TextInput
              value={guests}
              onChangeText={setGuests}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdate}
            style={[styles.updateButton, loading && styles.updateButtonDisabled]}
            disabled={loading}
          >
            <Save size={20} color="#fff" />
            <Text style={styles.updateButtonText}>
              {loading ? 'Updating...' : 'Update Reservation'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.originalInfo}>
          <Text style={styles.originalInfoTitle}>Original Reservation</Text>
          <Text style={styles.originalInfoText}>Created: {new Date(reservation.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.originalInfoText}>ID: {reservation.id}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e67e22',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  updateButtonDisabled: {
    opacity: 0.6,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  originalInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e67e22',
  },
  originalInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  originalInfoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
});