import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { ReviewService, Review } from '../../services/review.service';
import { TripService, Flight, Airport } from '../../services/trip.service';
import { ProfileService } from '../../services/profile.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true }
        }
    ],
    standalone: false
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'personal';
  currentUser: User | null = null;
  profileForm!: FormGroup;
  bankAccountForm!: FormGroup;
  tripForm!: FormGroup;
  loading = false;
  success = '';
  error = '';
  
  // Pour la gestion des avis
  reviewsGiven: Review[] = [];
  reviewsReceived: Review[] = [];
  selectedReview: Review | null = null;
  responseForm!: FormGroup;
  
  // Pour la gestion de la photo de profil
  profilePictureUrl: string = 'assets/images/dummy-user.png';
  selectedFile: File | null = null;
  
  // Pour la création de voyage
  airports: Airport[] = [];
  currentStep = 0;
  
  // Données fictives pour la démo
  myTrips = [
    {
      id: 1,
      departure: 'Paris',
      departureCountry: 'France',
      arrival: 'Yaoundé',
      arrivalCountry: 'Cameroun',
      date: '2025-05-10',
      airline: 'Air France',
      flightNumber: 'AF 953',
      availableWeight: 15,
      pricePerKg: 18,
      status: 'À venir'
    },
    {
      id: 2,
      departure: 'Lyon',
      departureCountry: 'France',
      arrival: 'Douala',
      arrivalCountry: 'Cameroun',
      date: '2025-06-15',
      airline: 'Brussels Airlines',
      flightNumber: 'SN 372',
      availableWeight: 20,
      pricePerKg: 15,
      status: 'À venir'
    }
  ];
  
  myBookings = [
    {
      id: 1,
      travelerName: 'Marie L.',
      departure: 'Paris',
      departureCountry: 'France',
      arrival: 'Yaoundé',
      arrivalCountry: 'Cameroun',
      date: '2025-04-25',
      weight: 5,
      totalPrice: 75,
      status: 'Confirmé'
    }
  ];
  
  myPayments = [
    {
      id: 1,
      date: '2025-04-15',
      amount: 75,
      method: 'Carte bancaire',
      description: 'Réservation #1 - 5kg pour Yaoundé',
      status: 'Payé'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private reviewService: ReviewService,
    private tripService: TripService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserData();
      }
    });
    
    this.initForms();
    this.loadAirports();
  }
  
  loadUserData(): void {
    // Charger les avis
    if (this.currentUser?.id) {
      this.reviewService.getReviewsByReviewer(this.currentUser.id).subscribe(reviews => {
        this.reviewsGiven = reviews;
      });
      
      this.reviewService.getReviewsByTransporter(this.currentUser.id).subscribe(reviews => {
        this.reviewsReceived = [...this.reviewsReceived, ...reviews];
      });
      
      this.reviewService.getReviewsByShipper(this.currentUser.id).subscribe(reviews => {
        this.reviewsReceived = [...this.reviewsReceived, ...reviews];
      });
      
      // Charger la photo de profil
      this.profileService.getProfilePictureUrl(this.currentUser.id).subscribe(url => {
        this.profilePictureUrl = url;
      });
    }
  }
  
  initForms(): void {
    this.initProfileForm();
    this.initBankAccountForm();
    this.initResponseForm();
    this.initTripForm();
  }
  
  initProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: [this.currentUser?.firstName || '', Validators.required],
      lastName: [this.currentUser?.lastName || '', Validators.required],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{8,20}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }
  
  initBankAccountForm(): void {
    this.bankAccountForm = this.formBuilder.group({
      accountHolder: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      iban: ['', Validators.required],
      bic: ['', Validators.required]
    });
  }
  
  initResponseForm(): void {
    this.responseForm = this.formBuilder.group({
      response: ['', Validators.required]
    });
  }
  
  initTripForm(): void {
    this.tripForm = this.formBuilder.group({
      // Étape 1: Informations de vol
      departureAirportId: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalAirportId: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      
      // Étape 2: Détails du vol
      airline: ['', Validators.required],
      flightNumber: ['', Validators.required],
      
      // Étape 3: Capacité et prix
      availableWeight: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      pricePerKg: ['', [Validators.required, Validators.min(1)]],
      additionalInfo: ['']
    });
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
  onProfileSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.success = '';
    this.error = '';
    
    // Simuler une mise à jour réussie
    setTimeout(() => {
      this.success = 'Vos informations personnelles ont été mises à jour avec succès.';
      this.loading = false;
    }, 1000);
  }
  
  onBankAccountSubmit(): void {
    if (this.bankAccountForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.success = '';
    this.error = '';
    
    // Simuler une mise à jour réussie
    setTimeout(() => {
      this.success = 'Vos informations bancaires ont été mises à jour avec succès.';
      this.loading = false;
    }, 1000);
  }
  
  // Méthodes pour la gestion des avis
  respondToReview(review: Review): void {
    this.selectedReview = review;
    this.responseForm.patchValue({
      response: review.response || ''
    });
  }
  
  submitResponse(): void {
    if (this.responseForm.invalid || !this.selectedReview) {
      return;
    }
    
    this.loading = true;
    
    this.reviewService.addResponseToReview(
      this.selectedReview.id, 
      this.responseForm.value.response
    ).subscribe({
      next: (updatedReview) => {
        // Mettre à jour l'avis dans la liste
        const index = this.reviewsReceived.findIndex(r => r.id === updatedReview.id);
        if (index !== -1) {
          this.reviewsReceived[index] = updatedReview;
        }
        
        this.success = 'Votre réponse a été enregistrée avec succès.';
        this.loading = false;
        this.selectedReview = null;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de l\'enregistrement de votre réponse.';
        this.loading = false;
      }
    });
  }
  
  // Méthodes pour la gestion de la photo de profil
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  uploadProfilePicture(): void {
    if (!this.selectedFile || !this.currentUser?.id) {
      return;
    }
    
    this.loading = true;
    
    this.profileService.updateProfilePicture(this.currentUser.id, this.selectedFile).subscribe({
      next: (url) => {
        this.profilePictureUrl = url;
        this.success = 'Votre photo de profil a été mise à jour avec succès.';
        this.loading = false;
        this.selectedFile = null;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de la mise à jour de votre photo de profil.';
        this.loading = false;
      }
    });
  }
  
  removeProfilePicture(): void {
    if (!this.currentUser?.id) {
      return;
    }
    
    this.loading = true;
    
    this.profileService.deleteProfilePicture(this.currentUser.id).subscribe({
      next: (success) => {
        if (success) {
          this.profilePictureUrl = 'assets/images/dummy-user.png';
          this.success = 'Votre photo de profil a été supprimée avec succès.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de la suppression de votre photo de profil.';
        this.loading = false;
      }
    });
  }
  
  // Méthodes pour la création de voyage
  loadAirports(): void {
    this.tripService.getAirports().subscribe(airports => {
      this.airports = airports;
    });
  }
  
  getAirportName(airportId: number): string {
    const airport = this.airports.find(a => a.id === airportId);
    return airport ? `${airport.name} (${airport.code})` : '';
  }
  
  nextStep(): void {
    this.currentStep++;
  }
  
  prevStep(): void {
    this.currentStep--;
  }
  
  onTripSubmit(): void {
    if (this.tripForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const departureAirport = this.airports.find(a => a.id === +this.tripForm.value.departureAirportId);
    const arrivalAirport = this.airports.find(a => a.id === +this.tripForm.value.arrivalAirportId);
    
    if (!departureAirport || !arrivalAirport || !this.currentUser?.id) {
      this.error = 'Informations incomplètes. Veuillez réessayer.';
      this.loading = false;
      return;
    }
    
    const newTrip: Flight = {
      customerId: this.currentUser.id,
      departureAirportId: departureAirport.id,
      departureAirportName: departureAirport.name,
      departureCountry: departureAirport.country,
      departureCity: departureAirport.city,
      departureDate: this.tripForm.value.departureDate,
      departureTime: this.tripForm.value.departureTime,
      arrivalAirportId: arrivalAirport.id,
      arrivalAirportName: arrivalAirport.name,
      arrivalCountry: arrivalAirport.country,
      arrivalCity: arrivalAirport.city,
      arrivalDate: this.tripForm.value.arrivalDate,
      arrivalTime: this.tripForm.value.arrivalTime,
      airline: this.tripForm.value.airline,
      flightNumber: this.tripForm.value.flightNumber,
      availableWeight: +this.tripForm.value.availableWeight,
      pricePerKg: +this.tripForm.value.pricePerKg,
      status: 'pending',
      additionalInfo: this.tripForm.value.additionalInfo
    };
    
    this.tripService.createTrip(newTrip).subscribe({
      next: (trip) => {
        this.success = 'Votre voyage a été créé avec succès et est en attente de validation.';
        this.loading = false;
        this.tripForm.reset();
        this.currentStep = 0;
        this.setActiveTab('trips');
        
        // Ajouter le nouveau voyage à la liste
        this.myTrips.push({
          id: trip.id || 0,
          departure: trip.departureCity,
          departureCountry: trip.departureCountry,
          arrival: trip.arrivalCity,
          arrivalCountry: trip.arrivalCountry,
          date: trip.departureDate,
          airline: trip.airline,
          flightNumber: trip.flightNumber,
          availableWeight: trip.availableWeight,
          pricePerKg: trip.pricePerKg,
          status: 'En attente'
        });
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de la création de votre voyage.';
        this.loading = false;
      }
    });
  }
  
  cancelTrip(tripId: number): void {
    // Logique pour annuler un voyage
    this.loading = true;
    
    this.tripService.cancelTrip(tripId).subscribe({
      next: (trip) => {
        // Mettre à jour le statut du voyage dans la liste
        const index = this.myTrips.findIndex(t => t.id === tripId);
        if (index !== -1) {
          this.myTrips[index].status = 'Annulé';
        }
        
        this.success = 'Votre voyage a été annulé avec succès.';
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de l\'annulation de votre voyage.';
        this.loading = false;
      }
    });
  }
  
  cancelBooking(bookingId: number): void {
    // Logique pour annuler une réservation
    console.log('Annulation de la réservation', bookingId);
  }
}
