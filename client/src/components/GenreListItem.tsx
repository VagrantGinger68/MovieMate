import React from "react";

interface GenreListProps {
  name: string;
  changeGenre: Function;
  id: number;
}

const GenreListItem: React.FC<GenreListProps> = ({name, changeGenre, id}) => {
  return (
    <>
    <button onClick={() => changeGenre(id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"> {name}</button>
    </>
  )
};

export default GenreListItem;