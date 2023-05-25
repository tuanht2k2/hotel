import { ref, child, get, remove, push, set, update } from 'firebase/database';
import { database } from '../firebase';

export const handleGetDataRef = (path) => {
  const nodeRef = ref(database, path);
  return nodeRef;
};

export const handleGetData = (path) => {
  const dbRef = ref(database);
  return get(child(dbRef, path));
};

export const handleRemoveData = (path) => {
  const dataRef = ref(database, path);
  return remove(dataRef);
};

export const handlePushData = (path, data) => {
  return push(ref(database, path), data);
};

export const handleSetData = (path, data) => {
  return set(ref(database, path), data);
};

export const handleUpdateData = (path, data) => {
  return update(ref(database, path), data);
};
