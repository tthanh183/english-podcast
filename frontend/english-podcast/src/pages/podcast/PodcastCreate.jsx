import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleImageUpload } from "../../firebase/handleUpload";
import { getGenres } from "../../services/genre/GenreService";
import { createPodcast } from "../../services/user/UserService";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

const PodcastCreate = ({ open, handleOpen }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [genres, setGenres] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm();
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!open) {
      reset({
        title: "",
        description: "",
      });
      setImage(null);
      setImagePreview(null);
      setSelectedGenres([]);
    }
  }, [open, reset]);

  const fetchData = async () => {
    const result = await getGenres();
    setGenres(result);
  };

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    const selectedGenre = genres.find((genre) => genre.id.toString() === value);

    setSelectedGenres((prevSelectedGenres) =>
      checked
        ? [...prevSelectedGenres, selectedGenre]
        : prevSelectedGenres.filter((genre) => genre.id.toString() !== value)
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const imgUrl = await handleImageUpload(image);

      const date = new Date();
      const formData = {
        ...data,
        image: imgUrl,
        star: 5,
        createdDate: date,
        updatedDate: date,
        genres: selectedGenres,
      };
      const response = await createPodcast(formData);

      toast.success("Create podcast: " + response.title + " successfully!");
      setUploading(false);
      handleOpen();
    } catch (error) {
      toast.error(error.message || "Error creating podcast");
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
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && <span>{errors.title.message}</span>}

                <Typography variant="h6">Description</Typography>
                <Input
                  label="Description"
                  size="lg"
                  color="green"
                  {...register("description")}
                />
              </div>
              <div className="flex flex-col gap-4 w-3/5">
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

            <Typography variant="h6">Genre</Typography>
            <div className="flex flex-wrap gap-4 justify-between">
              {genres.map((genre) => (
                <Checkbox
                  key={genre.id}
                  color="green"
                  label={genre.name}
                  value={genre.id}
                  onChange={handleGenreChange}
                />
              ))}
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

export default PodcastCreate;
