// Ce fichier sélectionne automatiquement l'environnement approprié
import { environment as devEnvironment } from './environment';
import { environment as prodEnvironment } from './environment.prod';

// Déterminer si nous sommes en production ou développement
// Angular 19+ définit cette variable globale lors du build
declare const ngDevMode: boolean;

// Exporter l'environnement approprié
export const environment = typeof ngDevMode !== 'undefined' && ngDevMode 
  ? devEnvironment  // Développement
  : prodEnvironment; // Production
