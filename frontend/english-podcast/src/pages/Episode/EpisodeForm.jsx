import React, { useState } from "react";
import {
  handleImageUpload,
  handleAudioUpload,
} from "../../firebase/handleUpload";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";

const EpisodeForm = ({ open, handleOpen }) => {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(file);
      const audioURL = URL.createObjectURL(file);
      setAudioPreview(audioURL);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const handleSubmit = async () => {
    const audioUrl = await handleAudioUpload(audio)
    const imgUrl = await handleImageUpload(image)
    console.log("Img: " + imgUrl);
    console.log("Audio: " + imgUrl);
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none flex items-center justify-center"
    >
      <Card className="mx-auto w-[1000px] p-6 shadow-lg ">
        <CardBody className="flex flex-col gap-6">
          <Typography
            variant="h4"
            color="green"
            className="text-center text-green-700"
          >
            Podcast Information
          </Typography>
          <Typography
            className="mb-4 font-normal text-center"
            variant="paragraph"
            color="black"
          >
            Enter your new episode's information
          </Typography>
          <div className="flex flex-row justify-center gap-10">
            <div className="flex flex-col gap-4 w-2/5">
              <Typography variant="h6">Title</Typography>
              <Input label="Title" size="lg" color="green" />

              <Typography variant="h6">Description</Typography>
              <Input label="Description" size="lg" color="green" />

              <Typography variant="h6">Script</Typography>
              <Textarea label="Script" size="lg" color="green"/>
            </div>
            <div className="flex flex-col gap-4 w-3/5">
              <Typography variant="h6">Audio</Typography>
              <input type="file" onChange={(e) => handleAudioChange(e)} />
              {audioPreview && (
                <audio controls className="mt-2">
                  <source src={audioPreview} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}

              <Typography variant="h6">Image</Typography>
              <input type="file" onChange={(e) => handleImageChange(e)} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-full h-full object-cover rounded-lg shadow-sm"
                />
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-center pt-6">
          <Button
            variant="gradient"
            onClick={handleSubmit}
            fullWidth
            color="green"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default EpisodeForm;
