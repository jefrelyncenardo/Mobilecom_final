import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Plus, CreditCard as Edit, Trash2, Calendar, Users, Phone, Clock } from 'lucide-react-native';
import { initDB, addReservation, fetchReservations, deleteReservation, type Reservation } from '@/utils/database';

export default function ReservationsScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [datetime, setDatetime] = useState('');
  const [guests, setGuests] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      await initDB();
      const data = await fetchReservations();
      setReservations(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !datetime.trim() || !guests.trim()) {
      Alert.alert('Incomplete Information', 'Please fill out all fields to make a reservation.');
      return;
    }

    const guestCount = parseInt(guests);
    if (isNaN(guestCount) || guestCount < 1) {
      Alert.alert('Invalid Guest Count', 'Please enter a valid number of guests.');
      return;
    }

    setLoading(true);
    try {
      await addReservation(name.trim(), phone.trim(), datetime.trim(), guestCount);
      Alert.alert('Reservation Confirmed!', 'Your table has been reserved successfully.');
      
      // Reset form
      setName('');
      setPhone('');
      setDatetime('');
      setGuests('');
      setShowForm(false);
      
      // Reload reservations
      await loadReservations();
    } catch (error) {
      Alert.alert('Error', 'Failed to create reservation. Please try again.');
      console.error('Error adding reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number, customerName: string) => {
    Alert.alert(
      'Cancel Reservation',
      `Are you sure you want to cancel ${customerName}'s reservation?`,
      [
        { text: 'Keep Reservation', style: 'cancel' },
        {
          text: 'Cancel Reservation',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReservation(id);
              await loadReservations();
              Alert.alert('Reservation Cancelled', 'The reservation has been cancelled successfully.');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel reservation. Please try again.');
              console.error('Error deleting reservation:', error);
            }
          }
        }
      ]
    );
  };

  const formatDateTime = (datetime: string) => {
    try {
      const date = new Date(datetime);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return datetime;
    }
  };

  const renderReservation = ({ item }: { item: Reservation }) => (
    <View style={styles.reservationCard}>
      <View style={styles.reservationHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <View style={styles.reservationDetails}>
            <View style={styles.detailItem}>
              <Users size={14} color="#666" />
              <Text style={styles.detailText}>{item.guests} guests</Text>
            </View>
            <View style={styles.detailItem}>
              <Phone size={14} color="#666" />
              <Text style={styles.detailText}>{item.phone}</Text>
            </View>
          </View>
        </View>
        <View style={styles.reservationActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push({
              pathname: '/reservations/edit',
              params: { reservationId: item.id.toString() }
            })}
          >
            <Edit size={18} color="#e67e22" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id, item.name)}
          >
            <Trash2 size={18} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.dateTimeContainer}>
        <Clock size={16} color="#e67e22" />
        <Text style={styles.dateTimeText}>{formatDateTime(item.datetime)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Table Reservations</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>New</Text>
        </TouchableOpacity>
      </View>

      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Make a Reservation</Text>
          
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#999"
          />
          
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor="#999"
          />
          
          <TextInput
            placeholder="Date & Time (e.g., 2024-03-15 19:30)"
            value={datetime}
            onChangeText={setDatetime}
            style={styles.input}
            placeholderTextColor="#999"
          />
          
          <TextInput
            placeholder="Number of Guests"
            value={guests}
            onChangeText={setGuests}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#999"
          />
          
          <View style={styles.formActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowForm(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? 'Confirming...' : 'Confirm Reservation'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>
          Current Reservations ({reservations.length})
        </Text>
        
        {reservations.length === 0 ? (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No reservations yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Make your first reservation to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={reservations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderReservation}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e67e22',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#e67e22',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  reservationCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  reservationDetails: {
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  reservationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});