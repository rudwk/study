import { query } from '../index.js';

export const getUser = async (discordId) => {
  console.log(`🔍 유저 조회: ${discordId}`);
  const rows = await query('SELECT * FROM users WHERE discord_id = ?', [discordId]);
  return rows[0];
};

export const createUser = async (discordId) => {
  console.log(`➕ 유저 생성: ${discordId}`);
  await query('INSERT INTO users (discord_id) VALUES (?)', [discordId]);
  return await getUser(discordId);
};

export const updateBalance = async (discordId, newBalance) => {
  console.log(`💰 잔액 업데이트: ${discordId} -> ${newBalance}`);
  await query('UPDATE users SET balance = ? WHERE discord_id = ?', [newBalance, discordId]);
};
