import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.scss'],
    standalone: false
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('chatBody') private chatBodyRef!: ElementRef;
  
  isOpen = false;
  isTyping = false;
  selectedQuickReply = '';

  messages = [
    { 
      from: 'bot', 
      text: 'Bonjour ! Je suis votre assistant SendByOp. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ];
  
  userInput = '';
  
  // Questions fréquentes et réponses prédéfinies
  quickReplies = [
    { id: 'howtoship', text: 'Comment envoyer un colis ?' },
    { id: 'costs', text: 'Combien coûte le service ?' },
    { id: 'safety', text: 'Est-ce sécurisé ?' },
    { id: 'support', text: 'Contacter le support' }
  ];
  
  // Réponses du bot pour différentes questions
  botResponses: {[key: string]: string} = {
    howtoship: `Pour envoyer un colis avec SendByOp :
    1. Créez un compte sur notre plateforme
    2. Recherchez un voyageur qui se rend vers votre destination
    3. Réservez l'espace nécessaire pour votre colis
    4. Remettez le colis au voyageur le jour du départ
    5. Suivez la livraison en temps réel`,
    
    costs: `Notre tarification dépend de plusieurs facteurs :
    - La destination
    - Le poids et les dimensions du colis
    - L'urgence de la livraison
    
    Généralement, nos prix sont 30% à 80% moins chers que les services postaux traditionnels.`,
    
    safety: `La sécurité est notre priorité :
    - Tous les utilisateurs sont vérifiés (identité, adresse, téléphone)
    - Les paiements sont sécurisés et libérés uniquement à la livraison
    - Vos colis sont assurés jusqu'à 1000€
    - Nous surveillons chaque transaction pour prévenir les fraudes`,
    
    support: `Notre équipe support est disponible 7j/7 :
    - Email : support@sendbyop.com
    - Téléphone : +33 1 23 45 67 89
    - Ou cliquez ici pour être mis en relation avec un conseiller`
  };
  
  // Mots-clés pour identifier les intentions de l'utilisateur
  intentKeywords = {
    howtoship: ['envoyer', 'expédier', 'livrer', 'colis', 'paquet', 'envoi', 'expedier'],
    costs: ['prix', 'tarif', 'coût', 'coûte', 'cher', 'combien', 'euros', 'cout', 'coute'],
    safety: ['sécurisé', 'sécurité', 'confiance', 'vol', 'perdu', 'sûr', 'assurance', 'securise', 'securité'],
    support: ['aide', 'problème', 'contact', 'joindre', 'assistance', 'service client', 'téléphone', 'email', 'telephone', 'probleme']
  };

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    setTimeout(() => this.scrollToBottom(), 150);
  }

  selectQuickReply(replyId: string) {
    this.selectedQuickReply = replyId;
    const reply = this.quickReplies.find(r => r.id === replyId);
    if (reply) {
      this.userInput = reply.text;
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.userInput.trim()) {
      // Ajouter le message de l'utilisateur
      this.messages.push({ 
        from: 'user', 
        text: this.userInput, 
        timestamp: new Date() 
      });
      
      setTimeout(() => this.scrollToBottom(), 50);
      
      // Déterminer quelle réponse envoyer
      const userQuestion = this.userInput.toLowerCase();
      const botResponseKey = this.selectedQuickReply || this.detectIntent(userQuestion);
      this.selectedQuickReply = '';
      
      // Simuler que le bot est en train d'écrire
      this.isTyping = true;
      
      // Réponse du bot après un délai
      setTimeout(() => {
        this.isTyping = false;
        let botResponse = '';
        
        if (botResponseKey && this.botResponses[botResponseKey]) {
          botResponse = this.botResponses[botResponseKey];
        } else {
          botResponse = this.getGeneralResponse(userQuestion);
        }
        
        this.messages.push({ 
          from: 'bot', 
          text: botResponse, 
          timestamp: new Date() 
        });
        
        this.scrollToBottom();
      }, 1200); // Le délai simule le temps de réflexion du bot
      
      this.userInput = '';
    }
  }

  // Détecte l'intention de l'utilisateur d'après les mots-clés
  detectIntent(userInput: string): string {
    for (const [intent, keywords] of Object.entries(this.intentKeywords)) {
      for (const keyword of keywords) {
        if (userInput.includes(keyword)) {
          return intent;
        }
      }
    }
    return '';
  }
  
  // Génère une réponse générale quand aucune intention n'est reconnue
  getGeneralResponse(userInput: string): string {
    // Chercher des salutations
    if (/bonjour|salut|hey|hello|coucou/i.test(userInput)) {
      return 'Bonjour ! Comment puis-je vous aider aujourd\'hui avec vos envois ou voyages ?';
    }
    
    // Chercher des remerciements
    if (/merci|thanks|thx|remercier/i.test(userInput)) {
      return 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions.';
    }
    
    // Longue question → Proposer une mise en relation
    if (userInput.length > 60) {
      return 'Votre question semble complexe. Souhaitez-vous être mis en relation avec l\'un de nos conseillers ? Ils sont disponibles 7j/7 pour vous aider.';
    }
    
    // Réponse par défaut
    return 'Je ne suis pas sûr de comprendre votre demande. Pourriez-vous préciser votre question ? Ou consulter nos suggestions pour obtenir des informations plus rapidement.';
  }

  scrollToBottom() {
    if (this.chatBodyRef) {
      const element = this.chatBodyRef.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  // Formatter la date pour affichage
  formatTime(date: Date): string {
    return date ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}` : '';
  }
}
