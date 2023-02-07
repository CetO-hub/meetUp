import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const getData = () => {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
    const data = genres.map((genre) => {
      const value = events.filter((event) => {
        return event.summary.split(" ").includes(genre);
      }).length;
      return { name: genre, value };
    });
    return data;
  };

  useEffect(() => {
    setData(() => getData());
    //eslint-disable-next-line
  }, [events]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#522F60"];

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Legend verticalAlign="top" height={36} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          innerRadius={80}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
