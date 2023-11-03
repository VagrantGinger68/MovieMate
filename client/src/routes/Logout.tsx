interface CookieProp {
  destroyCookie: Function;
}

const Logout: React.FC<CookieProp> = ({ destroyCookie }) => {
  destroyCookie();

  window.location.replace("/");

  return (
    <span></span>
  )
}

export default Logout