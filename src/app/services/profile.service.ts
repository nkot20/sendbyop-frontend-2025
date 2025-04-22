import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  private defaultProfileImage = 'assets/images/dummy-user.png';

  constructor(private http: HttpClient) { }

  // Mettre à jour la photo de profil
  updateProfilePicture(userId: number, imageFile: File): Observable<string> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // const formData = new FormData();
    // formData.append('profilePicture', imageFile);
    // return this.http.post<string>(`${this.apiUrl}/user/${userId}/profile-picture`, formData);
    
    // Pour la démo, nous simulons le téléchargement et retournons une URL fictive
    return of(URL.createObjectURL(imageFile));
  }

  // Récupérer l'URL de la photo de profil
  getProfilePictureUrl(userId: number): Observable<string> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.get<string>(`${this.apiUrl}/user/${userId}/profile-picture`);
    
    // Pour la démo, nous retournons l'image par défaut
    return of(this.defaultProfileImage);
  }

  // Supprimer la photo de profil
  deleteProfilePicture(userId: number): Observable<boolean> {
    // Dans une implémentation réelle, cela serait connecté à l'API
    // return this.http.delete<boolean>(`${this.apiUrl}/user/${userId}/profile-picture`);
    
    // Pour la démo, nous retournons simplement true
    return of(true);
  }
}
