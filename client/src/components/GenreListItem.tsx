interface GenreListProps {
  name: string;
  changeGenre: Function;
  id: number;
  isSelected: boolean;
}

const GenreListItem: React.FC<GenreListProps> = ({ name, changeGenre, id, isSelected }) => {
  return (
    <>
      <button onClick={() => changeGenre(id)} className={`${isSelected ? "bg-blue-500" : "bg-[#3f3f3f]"} text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-2`}> {name}</button>
    </>
  )
};

export default GenreListItem;