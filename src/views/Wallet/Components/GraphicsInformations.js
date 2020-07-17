import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

class GraphicsInformations extends React.Component {
  constructor() {
    super();
    this.state = { data: [], colorsData: [] };
  }

  componentDidMount() {
    const arrayData = [];
    const arrayColors = [];

    for (const asset of Object.values(this.props.data)) {
      var newData = {
        name: asset.name,
        value: parseFloat(asset.pourcentage),
      };
      arrayData.push(newData);
      arrayColors.push(asset.color);
    }

    this.setState({ data: arrayData , colorsData : arrayColors});
  }

  render() {
    const COLORS = this.state.colorsData;

    return (
      <ResponsiveContainer width="100%" height={500}>
        <PieChart >
          <Pie
            data={this.state.data}
            outerRadius={150}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {this.state.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            height={36}
            align="right"
            verticalAlign="middle"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default GraphicsInformations;
