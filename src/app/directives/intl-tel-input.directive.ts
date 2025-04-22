import { Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
// Import intl-tel-input
import intlTelInput from 'intl-tel-input';

// Déclaration pour éviter les erreurs TypeScript
declare global {
  interface Window {
    intlTelInput: any;
  }
}

@Directive({
    selector: '[appIntlTelInput]',
    standalone: false
})
export class IntlTelInputDirective implements OnInit, OnDestroy {
  private iti: any;
  
  @Input() preferredCountries: string[] = ['fr', 'cm', 'sn', 'ci', 'ma', 'dz', 'gb', 'us'];
  @Output() countryChange = new EventEmitter<string>();
  @Output() validationChange = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef,
    private ngControl: NgControl
  ) {}

  ngOnInit() {
    const input = this.el.nativeElement;
    
    // Configuration simplifiée de intl-tel-input
    this.iti = intlTelInput(input, {
      initialCountry: 'fr',
      preferredCountries: this.preferredCountries,
      autoPlaceholder: 'polite',
      separateDialCode: false,
      nationalMode: false,
      formatOnDisplay: true,
      allowDropdown: true,
      dropdownContainer: document.body,
      // Utiliser any pour éviter les erreurs de type
    } as any);

    // Charger le script utils.js si nécessaire
    this.loadUtilsScript();

    // Événement pour détecter les changements de pays
    input.addEventListener('countrychange', () => {
      if (this.iti) {
        const countryData = this.iti.getSelectedCountryData();
        this.countryChange.emit(countryData.iso2);
        
        // Valider le numéro après changement de pays
        setTimeout(() => {
          this.validateNumber();
        }, 100);
      }
    });

    // Événement pour détecter les changements de valeur
    input.addEventListener('input', () => {
      this.updateValue();
    });

    // Événement pour détecter les changements de focus
    input.addEventListener('blur', () => {
      this.validateNumber();
    });
  }

  ngOnDestroy() {
    // Détruit l'instance pour éviter les fuites de mémoire
    if (this.iti) {
      this.iti.destroy();
    }
  }

  private loadUtilsScript() {
    // Vérifier si le script utils.js est déjà chargé
    if (!document.getElementById('intl-tel-input-utils')) {
      const script = document.createElement('script');
      script.id = 'intl-tel-input-utils';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  private updateValue() {
    if (this.iti && this.ngControl.control) {
      // Obtenir le numéro de téléphone au format international
      const value = this.iti.getNumber();
      
      // Mettre à jour le contrôle Angular sans déclencher d'événements
      this.ngControl.control.setValue(value, { emitEvent: false });
      
      // Valider le numéro
      this.validateNumber();
    }
  }

  private validateNumber() {
    if (this.iti) {
      const isValid = this.iti.isValidNumber();
      this.validationChange.emit(isValid);
      
      // Mettre à jour l'apparence du champ
      if (isValid) {
        this.el.nativeElement.classList.remove('is-invalid');
        this.el.nativeElement.classList.add('is-valid');
      } else if (this.el.nativeElement.value) {
        this.el.nativeElement.classList.remove('is-valid');
        this.el.nativeElement.classList.add('is-invalid');
      }
    }
  }
}
