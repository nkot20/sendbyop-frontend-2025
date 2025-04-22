import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Rediriger vers la page d'accueil si l'utilisateur est déjà connecté
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{8,20}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Fonction pour vérifier que les mots de passe correspondent
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mustMatch: true });
    } else if (confirmPassword) {
      confirmPassword.setErrors(null);
    }
  }

  // Getter pratique pour accéder aux champs du formulaire
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Arrêter ici si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    
    const userData = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      phoneNumber: this.f['phone'].value,
      password: this.f['password'].value
    };

    this.authService.register(userData)
      .pipe(first())
      .subscribe(
        data => {
          // Rediriger vers la page de connexion avec un message de succès
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
