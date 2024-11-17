import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { PrereleaseSongsService } from '../../../services/prerelease-songs.service';

Chart.register(...registerables);
@Component({
  selector: 'app-reportetotalcanciones',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportetotalcanciones.component.html',
  styleUrl: './reportetotalcanciones.component.css'
})
export class ReportetotalcancionesComponent {
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

  constructor(private pS: PrereleaseSongsService) {}

  ngOnInit(): void {
    this.pS.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.genre);
      this.barChartData = [
        {
          data: data.map((item) => item.totalSongs),
          label: 'Cantidad de Canciones',
          backgroundColor: [
            '#70bfb5', // Navy
            
          ],
          borderColor: 'rgba(112, 191, 147)',
          borderWidth: 5,
        },
      ];
    });
  }
}
