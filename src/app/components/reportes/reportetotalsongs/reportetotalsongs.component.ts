import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PrereleaseSongsService } from '../../../services/prerelease-songs.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportetotalsongs',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportetotalsongs.component.html',
  styleUrl: './reportetotalsongs.component.css'
})
export class ReportetotalsongsComponent {
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

  constructor(private sS: PrereleaseSongsService) {}

  ngOnInit(): void {
    this.sS.getTotal().subscribe((data) => {
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
