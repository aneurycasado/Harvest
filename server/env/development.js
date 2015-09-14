module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "LEem8xvzEfI4d4MMsBj6oMG59",
    "consumerSecret": "jqMoUGAD7WB7mpPsSPcdytdfgliG7bWnTEUGsklKhIN6A1KEt5",
    "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "1136041316423604",
    "clientSecret": "f8e9ae9edd40fe0376ad9ac457101a1f",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "18279746287-pr1f9ub8hsnvrii9h7tn0kimugvov836.apps.googleusercontent.com",
    "clientSecret": "6bAXnVqp6DHRq1CZ2F7BA1uq",
    "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  }
};
