import { openDB } from 'idb';

const initdb = async () =>
  openDB('textEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textEditor')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('textEditor', { keyPath: 'id', autoIncrement: true });
      console.log('textEditor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  console.log('Post to the ase');
    const todosDb = await openDB('todos', 1);
    const tx = todosDb.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    const request = store.add({ todo: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
} 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  console.log('GET from the database');
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readonly');
  const store = tx.objectStore('contact');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
} 

initdb();
