import CategoryList from "./CategoryList";

const TopNavBar = () => {
  return (
    <div>
      <span>Rotten Potatoes</span>
      <CategoryList />
      <button>Login</button>
      <button>Register</button>
    </div>
  )
}

export default TopNavBar;