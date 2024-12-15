import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [action, setAction] = useState("login");
  const { login, signup, message, setMessage } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "login") {
      login(userCredentials.username, userCredentials.password);
    } else {
      signup(userCredentials.username, userCredentials.password);
    }
  };

  return (
    <div
      className="flex h-screen justify-center items-center"
      style={{ backgroundColor: "#344E41" }}
    >
      <form
        className="flex flex-col border h-80 w-96 justify-center items-center justify-around p-4"
        style={{
          backgroundColor: "#588157",
          borderColor: "#A3B18A",
          borderRadius: "2rem",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className="flex justify-center items-center h-6 w-full	p-6 rounded-full text-slate-50"
          style={{ backgroundColor: "#3A5A40" }}
        >
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setAction("login");
                setMessage({});
              }}
              value={"login"}
              className="rounded-full p-2 w-40"
              style={action === "login" ? { backgroundColor: "#A3B18A" } : {}}
            >
              Login
            </button>
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setAction("signup");
                setMessage({});
              }}
              value={"signup"}
              className="rounded-full p-2 w-40"
              style={action === "signup" ? { backgroundColor: "#A3B18A" } : {}}
            >
              Signup
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="mt-2 w-full">
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="name"
              style={{ backgroundColor: "#DAD7CD" }}
              className="placeholder:text-gray-500 py-2 px-3 rounded-full w-full"
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className="m-4 w-full">
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              style={{ backgroundColor: "#DAD7CD" }}
              className="placeholder:text-gray-500 py-2 px-3 rounded-full w-full"
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="w-full">
          <button
            className="border border-sky-500 rounded-full p-2 w-full"
            style={{ backgroundColor: "#A3B18A", borderColor: "#A3B18A" }}
            type="submit"
          >
            Submit
          </button>
        </div>
        {message?.error && <p className="text-slate-50 p-4">{message.error}</p>}
        {message?.message && (
          <p className="text-slate-50 p-4">{message.message}</p>
        )}
      </form>
    </div>
  );
};
