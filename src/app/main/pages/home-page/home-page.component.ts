import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {BsDatepickerDirective} from 'ngx-bootstrap/datepicker';
import {Color} from 'ng2-charts';
import {ContractsService} from '../../services/contracts.service';
import {HomeService} from '../../services/home.service';
import {AdminService} from '../../services/admin.service';
import {Setting} from '../../models/setting.model';
import {ProfileService} from '../../services/profile.service';
import {AlertModel} from '../../models/alert.model';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  alertNotifications: Array<AlertModel>;
  releves;
  contracts;
  minMaxConsumption;
  bills;
  alerts: Array<any> = [];
  // charts
  @ViewChild('barchart')
  barchart: BaseChartDirective;
  advices: Setting;
  maxDate: Date = new Date();
  public chartType = 'bar';
  public chartConsoTitle = 'Volume en m3';
  public chartLabels: Array<any> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Dec'
  ];
  public chartDatasetsEau: Array<any> = [
    {data: [90, 60, 25, 15, 80, 80, 81, 56, 70, 40, 19], label: '2017'},
    {data: [19, 86, 27, 19, 86, 27, 19, 86, 27, 90, 68], label: '2018'}
  ];
  public chartDatasetsFact: Array<any> = [
    {data: [65, 59, 80, 81, 56, 70, 40, 30, 20, 15, 68], label: '2017'},
    {data: [28, 48, 40, 19, 86, 27, 90, 60, 25, 15, 80], label: '2018'}
  ];
  public chartOptionsEau: any = {
    title: {
      display: true,
      text: 'Volume'
    },
    responsive: true
  };
  public chartOptionsFact: any = {
    title: {
      display: true,
      text: 'Facturation en DH'
    },
    responsive: true
  };
  private WaterBar1: Color = {
    backgroundColor: 'rgba(151,187,205, 1)',
    borderWidth: 1,
    borderColor: 'rgba(151,187,205,1)',
    pointBackgroundColor: 'rgba(151,187,205,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(220,220,220,1)'
  };
  private WaterBar2: Color = {
    backgroundColor: 'rgba(180, 228, 250, 1)',
    borderWidth: 1,
    borderColor: 'rgba(180, 228, 250,1)',
    pointBackgroundColor: 'rgba(180, 228, 250,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(151,187,205,1)'
  };
  public chartColorsEau: Array<any> = [this.WaterBar1, this.WaterBar2];
  private ElecBar1: Color = {
    backgroundColor: 'rgba(231, 76, 60, 1)',
    borderWidth: 1,
    borderColor: 'rgba(231, 76, 60, 1)',
    pointBackgroundColor: 'rgba(223,66,42,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(151,187,205,1)'
  };
  private ElecBar2: Color = {
    backgroundColor: 'rgba(255, 140, 124, 1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 124, 1)',
    pointBackgroundColor: 'rgba(229,103,84,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(151,187,205,1)'
  };
  private FactBar1: Color = {
    backgroundColor: 'rgba(102,205,170, 1)',
    borderWidth: 1,
    borderColor: 'rgba(102,205,170, 1)',
    pointBackgroundColor: 'rgba(231, 76, 60,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(231, 76, 60, 1)'
  };
  private FactBar2: Color = {
    backgroundColor: 'rgba(163,225,204, 1)',
    borderWidth: 1,
    borderColor: 'rgba(163,225,204, 1)',
    pointBackgroundColor: 'rgba(151,187,205,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(151,187,205,1)'
  };
  public chartColorsFact: Array<any> = [this.FactBar1, this.FactBar2];


  constructor(
    private contractServices: ContractsService,
    private adminServices: AdminService,
    private profileService: ProfileService,
    private homeService: HomeService
  ) {
  }

  public chartOptions(title) {
    this.chartOptionsFact.title = title;
  }

  changeContract(val) {
    this.chartColorsEau = [];
    console.log(this.chartColorsEau);
    switch (val.currentTarget.value) {
      case '1':
        this.chartConsoTitle = 'Volume en m3';
        this.chartDatasetsFact = [
          {data: [65, 59, 80, 81, 56, 70, 40, 30, 20, 15, 68], label: '2017'},
          {data: [28, 48, 40, 19, 86, 27, 90, 60, 25, 15, 80], label: '2018'}
        ];
        this.chartDatasetsEau = [
          {
            data: [90, 60, 25, 15, 80, 80, 81, 56, 70, 40, 19],
            label: '2017',
            backgroundColor: this.WaterBar1.backgroundColor
          },
          {
            data: [19, 86, 27, 19, 86, 27, 19, 86, 27, 90, 68],
            label: '2018',
            backgroundColor: this.WaterBar2.backgroundColor
          }
        ];
        this.barchart.chart.update();
        break;
      case '2':
        this.chartConsoTitle = 'Volume en kWh';
        this.chartDatasetsFact = [
          {data: [28, 48, 40, 19, 86, 27, 19, 86, 27, 90, 68], label: '2017'},
          {data: [86, 27, 19, 86, 27, 40, 19, 86, 27, 19, 80], label: '2018'}
        ];
        this.chartDatasetsEau = [
          {
            data: [65, 59, 80, 81, 56, 70, 40, 30, 20, 15, 68],
            label: '2017',
            backgroundColor: this.ElecBar1.backgroundColor
          },
          {
            data: [28, 48, 40, 19, 86, 27, 90, 60, 25, 15, 80],
            label: '2018',
            backgroundColor: this.ElecBar2.backgroundColor
          }
        ];
        this.barchart.chart.update();
        break;
      case '3':
        this.chartConsoTitle = 'Volume en m3';
        this.chartDatasetsFact = [
          {data: [90, 60, 25, 15, 80, 80, 81, 56, 70, 40, 19], label: '2017'},
          {data: [19, 86, 27, 19, 86, 27, 19, 86, 27, 90, 68], label: '2018'}
        ];
        this.chartDatasetsEau = [
          {
            data: [28, 48, 40, 19, 86, 27, 19, 86, 27, 90, 68],
            label: '2017',
            backgroundColor: this.WaterBar1.backgroundColor
          },
          {
            data: [86, 27, 19, 86, 27, 40, 19, 86, 27, 19, 80],
            label: '2018',
            backgroundColor: this.WaterBar2.backgroundColor
          }
        ];
        this.barchart.chart.update();
        break;
    }
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
  }

  applyTheme() {
    // create new object on each property change
    // so Angular can catch object reference change
  }

  ngOnInit() {
    this.profileService.getAlertNotifications().subscribe(
      response => {
        this.alertNotifications = response.data;
      },
      err => {
        console.log(err);
      }
    );

    this.adminServices.getAdvices().subscribe(
      response => {
        this.advices = response.data;
      },
      err => {
        console.log(err);
      }
    );
    this.contractServices
      .getReleves()
      .subscribe(response => (this.releves = response), err => {
      });
    this.contractServices.getContracts().subscribe(
      response => {
        this.contracts = response;
      },
      err => {
      }
    );
    this.contractServices
      .getAllBills()
      .subscribe(Response => (this.bills = Response), err => {
      });
  }

  changeMinMaxContract(event) {
    console.log(event);
    this.contractServices
      .getMinMaxConsumption(event)
      .subscribe(response => (this.minMaxConsumption = response[0]), err => {
      });
  }
}
