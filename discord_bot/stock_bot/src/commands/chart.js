import yahooFinance from 'yahoo-finance2';
import { generateChartImage } from '../utils/chartGenerator.js';
import fs from 'fs';

export const data = {
  name: 'chart',
  description: '특정 주식의 최근 주가 그래프를 표시합니다.',
  options: [
    {
      name: 'symbol',
      type: 3,
      description: '조회할 주식 심볼 (예: AAPL, TSLA)',
      required: true
    }
  ]
};

export async function execute(interaction) {
  const symbol = interaction.options.getString('symbol').toUpperCase();
  console.log(`📈 /chart 명령어 실행: ${symbol}`);

  await interaction.deferReply(); // 그래프 생성은 조금 걸리므로 defer

  const history = await yahooFinance.chart(symbol, { range: '1mo', interval: '1d' });
  const prices = history.quotes.map(q => q.close);
  const dates = history.quotes.map(q => q.date.toISOString().slice(5, 10)); // MM-DD

  const imageBuffer = await generateChartImage(symbol, dates, prices);
  const imagePath = `./chart_${symbol}.png`;

  fs.writeFileSync(imagePath, imageBuffer);
  console.log(`✅ ${symbol} 차트 생성 완료`);

  await interaction.editReply({ content: `${symbol} 최근 1개월 주가 차트`, files: [imagePath] });
  fs.unlinkSync(imagePath); // 전송 후 삭제
}
