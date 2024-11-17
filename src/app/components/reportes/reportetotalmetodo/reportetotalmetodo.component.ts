import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PagosService } from '../../../services/pagos.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportetotalmetodo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportetotalmetodo.component.html',
  styleUrl: './reportetotalmetodo.component.css'
})
export class ReportetotalmetodoComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS: PagosService) {}

  ngOnInit(): void {
    this.pS.getCantidad1().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.mount);
      this.barChartData = [
        {
          data: data.map((item) => item.total),
          label: 'Metodos de Pago',
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
