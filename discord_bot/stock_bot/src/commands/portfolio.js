import { getUser } from '../db/models/User.js';
import { query } from '../db/index.js';

export const data = { name: 'portfolio', description: '포트폴리오 확인' };

export async function execute(interaction) {
  const discordId = interaction.user.id;
  const user = await getUser(discordId);
  if (!user) return interaction.reply('유저를 찾을 수 없습니다.');

  const holdings = await query('SELECT * FROM holdings WHERE user_id = ?', [user.id]);
  if (holdings.length === 0) return interaction.reply('보유 주식이 없습니다.');

  let msg = `💰 잔액: ${user.balance}\n📊 보유 주식:\n`;
  holdings.forEach(h => {
    msg += `${h.symbol}: ${h.quantity}주 (평균 ${h.avg_price}원)\n`;
  });

  interaction.reply(msg);
}
