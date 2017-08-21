# Sticky Notes
![Image](https://cosmicjs.com/uploads/ed385850-86a8-11e7-8b86-7db4f533bdd3-sticky-notes-1-tight.jpg)
[View Demo](https://cosmicjs.com)

A note-taking app built using React, Redux and powered by [Cosmic JS](https://cosmicjs.com).  It connects to the Cosmic JS API to add / edit / delete notes as well as attach media.

## Getting Started
[Log in to Cosmic JS](https://cosmicjs.com) and create a Bucket to store notes.  Then clone the codebase locally:
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
```
export default {
  bucket: {
    slug: process.env.COSMIC_BUCKET || 'sticky-notes',
    read_key: '',
    write_key: '',
  }
}
```
