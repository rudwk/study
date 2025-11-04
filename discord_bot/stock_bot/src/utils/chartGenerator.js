import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 800;
const height = 400;

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

export async function generateChartImage(symbol, labels, data) {
  console.log(`📊 차트 생성 중: ${symbol}`);
  const config = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `${symbol} 주가`,
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.2,
          fill: false
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        title: { display: true, text: `${symbol} 최근 1개월 주가 변동`, font: { size: 20 } }
      },
      scales: {
        x: { title: { display: true, text: '날짜' } },
        y: { title: { display: true, text: '가격 ($)' } }
      }
    }
  };

  return await chartJSNodeCanvas.renderToBuffer(config);
}
