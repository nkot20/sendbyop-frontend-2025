import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss'],
    standalone: false
})
export class TripsComponent implements OnInit {
  trips = [
    {
      departure: 'Paris',
      arrival: 'Dakar',
      date: new Date('2025-04-22'),
      transporter: 'Fatou',
      avatar: 'assets/images/Rectangle-710.png',
      image: 'assets/images/Groupe-107.png'
    },
    {
      departure: 'Marseille',
      arrival: 'Abidjan',
      date: new Date('2025-04-25'),
      transporter: 'Moussa',
      avatar: 'assets/images/Rectangle-735.png',
      image: 'assets/images/672810-bestelwagen-met-grote-doos-achterop-met-wereldkaart-vector.png'
    },
    {
      departure: 'Lyon',
      arrival: 'Bamako',
      date: new Date('2025-04-28'),
      transporter: 'Awa',
      avatar: 'assets/images/Rectangle-736.png',
      image: 'assets/images/mobile-ban.png'
    }
  ];

  // Champs de recherche et tri
  searchDeparture: string = '';
  searchArrival: string = '';
  searchDate: string = '';
  sortKey: string = 'date';
  filteredTrips = [...this.trips];

  onSearch() {
    this.filteredTrips = this.trips.filter(trip => {
      const matchesDeparture = this.searchDeparture ? trip.departure.toLowerCase().includes(this.searchDeparture.toLowerCase()) : true;
      const matchesArrival = this.searchArrival ? trip.arrival.toLowerCase().includes(this.searchArrival.toLowerCase()) : true;
      const matchesDate = this.searchDate ? (new Date(trip.date).toISOString().split('T')[0] === this.searchDate) : true;
      return matchesDeparture && matchesArrival && matchesDate;
    });
    this.onSort();
  }

  onSort() {
    this.filteredTrips = [...this.filteredTrips].sort((a, b) => {
      switch (this.sortKey) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'arrival':
          return a.arrival.localeCompare(b.arrival);
        case 'departure':
          return a.departure.localeCompare(b.departure);
        case 'arrivalCity':
          return a.arrival.localeCompare(b.arrival);
        case 'transporter':
          return a.transporter.localeCompare(b.transporter);
        default:
          return 0;
      }
    });
  }

  resetSearch() {
    this.searchDeparture = '';
    this.searchArrival = '';
    this.searchDate = '';
    this.filteredTrips = [...this.trips];
    this.sortKey = 'date';
    this.onSort();
  }

  ngOnInit(): void {
    this.filteredTrips = [...this.trips];
  }
}
