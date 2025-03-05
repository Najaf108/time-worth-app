import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

Chart.register(ArcElement, Tooltip, Legend);

const App = () => {
  const [income, setIncome] = useState(0);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityTime, setActivityTime] = useState("");

  const calculateHourlyRate = () => {
    if (income > 0 && hoursWorked > 0) {
      return (income / (hoursWorked * 4)).toFixed(2);
    }
    return 0;
  };

  const addActivity = () => {
    if (activityName && activityTime) {
      setActivities([...activities, { name: activityName, time: activityTime }]);
      setActivityName("");
      setActivityTime("");
    }
  };

  const updateActivity = (index, newTime) => {
    const updatedActivities = [...activities];
    updatedActivities[index].time = newTime;
    setActivities(updatedActivities);
  };

  const deleteActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const calculateActivityCost = (timeSpent) => {
    const hourlyRate = calculateHourlyRate();
    return ((hourlyRate / 60) * timeSpent).toFixed(2);
  };

  const chartData = {
    labels: activities.map((activity) => activity.name),
    datasets: [
      {
        data: activities.map((activity) => calculateActivityCost(activity.time)),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white font-poppins">
      <motion.div 
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg text-gray-900"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">💰 Time Worth Calculator</h1>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Monthly Income ($)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Hours Worked Per Week</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
            />
          </div>
          <p className="text-lg font-semibold text-center">Your Hourly Rate: <span className="text-indigo-600 font-bold">${calculateHourlyRate()}/hour</span></p>
        </div>

        <h2 className="text-xl font-bold mt-6 text-indigo-700">🕒 Add Daily Activities</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Activity (e.g., Social Media)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Time Spent (minutes)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={activityTime}
            onChange={(e) => setActivityTime(e.target.value)}
          />
          <motion.button 
            onClick={addActivity} 
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
            whileTap={{ scale: 0.95 }}
          >
            ➕ Add Activity
          </motion.button>
        </div>

        {activities.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-bold mt-6 text-indigo-700">📊 Activity Cost Analysis</h2>
            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <motion.li 
                  key={index} 
                  className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <input
                      type="number"
                      className="w-20 p-2 border rounded-lg"
                      value={activity.time}
                      onChange={(e) => updateActivity(index, e.target.value)}
                    />
                    <span className="ml-2">min</span>
                  </div>
                  <span className="text-indigo-600 font-bold">${calculateActivityCost(activity.time)}</span>
                  <motion.button
                    onClick={() => deleteActivity(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                    whileTap={{ scale: 0.9 }}
                  >
                    ❌
                  </motion.button>
                </motion.li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <div className="w-40 h-40">
                <Pie data={chartData} />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
