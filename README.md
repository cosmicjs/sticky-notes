# Sticky Notes
![Image](https://cosmicjs.com/uploads/ab94dae0-86a3-11e7-9e71-f38c5011d624-sticky-notes-1.png)
[View Demo](https://cosmicjs.com)

This note app is powered by [Cosmic JS](https://cosmicjs.com) and built using React and Redux.  It connects to the Cosmic JS API to add / edit / delete notes  as well as attached media.

## Getting Started
Create an account and Bucket at [Cosmic JS](https://cosmicjs.com) to store notes.
```
git clone https://github.com/cosmicjs/sticky-notes
cd sticky-notes
yarn (or npm i)
```
### Run in development
```
npm run build-dev
```
In another terminal window run:
```
npm run start-dev
```
### Run in production
```
npm run start-dev
```
## Configure
Edit the `client/config.js` file to make sure it's connected to your Cosmic JS Bucket with the correct read / write keys (if applicable).
