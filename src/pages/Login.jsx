import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [action, setAction] = useState("login");
  const { login, signup, message } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "login") {
      login(userCredentials.username, userCredentials.password);
    } else {
      signup(userCredentials.username, userCredentials.password);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAction("login");
            }}
            value={"login"}
            className={action === "login" ? "bg-blue-400" : "bg-red-400"}
          >
            Login
          </button>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAction("signup");
            }}
            value={"signup"}
            className={action === "signup" ? "bg-blue-400" : "bg-red-400"}
          >
            Signup
          </button>
        </div>
      </div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="name"
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, username: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, password: e.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {message?.error && <p>{message.error}</p>}
      {message?.message && <p>{message.message}</p>}
    </form>
  );
};
