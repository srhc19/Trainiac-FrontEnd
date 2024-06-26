import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import * as trainerAction from '../../../ngrx/trainers/trainer.action';
import * as userActions from '../../../ngrx/userauth/user.action';
import {
  getSessionData,
  getpaymentData,
} from '../../../ngrx/trainers/trainer.selectors';
import { VideoSession } from '../../../ngrx/trainers/trainer.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReusableDashboardTableComponent } from '../reusable-dashboard-table/reusable-dashboard-table.component';
import {
  geTrainerList,
  getuserdata,
} from '../../../ngrx/userauth/user.selectors';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userdata!: any[];
  trainerData!: any[];
  clientNumber!: number;
  trainerNumber!: number;
  isNavHidden: boolean = true;
  sessionNumber!: number;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  sessiondata!: any[];
  paymentData!: any[];

  constructor(private store: Store, private router: Router) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'line',
        height: 350,
      },
      title: {
        text: 'Video Sessions Per Day',
      },
      xaxis: {
        categories: [],
      },
      dataLabels: {
        enabled: false,
      },
    };
  }
  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }
  ngOnInit(): void {
    this.store.dispatch(trainerAction.getSessionList());
    this.store.select(getSessionData).subscribe((data) => {
      this.sessiondata = data;
      this.sessionNumber = data.length;
      console.log(this.sessiondata);
      this.updateChart(data);
    });
    let skip = 0;
    let limit = 10;
    let role = 'Client';
    this.store.dispatch(userActions.getUserData({ role, skip, limit }));
    this.store.select(getuserdata).subscribe((userdata) => {
      this.userdata = userdata;
      this.clientNumber = userdata.length;
      console.log(userdata, 'userdata');
    });
    this.gettrainerlist();
    this.store.select(geTrainerList).subscribe((trainerList) => {
      this.trainerData = trainerList;
      this.trainerNumber = trainerList.length;
      // this.rating = trainerList.rating;
    });
    this.getpaymentData();
  }
  getpaymentData() {
    let limit = 10;
    let skip = 0;
    this.store.dispatch(trainerAction.getPaymentData({ limit, skip }));
    this.store.select(getpaymentData).subscribe((data) => {
      this.paymentData = data;
    });
  }
  gettrainerlist() {
    let skip = 0;
    let limit = 10;
    this.store.dispatch(userActions.getTrainersList({ skip, limit }));
  }
  updateChart(data: any[]): void {
    if (!data) return;

    const sessionCountPerDay = data.reduce((acc, session) => {
      const date = session.currentDate;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dates = Object.keys(sessionCountPerDay);
    const counts = Object.values(sessionCountPerDay) as number[];

    this.chartOptions.series = [
      {
        name: 'Video Sessions',
        data: counts,
      },
    ];
    this.chartOptions.xaxis = {
      categories: dates,
    };
  }

  trainerslist() {
    this.router.navigate(['/adminTrainerslist']);
  }
  adminBlog() {
    this.router.navigate(['/adminBlog']);
  }
  sessionManagement() {
    this.router.navigate(['/adminVideoCallManagement']);
  }
  Dashboard() {
    this.router.navigate(['/Dashboard']);
  }

  // handleCheckboxChange(_id: any) {
  //   console.log(_id, 'id in client component');
  //   this.store.dispatch(userActions.changeUserStatus({ _id }));
  // }
  adminPaymentData() {
    this.router.navigate(['/adminPaymentData']);
  }
  adminClient() {
    this.router.navigate(['/clients']);
  }
  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
