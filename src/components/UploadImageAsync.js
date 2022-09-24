import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import {db, storage} from '../utils/firebase';
import uuid from 'react-native-uuid';
const UploadImageAsync = async({uri})=> {
    
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    console.log("blob",blob);
  
    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);
  
    // We're done with the blob, close and release it
    // blob.close();
  
    return await getDownloadURL(fileRef);
  }
  export default UploadImageAsync;