import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState("name");
  const [content, setContent] = useState("Random Person");
  const [person, setPerson] = useState({});
  const [newPerson, setNewPerson] = useState(false);

  const getPersonData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data.results[0]);
      let personData = data.results[0];
      const { email, name, location, dob, cell, picture, login } = personData;
      let fullData = {
        email: email,
        name: `${name.first} ${name.last}`,
        street: `${location.street.number} ${location.street.name}`,
        age: dob.age,
        phone: cell,
        password: login.password,
        image: picture.large,
      };
      setPerson(fullData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPersonData();
  }, [newPerson]);

  const handleMouseOver = (e, contentItem) => {
    e.stopPropagation();
    console.log(e.target.dataset.ariaLabel);
    setHeader(e.target.dataset.ariaLabel);
    setContent(contentItem);
  };

  const handleClick = (e) => {
    setNewPerson(!newPerson);
  };

  const stopMouseOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={person.image} alt="jon's face" className="user-img" />
          <p className="user-title">My {header} is</p>
          <p className="user-value">{content}</p>
          <div className="values-list">
            <button
              className="icon"
              data-aria-label="name"
              onMouseOver={(e) => {
                handleMouseOver(e, person.name);
              }}
            >
              <FaUser onMouseOver={stopMouseOver} />
            </button>
            <button
              className="icon"
              data-aria-label="email"
              onMouseOver={(e) => {
                handleMouseOver(e, person.email);
              }}
            >
              <FaEnvelopeOpen onMouseOver={stopMouseOver} />
            </button>
            <button
              className="icon"
              data-aria-label="age"
              onMouseOver={(e) => {
                handleMouseOver(e, person.age);
              }}
            >
              <FaCalendarTimes onMouseOver={stopMouseOver} />
            </button>
            <button
              className="icon"
              data-aria-label="street"
              onMouseOver={(e) => {
                handleMouseOver(e, person.street);
              }}
            >
              <FaMap onMouseOver={stopMouseOver} />
            </button>
            <button
              className="icon"
              data-aria-label="phone"
              onMouseOver={(e) => {
                handleMouseOver(e, person.phone);
              }}
            >
              <FaPhone onMouseOver={stopMouseOver} />
            </button>
            <button
              className="icon"
              data-aria-label="password"
              onMouseOver={(e) => {
                handleMouseOver(e, person.password);
              }}
            >
              <FaLock onMouseOver={stopMouseOver} />
            </button>
          </div>
          <button className="btn" type="button" onClick={handleClick}>
            {isLoading ? "Loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
