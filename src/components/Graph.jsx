import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {useTheme} from "../context/ThemeContext"

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ wpmData, accuracyData }) => {
    const {theme}=useTheme();
  return (
    <div className="graph">
      <Line
        data={{
          labels: wpmData.map((i) => i[0]),
          datasets: [
            {
              data: wpmData.map((i) => i[1]),
              label: "wpm",
              borderColor: theme.color,
            },
            {
              data: accuracyData.map(i=>i[1]),
              label: "accuracy",
              borderColor: theme.textBoxColor
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
