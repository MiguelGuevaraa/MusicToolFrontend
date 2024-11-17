import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AnswerServiceService } from '../../../services/answer.service.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportetotalencuestas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportetotalencuestas.component.html',
  styleUrl: './reportetotalencuestas.component.css'
})
export class ReportetotalencuestasComponent {
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

  constructor(private aS: AnswerServiceService) {}

  ngOnInit(): void {
    this.aS.getTotal2().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.su);
      this.barChartData = [
        {
          data: data.map((item) => item.total),
          label: 'Cantidad de Encuestas',
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
