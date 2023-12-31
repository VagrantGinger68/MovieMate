import { useEffect, useState } from "react";

interface CookieProp {
  changeCookie: Function;
}

const Login: React.FC<CookieProp> = ({ changeCookie }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([{ email: "", password: "", name: "" }]);

  const getUsers = () => {
    const url = "http://localhost:3000/users";
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setUsers(json))
      .catch(err => console.error('error:' + err));
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    for (let user of users) {
      if (user.email === email) {
        if (user.password === password) {
          changeCookie(user.name)
          window.location.replace("/");
        }
      }
    }
    console.log("Login failed");
  }

  return (
    <form className="mx-auto flex min-h-screen w-full items-center justify-center bg-[#282828] text-white">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="Email or Username"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={(e) => (setEmail(e.target.value))}
          />
        </div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={(e) => (setPassword(e.target.value))}
          />
        </div>
        <button onClick={handleClick} className="transform rounded-sm bg-[#4477CE] py-2 font-bold duration-300 hover:bg-blue-600">
          LOG IN
        </button>
      </section>
    </form>
  )
}

export default Login