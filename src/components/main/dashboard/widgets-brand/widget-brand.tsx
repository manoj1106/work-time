import CIcon from '@coreui/icons-react';
import { CWidgetStatsD } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';

interface ValueProps {
  title: string;
  value: any;
}

interface ChartDataProps {
  labels?: any;
  datasets?: any;
}

interface ChartProps {
  data?: ChartDataProps;
}

interface WidgetProps {
  withCharts: boolean;
  chart?: ChartProps;
  icon: string[];
  values?: ValueProps[];
  bgColor?: string;
}

const WidgetBrand = (props: WidgetProps) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const classes = !props.bgColor && 'widgets-card-header-bg-primary';

  return (
    <CWidgetStatsD
      className={`mb-4 ${classes}`}
      color={props.bgColor}
      {...(props.withCharts && {
        chart: (
          <CChart
            className='position-absolute w-100 h-100'
            type='line'
            data={{
              labels: props.chart?.data?.labels,
              datasets: [
                {
                  backgroundColor: 'rgba(255,255,255,.1)',
                  borderColor: 'rgba(255,255,255,.55)',
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: props.chart?.data?.datasets,
                  fill: true,
                },
              ],
            }}
            options={chartOptions}
          />
        ),
      })}
      icon={<CIcon icon={props.icon} height={52} className='my-4 text-white' />}
      values={props.values}
    />
  );
};
export default WidgetBrand;
