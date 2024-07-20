import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Card, CardBody, CardFooter, Typography, Button, Input, Textarea } from "@material-tailwind/react";
import { updateEpisode } from "../../services/episode/EpisodeService.js";
import { toast } from "react-toastify";
import { handleAudioUpload, handleImageUpload } from '../../firebase/handleUpload.js';

const EpisodeUpdate = ({ open, handleOpen, episode, podcastId }) => {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (episode) {
      populateForm(episode);
    }
  }, [episode]);

  const populateForm = (episode) => {
    setValue("title", episode.title);
    setValue("description", episode.description);
    setValue("script", episode.script);
    setImagePreview(episode.image);
    setAudioPreview(episode.url);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(file);
      const audioURL = URL.createObjectURL(file);
      setAudioPreview(audioURL);
    }
  };

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      let imgUrl = imagePreview;
      if (image) {
        imgUrl = await handleImageUpload(image);
      }
      let audioUrl = audioPreview;
      if (audio) {
        audioUrl = await handleAudioUpload(audio);
      }

      const date = new Date();
      const formData = {
        ...data,
        image: imgUrl,
        url: audioUrl,
        createdDate: episode.createdDate,
        updatedDate: date,
      };

      const response = await updateEpisode(podcastId, episode.id, formData);

      toast.success("Update podcast: " + response.title + " successfully");
      setUploading(false);
      handleOpen();
    } catch (error) {
      toast.error(error.message || "An error occurred");
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
      <Card className="mx-auto w-[1000px] p-6 shadow-lg">
        <CardBody className="flex flex-col gap-6">
          <Typography
            variant="h4"
            color="green"
            className="text-center text-green-700"
          >
            Episode Information
          </Typography>
          <Typography
            className="mb-4 font-normal text-center"
            variant="paragraph"
            color="black"
          >
            Edit your episode's information
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
                    className="mt-2 w-full h-full object-cover rounded-lg shadow-sm"
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

export default EpisodeUpdate;
