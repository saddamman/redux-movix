import React, { useState } from "react";

const CommanTab = ({ data, onTabChange }) => {
  const [activeTab, setActive] = useState();
  const [left, setLeft] = useState(0);

  const activeTabHandler = (tab, index) => {
    setTimeout(() => {
      setLeft(100 * index);
      setActive(index);
    }, 100);
    onTabChange(tab, index);
  };

  return (
    <div className="comman__tab">
      <div className="comman__tab__content">
        <ul className="comman__tab__items">
          {data.map((tab, index) => (
            <li
              key={tab}
              className={`comman__tab__item ${activeTab === index ? "active" : ""}`}
              onClick={() => {
                activeTabHandler(tab, index);
              }}>
              {tab}
            </li>
          ))}
        </ul>
        <div className="tab__slider" style={{ left }}></div>
      </div>
    </div>
  );
};

export default CommanTab;
