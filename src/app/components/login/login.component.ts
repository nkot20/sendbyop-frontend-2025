import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/';
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Rediriger vers la page d'accueil si l'utilisateur est déjà connecté
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Récupérer l'URL de retour des paramètres de route ou utiliser la page d'accueil par défaut
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Afficher un message de succès si l'inscription a réussi
    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
    }
  }

  // Getter pratique pour accéder aux champs du formulaire
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    // Arrêter ici si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;   
    
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = 'Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.';
          this.loading = false;
        }
      );
  }
}
