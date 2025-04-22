import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.dynamic';

export interface Flight {
  id?: number;
  customerId: number;
  departureAirportId: number;
  departureAirportName: string;
  departureCountry: string;
  departureCity: string;
  departureDate: string;
  departureTime: string;
  arrivalAirportId: number;
  arrivalAirportName: string;
  arrivalCountry: string;
  arrivalCity: string;
  arrivalDate: string;
  arrivalTime: string;
  airline: string;
  flightNumber: string;
  availableWeight: number;
  pricePerKg: number;
  status: 'pending' | 'validated' | 'rejected' | 'cancelled';
  additionalInfo?: string;
  stopovers?: Stopover[];
}

export interface Stopover {
  id?: number;
  flightId: number;
  airportId: number;
  airportName: string;
  country: string;
  city: string;
  arrivalDate: string;
  arrivalTime: string;
  departureDate: string;
  departureTime: string;
  duration: number; // en minutes
}

export interface Airport {
  id: number;
  name: string;
  code: string;
  city: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Récupérer tous les voyages d'un utilisateur
  getUserTrips(email: string): Observable<Flight[]> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.get<Flight[]>(`${this.apiUrl}/trips/customer/${email}/flights`);
    
    // Pour la démo, nous utilisons des données fictives
    return of(this.getMockTrips());
  }

  // Créer un nouveau voyage
  createTrip(trip: Flight): Observable<Flight> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.post<Flight>(`${this.apiUrl}/trips`, trip);
    
    // Pour la démo, nous retournons simplement le voyage avec un ID
    const newTrip = { ...trip, id: Math.floor(Math.random() * 1000) };
    return of(newTrip);
  }

  // Ajouter une escale à un voyage
  addStopover(stopover: Stopover): Observable<Stopover> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.post<Stopover>(`${this.apiUrl}/stopover`, stopover);
    
    // Pour la démo, nous retournons simplement l'escale avec un ID
    const newStopover = { ...stopover, id: Math.floor(Math.random() * 1000) };
    return of(newStopover);
  }

  // Annuler un voyage
  cancelTrip(tripId: number): Observable<Flight> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.post<Flight>(`${this.apiUrl}/trips/cancel`, { id: tripId });
    
    // Pour la démo, nous retournons simplement le voyage avec le statut annulé
    const trips = this.getMockTrips();
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      trip.status = 'cancelled';
    }
    return of(trip as Flight);
  }

  // Récupérer la liste des aéroports
  getAirports(): Observable<Airport[]> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.get<Airport[]>(`${this.apiUrl}/public/airport/`);
    
    // Pour la démo, nous utilisons des données fictives
    return of(this.getMockAirports());
  }

  // Données fictives pour la démo
  private getMockTrips(): Flight[] {
    return [
      {
        id: 1,
        customerId: 123,
        departureAirportId: 1,
        departureAirportName: 'Charles de Gaulle',
        departureCountry: 'France',
        departureCity: 'Paris',
        departureDate: '2025-05-10',
        departureTime: '14:30',
        arrivalAirportId: 2,
        arrivalAirportName: 'Yaoundé Nsimalen',
        arrivalCountry: 'Cameroun',
        arrivalCity: 'Yaoundé',
        arrivalDate: '2025-05-10',
        arrivalTime: '20:45',
        airline: 'Air France',
        flightNumber: 'AF 953',
        availableWeight: 15,
        pricePerKg: 18,
        status: 'validated'
      },
      {
        id: 2,
        customerId: 123,
        departureAirportId: 3,
        departureAirportName: 'Lyon-Saint Exupéry',
        departureCountry: 'France',
        departureCity: 'Lyon',
        departureDate: '2025-06-15',
        departureTime: '10:15',
        arrivalAirportId: 4,
        arrivalAirportName: 'Douala International',
        arrivalCountry: 'Cameroun',
        arrivalCity: 'Douala',
        arrivalDate: '2025-06-15',
        arrivalTime: '16:30',
        airline: 'Brussels Airlines',
        flightNumber: 'SN 372',
        availableWeight: 20,
        pricePerKg: 15,
        status: 'pending'
      }
    ];
  }

  private getMockAirports(): Airport[] {
    return [
      { id: 1, name: 'Charles de Gaulle', code: 'CDG', city: 'Paris', country: 'France' },
      { id: 2, name: 'Yaoundé Nsimalen', code: 'NSI', city: 'Yaoundé', country: 'Cameroun' },
      { id: 3, name: 'Lyon-Saint Exupéry', code: 'LYS', city: 'Lyon', country: 'France' },
      { id: 4, name: 'Douala International', code: 'DLA', city: 'Douala', country: 'Cameroun' },
      { id: 5, name: 'Blaise Diagne', code: 'DSS', city: 'Dakar', country: 'Sénégal' },
      { id: 6, name: 'Félix Houphouët-Boigny', code: 'ABJ', city: 'Abidjan', country: 'Côte d\'Ivoire' },
      { id: 7, name: 'Mohammed V', code: 'CMN', city: 'Casablanca', country: 'Maroc' },
      { id: 8, name: 'Heathrow', code: 'LHR', city: 'Londres', country: 'Royaume-Uni' },
      { id: 9, name: 'John F. Kennedy', code: 'JFK', city: 'New York', country: 'États-Unis' }
    ];
  }
}
