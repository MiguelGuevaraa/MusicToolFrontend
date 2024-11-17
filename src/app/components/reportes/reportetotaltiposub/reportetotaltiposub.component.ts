import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-reportetotaltiposub',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportetotaltiposub.component.html',
  styleUrl: './reportetotaltiposub.component.css'
})
export class ReportetotaltiposubComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS: PagosService) {}

  ngOnInit(): void {
    this.pS.getCantidad2().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.subs);
      this.barChartData = [
        {
          data: data.map((item) => item.totalSubs),
          label: 'Cantidad de Subs',
          backgroundColor: [
            '#29c694', // Navy
            '#099c6e', // Dark Blue
            '#abf0db', // Medium Blue
            
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
