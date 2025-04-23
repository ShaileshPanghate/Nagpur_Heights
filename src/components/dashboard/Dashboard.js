
import React, { useEffect, useState } from "react";
import "./dashboard.css";
// import { communication } from "../../services/communcation";
import lineGraph from '../../assets/ChatGPT.png';



const Dashboard = () => {
  const stats = [
    { label: "Total Users", value: 1250 },
    { label: "Active Projects", value: 15 },
    { label: "Pending Tasks", value: 42 },
    { label: "Revenue", value: 12430 },
  ];
  const [animatedValues, setAnimatedValues] = useState(
    stats.map(() => 0) // Initial values
  );
  // const [products, setProducts] = useState([]);

  // const dashboardValue = async () => {
  //   try {
  //     const response = await communication.getDashboardValue();
  // console.log("response", response);
  //     if (response?.data?.success) {
  //       setValue(response?.data?.category);
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // };

  // useEffect(() => {
  //   dashboardValue();
  // }, []);
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      return setInterval(() => {
        setAnimatedValues(prev => {
          const newValues = [...prev];
          if (newValues[i] < stat.value) {
            newValues[i] += Math.ceil(stat.value / 50);
            if (newValues[i] > stat.value) newValues[i] = stat.value;
          }
          return newValues;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push('');
    }

    for (let i = 1; i <= totalDays; i++) {
      calendarDays.push(i);
    }
    return (
      <div className="calendar">
        <h3>{today.toLocaleString('default', { month: 'long' })} {year}</h3>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
          {calendarDays.map((day, idx) => (
            <div
              key={idx}
              className={`calendar-day ${day === date ? "today" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (

    <div className="dashboard">
      <div className="cards">
        {stats.map((stat, i) => (
          <div className="card" key={i} onMouseMove={handleMouseMove}>
            <h3>{stat.label}</h3>
            <p>{stat.label === "Revenue" ? `₹${animatedValues[i]}` : animatedValues[i]}</p>
          </div>
        ))}
      </div>
      <div className="cal-som">
        <div>
        <img src={lineGraph} alt="l" width="560px"  />
        </div>
        <div className="calendar-container">
          {generateCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
