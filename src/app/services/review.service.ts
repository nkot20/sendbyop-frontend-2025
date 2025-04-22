import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.dynamic';

export interface Review {
  id: number;
  reviewerId: number;
  reviewerName: string;
  targetId: number;
  targetName: string;
  rating: number;
  comment: string;
  date: string;
  isTransporterReview: boolean; // true si l'avis est pour un transporteur, false si pour un expéditeur
  response?: string; // réponse à l'avis, si applicable
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Récupérer les avis laissés par un utilisateur
  getReviewsByReviewer(userId: number): Observable<Review[]> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.get<Review[]>(`${this.apiUrl}/reviews/reviewer/${userId}`);
    
    // Pour la démo, nous utilisons des données fictives
    return of(this.getMockReviewsByReviewer());
  }

  // Récupérer les avis reçus par un transporteur
  getReviewsByTransporter(userId: number): Observable<Review[]> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.get<Review[]>(`${this.apiUrl}/reviews/transporter/${userId}`);
    
    // Pour la démo, nous utilisons des données fictives
    return of(this.getMockReviewsByTransporter());
  }

  // Récupérer les avis reçus par un expéditeur
  getReviewsByShipper(userId: number): Observable<Review[]> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.get<Review[]>(`${this.apiUrl}/reviews/shipper/${userId}`);
    
    // Pour la démo, nous utilisons des données fictives
    return of(this.getMockReviewsByShipper());
  }

  // Ajouter une réponse à un avis
  addResponseToReview(reviewId: number, response: string): Observable<Review> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.post<Review>(`${this.apiUrl}/reviews/${reviewId}/response`, { response });
    
    // Pour la démo, nous retournons simplement l'avis mis à jour
    const reviews = this.getMockReviewsByTransporter();
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      review.response = response;
    }
    return of(review as Review);
  }

  // Données fictives pour la démo
  private getMockReviewsByReviewer(): Review[] {
    return [
      {
        id: 1,
        reviewerId: 123,
        reviewerName: 'Vous',
        targetId: 456,
        targetName: 'Jean Dupont',
        rating: 5,
        comment: 'Excellent transporteur, très ponctuel et professionnel.',
        date: '2025-03-15',
        isTransporterReview: true
      },
      {
        id: 2,
        reviewerId: 123,
        reviewerName: 'Vous',
        targetId: 789,
        targetName: 'Marie Lambert',
        rating: 4,
        comment: 'Bonne expérience globale, mais un peu de retard à l\'arrivée.',
        date: '2025-02-20',
        isTransporterReview: true
      }
    ];
  }

  private getMockReviewsByTransporter(): Review[] {
    return [
      {
        id: 3,
        reviewerId: 111,
        reviewerName: 'Sophie Martin',
        targetId: 123,
        targetName: 'Vous',
        rating: 5,
        comment: 'Voyage parfait, très bonne communication et ponctualité exemplaire.',
        date: '2025-04-05',
        isTransporterReview: true,
        response: 'Merci pour votre confiance, ce fut un plaisir de vous aider!'
      },
      {
        id: 4,
        reviewerId: 222,
        reviewerName: 'Thomas Bernard',
        targetId: 123,
        targetName: 'Vous',
        rating: 4,
        comment: 'Très bon service, je recommande ce transporteur.',
        date: '2025-03-28',
        isTransporterReview: true
      }
    ];
  }

  private getMockReviewsByShipper(): Review[] {
    return [
      {
        id: 5,
        reviewerId: 333,
        reviewerName: 'Lucie Petit',
        targetId: 123,
        targetName: 'Vous',
        rating: 5,
        comment: 'Colis bien préparé et instructions claires. Parfait!',
        date: '2025-04-10',
        isTransporterReview: false
      }
    ];
  }
}
