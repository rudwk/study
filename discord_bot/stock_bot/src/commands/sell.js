import { getUser } from '../db/models/User.js';
import { query } from '../db/index.js';
import yahooFinance from 'yahoo-finance2';

export const data = {
  name: 'sell',
  description: '보유한 주식을 판매합니다.',
  options: [
    {
      name: 'symbol',
      type: 3,
      description: '판매할 주식 심볼 (예: AAPL, TSLA)',
      required: true
    },
    {
      name: 'quantity',
      type: 4,
      description: '판매할 수량',
      required: true
    }
  ]
};

export async function execute(interaction) {
  const discordId = interaction.user.id;
  const symbol = interaction.options.getString('symbol').toUpperCase();
  const quantity = interaction.options.getInteger('quantity');

  console.log(`💬 /sell 명령어 실행: ${discordId}, ${symbol}, 수량 ${quantity}`);

  const user = await getUser(discordId);
  if (!user) return interaction.reply('❌ 유저 정보가 없습니다. 먼저 출석체크를 해주세요.');

  const holdings = await query('SELECT * FROM holdings WHERE user_id = ? AND symbol = ?', [user.id, symbol]);
  if (holdings.length === 0) return interaction.reply('❌ 해당 종목을 보유하고 있지 않습니다.');

  const holding = holdings[0];
  if (holding.quantity < quantity) return interaction.reply('❌ 보유 수량보다 많이 팔 수 없습니다.');

  const quote = await yahooFinance.quote(symbol);
  const currentPrice = quote.regularMarketPrice;

  const totalGain = currentPrice * quantity;
  console.log(`📈 ${symbol} 현재가: ${currentPrice}, 총 매도 금액: ${totalGain}`);

  await query('UPDATE users SET balance = balance + ? WHERE id = ?', [totalGain, user.id]);
  const newQuantity = holding.quantity - quantity;

  if (newQuantity === 0)
    await query('DELETE FROM holdings WHERE id = ?', [holding.id]);
  else
    await query('UPDATE holdings SET quantity = ?, avg_price = ? WHERE id = ?', [newQuantity, holding.avg_price, holding.id]);

  await query(
    'INSERT INTO transactions (user_id, symbol, type, price, quantity) VALUES (?, ?, ?, ?, ?)',
    [user.id, symbol, 'SELL', currentPrice, quantity]
  );

  interaction.reply(`✅ ${symbol} ${quantity}주를 ${currentPrice}달러에 판매했습니다! (+${totalGain.toFixed(2)}원)`);
}
