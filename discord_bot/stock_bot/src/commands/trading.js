import { getUser, updateBalance } from '../db/models/User.js';
import { query } from '../db/index.js';

export const data = { name: 'buy', description: '주식 구매' };

export async function execute(interaction) {
  const discordId = interaction.user.id;
  const symbol = interaction.options.getString('symbol');
  const quantity = interaction.options.getInteger('quantity');
  const price = Math.floor(Math.random() * 1000) + 100; // 임시 가격

  let user = await getUser(discordId);
  if (!user) return interaction.reply('유저를 찾을 수 없습니다.');

  const totalCost = price * quantity;
  if (user.balance < totalCost) return interaction.reply('잔액이 부족합니다.');

  await updateBalance(discordId, user.balance - totalCost);

  // holdings & transactions 처리
  const existing = await query('SELECT * FROM holdings WHERE user_id = ? AND symbol = ?', [user.id, symbol]);
  if (existing.length > 0) {
    const holding = existing[0];
    const newQty = holding.quantity + quantity;
    const newAvg = ((holding.avg_price * holding.quantity) + totalCost) / newQty;
    await query('UPDATE holdings SET quantity = ?, avg_price = ? WHERE id = ?', [newQty, newAvg, holding.id]);
  } else {
    await query('INSERT INTO holdings (user_id, symbol, quantity, avg_price) VALUES (?, ?, ?, ?)',
      [user.id, symbol, quantity, price]);
  }

  await query('INSERT INTO transactions (user_id, symbol, type, price, quantity) VALUES (?, ?, ?, ?, ?)',
    [user.id, symbol, 'BUY', price, quantity]);

  interaction.reply(`✅ ${symbol} ${quantity}주 구매 완료!`);
}
