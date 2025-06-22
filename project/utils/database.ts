// Database utility functions using localStorage for web compatibility
export interface Reservation {
  id: number;
  name: string;
  phone: string;
  datetime: string;
  guests: number;
  createdAt: string;
}

class DatabaseManager {
  private storageKey = 'filipino_restaurant_reservations';

  async initDB(): Promise<void> {
    // Initialize database - in this case, just ensure localStorage is available
    if (typeof window !== 'undefined' && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  async fetchReservations(): Promise<Reservation[]> {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
  }

  async addReservation(name: string, phone: string, datetime: string, guests: number): Promise<void> {
    if (typeof window === 'undefined') return;

    const reservations = await this.fetchReservations();
    const newReservation: Reservation = {
      id: Date.now(),
      name,
      phone,
      datetime,
      guests,
      createdAt: new Date().toISOString(),
    };

    reservations.push(newReservation);
    localStorage.setItem(this.storageKey, JSON.stringify(reservations));
  }

  async updateReservation(id: number, name: string, phone: string, datetime: string, guests: number): Promise<void> {
    if (typeof window === 'undefined') return;

    const reservations = await this.fetchReservations();
    const index = reservations.findIndex(r => r.id === id);
    
    if (index !== -1) {
      reservations[index] = { ...reservations[index], name, phone, datetime, guests };
      localStorage.setItem(this.storageKey, JSON.stringify(reservations));
    } else {
      throw new Error('Reservation not found');
    }
  }

  async deleteReservation(id: number): Promise<void> {
    if (typeof window === 'undefined') return;

    const reservations = await this.fetchReservations();
    const filtered = reservations.filter(r => r.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }
}

const db = new DatabaseManager();

export const {
  initDB,
  fetchReservations,
  addReservation,
  updateReservation,
  deleteReservation,
} = db;

export default db;