
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./dashboard.css";
// import { communication } from "../../services/communcation";
import lineGraph from '../../assets/ChatGPT.png';
import data from '../data.json'
import emp from '../employees/emp.json'
import { FaUsers, FaProjectDiagram, FaTasks, FaHome, FaCheckCircle, FaRupeeSign } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Dashboard = () => {
  const empp = emp.Employees;
  const totalEmp = empp.length;
  const projects = data.ProjectsList;
  const totalProjects = projects.length;

  const totalAvailableFlats = projects.reduce((total, project) => {
    return total + project.Blocks.reduce((blockTotal, block) => {
      return blockTotal + block.Floors.reduce((floorTotal, floor) => {
        return floorTotal + floor.flats.filter(flat => flat.status === 'available').length;
      }, 0);
    }, 0);
  }, 0);
  const totalSoldFlats = projects.reduce((total, project) => {
    return total + project.Blocks.reduce((blockTotal, block) => {
      return blockTotal + block.Floors.reduce((floorTotal, floor) => {
        return floorTotal + floor.flats.filter(flat => flat.status === 'sold').length;
      }, 0);
    }, 0);
  }, 0);
  const stats = [
    { label: "Total Users", value: 1250, icon: <FaUsers />, path: "/" },
    { label: "Active Projects", value: totalProjects, icon: <FaProjectDiagram />, path: "/projects" },
    { label: "Available Flats/Plots", value: totalAvailableFlats, icon: <FaHome />, path: "/projects" },
    { label: "Sold Flats/Plots", value: totalSoldFlats, icon: <FaCheckCircle />, path: "/projects" },
    { label: "Total Employees", value: totalEmp, icon: <FaUsers />, path: "/employees" },
    { label: "Revenue", value: 12430, icon: <FaRupeeSign />, path: "/" },
  ];


  const [animatedValues, setAnimatedValues] = useState(
    stats.map(() => 0) // Initial values
  );
  console.log(setAnimatedValues)
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

  // for pieChart
  // for pieChart
  const flatAndPlotData = { flats: 0, plots: 0 };

  projects.forEach(project => {
    project.Blocks.forEach(block => {
      block.Floors.forEach(floor => {
        floor.flats.forEach(flat => {
          if (flat.propertyType?.toLowerCase() === 'plot') {
            flatAndPlotData.plots++;
          } else {
            flatAndPlotData.flats++;
          }
        });
      });
    });
  });

  const pieChartData = [
    { name: "Flats", value: flatAndPlotData.flats },
    { name: "Plots", value: flatAndPlotData.plots },
  ];  // for pieChart

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      return setInterval(() => {
        setAnimatedValues(prev => {
          const newValues = [...prev];
          if (newValues[i] < stat.value) {
            const increment = Math.max(1, Math.ceil(stat.value / 100));
            newValues[i] = Math.min(newValues[i] + increment, stat.value);
          }
          return newValues;
        });
      }, 0.1);
    });

    return () => intervals.forEach(clearInterval);
  }, [stats]);

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
    <div className="dashboard-scroll-wrapper">
      <div className="dashboard">
        <div className="cards">
          {stats.map((stat, i) => (
            <Link to={stat.path} key={i} className="card-link">
              <div className="card" >
                <div className="card-icon">{stat.icon}</div>
                <div>
                  <h3>{stat.label}</h3>
                  <p>{stat.label === "Revenue" ? `₹${animatedValues[i]}` : animatedValues[i]}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="cal-som">
          <div>
            {/* <img src={lineGraph} alt="l" width="560px" /> */}
            <div className="chart-container">
              <h3>Flats vs Plots</h3>
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    isAnimationActive={true}        // ✅ Enables animation
                    animationDuration={1500}       // ✅ 1.5 seconds
                    animationEasing="ease-out"     // ✅ Smooth ending
                  >
                    <Cell key="flats" fill="#8884d8" />
                    <Cell key="plots" fill="#82ca9d" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="calendar-container">
            {generateCalendar()}

          </div>

        </div>

      </div>
    </div>

  );
};

export default Dashboard;
