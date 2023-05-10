import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const checkEmail = (users) => {
    const u = users.find((u) => u.email === user.email);
    if (u.email === user.email) return user;
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    // här skulle ni behöva göra lite error hantering
    // tex att man ska fylla i alla fält eller om en user redan är registrerad
    const checkUser = await axios
      .get("http://localhost:6001/users")
      .then((res) => checkEmail(res.data, user.email))
      .catch((error) => {
        alert("Error");
      });

    if (checkUser.email === user.email) {
      alert("User already created!");
    } else {
      axios
        .post("http://localhost:6001/users", user)
        .then(alert("User created!"));

      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign up
      </button>
    </form>
  );
};

export default Signup;
