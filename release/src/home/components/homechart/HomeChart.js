import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './homechart.css';
import { useNavigate } from 'react-router-dom';
import { countryToAlpha2 } from 'country-to-iso';

// Registering Chart.js components.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * HomeChart component for displaying a line chart of BMI and Diet data.
 *
 * @component
 * @param {Object} props - Component properties containing data for BMI and Diet.
 * @returns {JSX.Element} Rendered HomeChart component.
 */
export const HomeChart = (props) => {
  const navigate = useNavigate();
  // Extracting labels and data from props.
  const labels = props.data.Years;
  const data = {
    labels,
    datasets: [
      {
        label: 'BMI',
        data: props.data.Bmi,
        borderColor: '#00308F',
        backgroundColor: 'white',
        yAxisID: 'y',
        datasetLabel: 'BMI',
      },
      {
        label: 'Diet',
        data: props.data.Diet,
        borderColor: '#c93030',
        backgroundColor: 'white',
        yAxisID: 'y1',
        datasetLabel: 'Diet', 
      },
    ],
  };

  // Chart options.
  const options = {
    responsive: true,
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'BMI & Diet Chart',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          text: 'BMI',
          display: true,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          text: 'KCal',
          display: true,
        },
      },
    },
    onClick: (event, elements) => handleChartClick(elements, labels, props.data.ISO),
  };

  // Function to handle chart click
  const handleChartClick = (elements, years, country) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedYear = years[clickedIndex];
      // convert the country name to iso2 for country selector to recognise it
      const clickedCountry = countryToAlpha2(country);
      if(elements[0].datasetIndex === 0){
        navigate(`/bmiPage/${clickedCountry}/${clickedYear}`);
      } else{
        navigate(`/dietPage/${clickedCountry}/${clickedYear}`);
      }
    }
  };

  return (
    <div className="homechart">
      {/* Rendering the Line chart with provided options and data. */}
      <Line options={options} data={data} />
    </div>
  );
};
