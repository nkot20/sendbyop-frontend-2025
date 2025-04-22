export const environment = {
  production: false,
  apiUrl: 'http://localhost:9002/api/v1',
  appName: 'SendByOp',
  appVersion: '1.0.0',
  defaultLanguage: 'fr',
  supportedLanguages: ['fr', 'en'],
  paymentGateway: {
    url: 'http://localhost:9002/api/v1/payment',
    publicKey: 'pk_test_example'
  }
};
