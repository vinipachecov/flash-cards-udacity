This is the last project for the Udacity React Nanodegree course(at least in my attempt). The project is a flash cards app that have decks of questions and answers to help users keep some topic or knowledge fresh in their memory.

## Observations
I did use two projects because In my setup using expo was not a good idea for the overall development, so I setup a native project with react-native-cli (i.e react init name_project) and did all through this other project. In the end as I thought it would be better to use Expo Notifications API and then I decided to merge the files to the expo project once again.

## Firebase
This project has firebase integrated within. To use it you will need to create a folder called config, with firebaseConfigs.js file. There you will need to place
the credentials for your firebase app.
To create go to https://firebase.google.com and create a new project. You will find
in the project configurations the "Web Configuration", there you will have all
the keys data for this app to work. With this you will have your own Flash cards 
backend!
So the steps are :
- Create a config folder inside src directory
- create a file named firebaseConfigs.js
- export the file like the following:
```
module.exports = {    
    "apiKey": "firebase-api-key",
    "authDomain": "firebase-auth-domain",
    "databaseURL": "firebase-database-url",
    "projectId": "firebase-projectId",
    "storageBucket": "firebase-storageBucket",
    "messagingSenderId": "firebase-messaging-SenderId"          
}
```
Once it is done your app is connected your new firebase backend.
### PS 
If you have problems check if you allowed authentication methods with email and created a firebase realtime database with read and write access.

## Platforms
This project has been designed to work both on Android and IOS devices, feel free to use both.

## Running
You will need expo cli installed in your computer if you intend to 
run this project.

Open an android or ios emulator with in your computer.

Install the project dependencies with  npm or yarn:
```
yarn
```
or
```
npm install
```

## Hint

For android you can check your emulators available by checking your AVD Manager in
Android Studio or by typing:
```
emulator --list-avds
```

Go to the project folder in your cli terminal and enter the command:

```
expo start
```




