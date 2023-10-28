import React from "react";

interface GenreListProps {
  name: string;
}

const GenreListItem: React.FC<GenreListProps> = ({name}) => {
  return (
    <h1>Name: {name}</h1>
  )
};

export default GenreListItem;