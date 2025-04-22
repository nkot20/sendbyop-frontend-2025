export const environment = {
  production: true,
  apiUrl: 'https://back-sendbyop-2023.onrender.com/api/v1',
  appName: 'SendByOp',
  appVersion: '1.0.0',
  defaultLanguage: 'fr',
  supportedLanguages: ['fr', 'en'],
  paymentGateway: {
    url: 'https://api.sendbyop.com/api/v1/payment',
    publicKey: 'pk_live_example'
  }
};
