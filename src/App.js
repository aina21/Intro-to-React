import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopte Me!"),
    React.createElement(Pet, {
      name: "Petti",
      animal: "Dog",
      breed: "Vagh Vagh"
    }),

    React.createElement(Pet, {
      name: "Pashmak",
      animal: "Cat",
      breed: "miew"
    }),
    React.createElement(Pet, {
      name: "NokTala",
      animal: "chicken",
      breed: "ghod ghod"
    })
  ]);
};

render(React.createElement(App), document.getElementById("root"));
