import React, { useState } from "react";
import { storage } from "../../firebase/firebaseConfig"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {toast} from 'react-toastify'

const AudioUploader = () => {
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const handleAudioChange = (e) => {
    if (e.target.files[0]) {
      setAudio(e.target.files[0]);
    }
  };

  const handleAudioUpload = () => {
    const storageRef = ref(storage, `audio/${audio.name}`);
    const uploadTask = uploadBytesResumable(storageRef, audio);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress, like showing a progress bar
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error("Upload failed:", error);
        console.error("Upload failed:", error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAudioUrl(downloadURL);
          toast.success("Upload succeeded!");
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleAudioChange} />
      <button onClick={handleAudioUpload}>Upload Audio</button>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioUploader;
