import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. kolla både email och password i databasen så att det stämmer
  // 2. Logga ut värdet för att dubbellkolla så det blir rätt
  // 3. Om det blir rätt returnera user
  const checkEmail = (users) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    console.log(user);
    if (user.email === email && user.password === password) return user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      // kollar om email eller password fältet är tomt
      alert("All fields are required!");
      // om villkoret stämmer visa alert
    }
    // kolla om det finns en user med samma epost
    // vi behöver skriva en funktion för att göra en check

    const user = await axios
      .get("http://localhost:6001/users")
      .then((res) => checkEmail(res.data, email))
      .catch((error) => {
        alert("Error");
      });

    //console.log(user);
    //console.log(user.email);

    if (user.email === email && user.password === password) {
      alert("Success!");

      // om login success ska vi spara user i localstorage
      localStorage.setItem("user", JSON.stringify(user.id));
    }
    setEmail("");
    setPassword("");
  };

  return (
    <form>
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          value={email}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          value={password}
          placeholder="Password"
        />
      </div>
      <button typw="submit" onClick={handleSubmit}>
        Log in
      </button>
    </form>
  );
};

export default Login;
