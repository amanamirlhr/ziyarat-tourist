import { Component, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexResponsive
} from "ng-apexcharts";
import { DashboardGraphService } from '../_services/dashboardgraph.service';

@Component({
  selector: 'app-tour-dashboard',
  templateUrl: './tour-dashboard.component.html',
  styleUrls: ['./tour-dashboard.component.css']
})
export class TourDashboardComponent implements OnInit {
  series!: ApexAxisChartSeries;
  touriestseries!: ApexAxisChartSeries;
  pieseries!: ApexAxisChartSeries;
  chart!: ApexChart;
  piechart!: ApexChart;
  touriestchart!: ApexChart;
  dataLabels!: ApexDataLabels;
  touriestdataLabels!: ApexDataLabels;
  plotOptions!: ApexPlotOptions;
  touriestplotOptions!: ApexPlotOptions;
  pieplotOptions!: ApexPlotOptions;
  yaxis!: ApexYAxis;
  xaxis!: ApexXAxis;
  touriestxaxis!: ApexXAxis;
  fill!: ApexFill;
  touriestfill!: ApexFill;
  tooltip!: ApexTooltip;
  pietooltip!: ApexTooltip;
  stroke!: ApexStroke;
  tourieststroke!: ApexStroke;
  legend!: ApexLegend;
  touriestlegend!: ApexLegend;
  labels: any;
  touriestcolors!: string[];
  responsive!: ApexResponsive[];
  totalUsers: any = 0;
  totalTours: any = 0;
  totalCountry: any = 0;

  ngOnInit(): void {
    this.chartoptions();
    this.piebarchartoptions();
    this.getExistingUserdata();
    this.getAllUser();
    this.getAllTour();
    this.getAllCountry();
  }
  constructor(private _touriestByMonth: DashboardGraphService,) { }
  getExistingUserdata() {
    debugger
    this._touriestByMonth.getTouristsByMonth().subscribe((data: any[]) => {
      debugger
      // console.log("this is a get api :", data)
      // this.touriestchartoptions(  // <-- this call *must* be inside the subscription callback
      //   data.map((item: any) => item.MonthYear),
      //   data.map((item: any) => item.TouriestCount)
      // );
      if (data.length > 0) {
        this.touriestchartoptions(
          data.map((item: any) => item.MonthYear),
          data.map((item: any) => item.TouriestCount)
        );
      }
      else {
        console.error("Data is empty or undefined");
      }
    });
  }
  getAllUser() {
    this._touriestByMonth.getAllTourist().subscribe((data: any[]) => {
      this.totalUsers = data.map((item) => item.total_Tourist);
    });
  }
  getAllTour() {
    this._touriestByMonth.getAllTour().subscribe((data: any[]) => {
      this.totalTours = data.map((item) => item.total_Tours);
    });
  }
  getAllCountry() {
    this._touriestByMonth.getAllCountry().subscribe((data: any[]) => {
      this.totalCountry = data.map((item) => item.total_Country);
    });
  }
  public piebarchartoptions(): void {
    this.piechart = {
      type: "radialBar",
      height: 80,
      width: 380,
    },
      this.labels = {
        name: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      }
    this.pieplotOptions = {
      radialBar: {
        hollow: {
          size: "80%"
        }
      }
    },
      this.pieseries = [
        {
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 63, 60, 66],
        },
      ]
  }
  public chartoptions(): void {
    this.series = [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }
    ],
      this.chart = {
        type: "bar",
        height: 350
      },
      this.plotOptions = {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      this.dataLabels = {
        enabled: false,
      },
      this.stroke = {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      this.xaxis = {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      this.yaxis = {
        title: {
          text: "$ (thousands)"
        }
      },
      this.fill = {
        opacity: 1,
        colors: ['#7f56d9', '#259ffb', '#9C27B0']
      },
      this.tooltip = {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          }
        }
      }
  };
  public touriestchartoptions(MonthYear: any[], TouriestCount: any[]): void {
    debugger
    this.touriestseries = [
      {
        name: "basic",
        data: TouriestCount,
      }
    ],
      this.touriestchart = {
        type: "bar",
        height: 350
      },
      this.touriestplotOptions = {
        bar: {
          horizontal: false
        }
      },
      this.touriestdataLabels = {
        enabled: false
      },
      this.touriestxaxis = {
        categories: MonthYear
      }
  }

}
