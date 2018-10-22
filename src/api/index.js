import uuid from 'uuid';
import { firebase } from '../firebase';

export default class Db {
  ref = firebase.db.ref();

  users = this.ref.child('users');

  auth = firebase.auth;

  wordlists = firebase.db.ref('/wordlists/');

  definitionsRef = this.ref.child('definitions');

  addUser = (uid, displayName, email, photoURL) => {
    const user = firebase.db.ref(`/users/${uid}`);
    user.once('value').then(snap => {
      if (!snap.val()) {
        this.users.child(uid).set({
          displayName,
          email,
          photoURL
        });
      }
    });
  };

  getWordFromStore = word => 
    this.definitionsRef
      .child(word)
      .once('value')
      .then(snapshot => {
        const definitions = snapshot.val();
        return definitions;
     })
      .catch(e => console.log(e));
  

  addWord = (uid, word, definitions) => {
    firebase.db.ref(`/wordlists/${uid}/${word}`).set(definitions);
  };

  getWordList = uid =>
    Promise.resolve(
      firebase.db
        .ref(`/wordlists/${uid}`)
        .once('value')
        .then(snap => snap.val())
    );

  signTo = (route, cb) => {
    firebase.db.ref(route).on('value', cb);
  };
}

export class Storage {
  addBook = (uid, { name, author, file }) => {
    const metadata = {
      cacheControl: 'private,max-age=31536000'
    };
    const id = uuid();
    return firebase.storage
      .ref(`/books/${uid}/${id}.epub`)
      .put(file, metadata)
      .then(() =>
        firebase.db.ref(`/users/${uid}/books/${id}`).set({ name, author })
      );
  };

  getBooks = uid =>
    firebase.db
      .ref(`/users/${uid}/books`)
      .once('value')
      .then(snap => snap.val() || {});

  getBook = (uid, name) =>
    firebase.storage
      .ref(`/books/${uid}/${name}.epub`)
      .getDownloadURL()
      .catch(error => {
        // Handle any errors
        console.log(error);
      });

  deleteBook = (uid, key) =>
    firebase.storage
      .ref(`/books/${uid}/${key}.epub`)
      .delete()
      .then(() => firebase.db.ref(`/users/${uid}/books/${key}`).remove())
      .catch(e => console.log(e));

  saveBookmark = (uid, key, bookmark) => {
    firebase.db
      .ref(`/users/${uid}/books/${key}/bookmark`)
      .set(bookmark)
      .catch(e => console.log(e));
  };
}
