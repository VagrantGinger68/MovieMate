interface GenreListProps {
  name: string;
  changeGenre: Function;
  id: number;
}

const GenreListItem: React.FC<GenreListProps> = ({name, changeGenre, id}) => {
  return (
    <div className="bg-[#3f3f3f] hover:bg-black-500 text-[#cecece] font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded mb-2">
    <button onClick={() => changeGenre(id)}> {name}</button>
    </div>
  )
};

export default GenreListItem;