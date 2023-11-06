interface GenreListProps {
  name: string;
  changeGenre: Function;
  id: number;
  isSelected: boolean;
}

const GenreListItem: React.FC<GenreListProps> = ({ name, changeGenre, id, isSelected }) => {
  return (
    <>
      <button onClick={() => changeGenre(id)} className={`${isSelected ? "bg-blue-100" : "bg-green-100"} text-[#cecece] font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-2`}> {name}</button>
    </>
  )
};

export default GenreListItem;