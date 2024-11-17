import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AnswerServiceService } from '../../../services/answer.service.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportetotalrespuestas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportetotalrespuestas.component.html',
  styleUrl: './reportetotalrespuestas.component.css'
})
export class ReportetotalrespuestasComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private aS: AnswerServiceService) {}

  ngOnInit(): void {
    this.aS.getTotal1().subscribe((data) => {
      this.barChartData = [
        {
          data: data.map((item) => item.total),
          label: 'Cantidad de Respuests',
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
