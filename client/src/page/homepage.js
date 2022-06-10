import "./homepage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import link from "../image/link.png";

function Homepage() {
  const [trips, setTrips] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getTrips = async () => {
    const results = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );

    setTrips(results.data.data);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const HandleConcatTag = (tag) => {
    if (!searchText.includes(tag)) {
      setSearchText((searchText + " " + tag).trim());
    }
  };

  useEffect(() => {
    let timerId;

    timerId = setTimeout(getTrips, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  return (
    <div className="listTrips">
      <header className="header">เที่ยวไหนดี</header>

      <label className="searchTrip">
        ค้นหาที่เที่ยว
        <input
          onChange={handleSearchTextChange}
          value={searchText}
          placeholder="หาที่เที่ยวแล้วไปกัน"
        />
      </label>

      {trips.map((card, index) => {
        return (
          <div className="cardTrips" key={card.eid}>
            <img className="mainImage" src={card.photos[0]} />
            <div className="mainContent">
              <div className="titleTrip">
                <h3>{card.title}</h3>
              </div>
              <div className="content">
                <p className="description">{card.description}</p>
                <div className="link">
                  <a href={card.url}>อ่านต่อ</a>
                </div>
                <div className="catagories">
                  หมวด{" "}
                  {card.tags.slice(0, -1).map((tag, index) => {
                    return (
                      <a href="#" className="Tags" key={index}>
                        <span onClick={() => HandleConcatTag(tag)}>{tag} </span>
                      </a>
                    );
                  })}
                  {
                    <a href="#" className="Tags">
                      <span
                        onClick={() => HandleConcatTag(card.tags.slice(-1))}
                      >
                        {"และ"} {card.tags.slice(-1)}
                      </span>
                    </a>
                  }
                </div>
                <div className="subImage">
                  <img className="subImage1" src={card.photos[1]} />
                  <img className="subImage2" src={card.photos[2]} />
                  <img className="subImage3" src={card.photos[3]} />
                  <a onClick={() => navigator.clipboard.writeText(card.url)}>
                    <img className="copyLink" src={link} alt="copyLink-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Homepage;
