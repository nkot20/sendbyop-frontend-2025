import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TripsComponent } from './components/trips/trips.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ContactComponent } from './components/contact/contact.component';
import { DirectivesModule } from './directives/directives.module';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        ProfileComponent,
        TripsComponent,
        ChatbotComponent,
        HowItWorksComponent,
        ContactComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
