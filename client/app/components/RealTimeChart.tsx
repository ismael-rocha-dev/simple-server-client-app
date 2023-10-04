import React from "react";
import ReactApexChart, { Props } from "react-apexcharts";
import { getLastMeasurements } from "./utils/getLastMeasurements";
import getRandomNumbers from "./utils/getRandomNumber";
import { calculateNetPower } from "./utils/calculateNetPower";
import getSliceOfArray from "./utils/getSliceOfArray";

interface Serie {
  name: string;
  data: number[];
}

const dates: string[] = [];

const series: Serie[] = [];

for (let i = 1; i <= 60; i++) {
  series.push({
    name: `unidade consumidora ${i}`,
    data: [],
  });
}

const TIME_BETWEEN_REQUESTS = 625;

series.push({ name: "unidade geradora", data: [] });
series.push({ name: "Saldo de potência", data: [] });

let unitIndex = 0;

export default class RealTimeChart extends React.Component {
  state: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      series: [
        {
          data: series[0].data.slice(),
        },
      ],
      options: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 200,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Potência das unidades consumidoras",
          align: "center",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          categories: dates,
        },
        yaxis: {
          title: {
            text: "Potência (kW)",
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "18px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
        },
        legend: {
          show: false,
        },
      },
    };
  }

  updateOptions(data: { categories: string[]; title: string }) {
    this.state.options.xaxis.categories = data.categories;
    this.state.options.title.text = data.title;

    return this.state.options;
  }

  componentDidMount() {
    window.setInterval(async () => {
      const measurements = await getLastMeasurements();

      if (measurements.date === dates[dates.length - 1]) {
        return;
      }

      dates.push(measurements.date);

      measurements.consumption_measurements.forEach(
        (consumption_measurement, index) => {
          series[index].data.push(consumption_measurement);
        }
      );

      series[60].data.push(measurements.generation_measurements[0]);

      const netPower = calculateNetPower(
        measurements.generation_measurements,
        measurements.consumption_measurements
      );

      series[61].data.push(netPower);

      const visibleDates = getSliceOfArray<string>(dates);
      const visibleData = getSliceOfArray<number>(series[unitIndex].data);

      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: visibleData,
        },
      ]);

      const updatedOptions = this.updateOptions({
        categories: visibleDates,
        title: series[unitIndex].name,
      });

      ApexCharts.exec("realtime", "updateOptions", updatedOptions);
    }, TIME_BETWEEN_REQUESTS);
  }

  render() {
    return (
      <div id="chart" className="text-black">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={400}
        />
        <select
          name="unidades"
          id="unidadades"
          onChange={(event) => {
            unitIndex = Number(event.target.value);
          }}
        >
          {series.map((serie, index) => {
            return (
              <option key={index} value={index}>
                {serie.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
