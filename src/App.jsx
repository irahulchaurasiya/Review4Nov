import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [enterClicked, setEnterClicked] = useState(false);

  useEffect(() => {
    if (!enterClicked) {
      axios
        .get(`https://api.github.com/search/users?per_page=5&q=${value}`, {
          headers: {
            Authorization: "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",
          },
        })
        .then((response) => {
          setData(response.data.items);
          console.log(response.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [value]);

  const handleChange = (e) => {
    setEnterClicked(false);
    setValue(e.target.value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex
      );
      setValue(data[selectedIndex].login);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      setValue(data[selectedIndex].login);
    } else if (e.key === "Enter") {
      setValue(data[selectedIndex].login);
      setEnterClicked(true);
      setData([]);
    }
  };

  return (
    <div>
      <div>Review</div>
      <div>Use up and down arrows to navigate</div>
      <div>
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="border-2 border-black"
          type="text"
          value={value}
        />
        enter name
      </div>
      <div>
        {data.map((name, index) => (
          <div
            key={index}
            style={{
              backgroundColor: selectedIndex === index ? "blue" : "transparent",
            }}
          >
            {name.login}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
