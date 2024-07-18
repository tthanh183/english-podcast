import React, { useState } from "react";
import { storage } from "../../firebase/firebaseConfig"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {toast} from 'react-toastify'
const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress, like showing a progress bar
          // You can use snapshot.bytesTransferred and snapshot.totalBytes to calculate progress
        },
        (error) => {
          // Handle unsuccessful uploads
          toast.error("Upload failed:", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            toast.success("Upload succeeded!");
          });
        }
      );
    } else {
        toast.error("No image selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUploader;
