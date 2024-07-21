import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const PodcastCard = ({ podcast }) => {
  return (
    <Card className="w-56 shadow-lg">
      <CardHeader shadow={false} floated={false} className="h-fit overflow-hidden">
        <img
          src={podcast.image}
          alt="card-image"
          className="h-fit w-fit object-contain p-2"
        />
      </CardHeader>
      <CardBody className="text-center p-2">
        <Typography color="blue-gray">
          {podcast.title}
        </Typography>
        <Typography variant="small" color="gray" className="mt-2 h-20">
          {podcast.description ? podcast.description.split('\.')[0] : "No description available"}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default PodcastCard;
