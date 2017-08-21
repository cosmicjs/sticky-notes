# Sticky Notes
![Image](https://cosmicjs.com/uploads/ab94dae0-86a3-11e7-9e71-f38c5011d624-sticky-notes-1.png)
[View Demo](https://cosmicjs.com)

This note app is built using React, Redux and powered by [Cosmic JS](https://cosmicjs.com).  It connects to the Cosmic JS API to add / edit / delete notes as well as attach media.

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
