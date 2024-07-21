import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  handleImageUpload,
  handleAudioUpload,
} from "../../firebase/handleUpload"

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
import { createEpisode } from "../../services/episode/EpisodeService";

const EpisodeCreate = ({ open, handleOpen, podcastId }) => {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm();
  
  useEffect(() => {
    console.log(podcastId);
  },[])

  useEffect(() => {
    if (!open) {
      reset({
        title: "",
        description: "",
        script: ""
      });
      setImage(null);
      setImagePreview(null);
      setAudio(null);
      setAudioPreview(null);
    }
  }, [open, reset]);

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

  const getAudioDuration = (file) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
      audio.addEventListener('error', (e) => {
        reject(e);
      });
    });
  };

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const audioUrl = await handleAudioUpload(audio);
      const imgUrl = await handleImageUpload(image);
      const audioDuration = await getAudioDuration(audio);

      const date = new Date();
      const formData = {
        ...data,
        image: imgUrl,
        createdDate: date,
        updatedDate: date,
        url: audioUrl,
        duration: Math.round(audioDuration) 
      };

      const response = await createEpisode(podcastId, formData);

      toast.success("Create episode: " + response.title + " successfully!");
      setUploading(false);
      handleOpen();
    } catch (error) {
      toast.error(error.message || "Error creating episode");
      setUploading(false);
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none flex items-center justify-center"
    >
      <Card className="mx-auto w-[1000px] p-2 shadow-lg ">
        <CardBody className="flex flex-col gap-1">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-center gap-10">
              <div className="flex flex-col gap-4 w-2/5">
                <Typography variant="h6">Title</Typography>
                <Input
                  label="Title"
                  size="lg"
                  color="green"
                  {...register("title", { required: true })}
                />
                {errors.title && <span className="text-green-500">Title is required</span>}

                <Typography variant="h6">Description</Typography>
                <Input
                  label="Description"
                  size="lg"
                  color="green"
                  {...register("description", { required: true })}
                />
                {errors.description && <span className="text-green-500">Description is required</span>}

                <Typography variant="h6">Script</Typography>
                <Textarea
                  label="Script"
                  size="lg"
                  color="green"
                  {...register("script", { required: true })}
                />
                {errors.script && <span className="text-green-500">Script is required</span>}
              </div>
              <div className="flex flex-col gap-4 w-3/5">
                <Typography variant="h6">Audio</Typography>
                <input type="file" onChange={handleAudioChange} />
                {audioPreview && (
                  <audio controls className="mt-2">
                    <source src={audioPreview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}

                <Typography variant="h6">Image</Typography>
                <input type="file" onChange={handleImageChange} />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-56 h-fit object-contain rounded-lg shadow-sm"
                  />
                )}
              </div>
            </div>
            <CardFooter className="flex flex-col items-center pt-6">
              <Button
                variant="gradient"
                type="submit"
                fullWidth
                color="green"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
};

export default EpisodeCreate;
