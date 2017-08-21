# Sticky Notes
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
