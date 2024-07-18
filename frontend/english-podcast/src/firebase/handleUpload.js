import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const handleImageUpload = (image) => {
  return new Promise((resolve, reject) => {
    if (!image) {
      reject("No image selected");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can track progress here if needed
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        }).catch((error) => {
          reject(error);
        });
      }
    );
  });
};

export const handleAudioUpload = (audio) => {
    return new Promise((resolve, reject) => {
      if (!audio) {
        reject("No audio selected");
        return;
      }
  
      const storageRef = ref(storage, `audio/${audio.name}`);
      const uploadTask = uploadBytesResumable(storageRef, audio);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can track progress here if needed
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch((error) => {
            reject(error);
          });
        }
      );
    });
  };