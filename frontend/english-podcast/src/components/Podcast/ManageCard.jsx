import React from "react";
import { Card, CardHeader, CardBody, Typography, Button, Chip } from "@material-tailwind/react";
import { DocumentMagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const ManageCard = ({ podcast, onView, onEdit, onDelete }) => {
  return (
    <Card className="w-full mb-4 shadow-lg">
      <CardHeader floated={false} shadow={false} className="h-64">
        <img src={podcast.image} alt={podcast.title} className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {podcast.title}
        </Typography>
        <Typography className="mb-2 min-h-24">
          {podcast.description}
        </Typography>
        <Typography className="mb-2">
          Last updated: {podcast.updatedDate.split('T')[0]}
        </Typography>
        <Typography className="mb-2">
          Rating: {podcast.avgRating}
        </Typography>
        <div className="flex justify-center gap-2 mb-2">
          {podcast.genres.map((genre, index) => (
            <Chip key={index} variant="ghost" value={genre.name} />
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <Button size="sm" color="blue" onClick={() => onView(podcast.id)}>
            <DocumentMagnifyingGlassIcon className="h-5 w-5" />
          </Button>
          <Button size="sm" color="green" onClick={() => onEdit(podcast)}>
            <PencilIcon className="h-5 w-5" />
          </Button>
          <Button size="sm" color="red" onClick={() => onDelete(podcast.id)}>
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ManageCard;
