interface GenreListProps {
  name: string;
  changeGenre: Function;
  id: number;
}

const GenreListItem: React.FC<GenreListProps> = ({name, changeGenre, id}) => {
  return (
    <>
    <button onClick={() => changeGenre(id)} className="dark:bg-slate-800 hover:bg-black-500 dark:text-slate-400 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"> {name}</button>
    </>
  )
};

export default GenreListItem;