import { query } from '../index.js';
import { getUser } from './User.js';

export const checkAttendance = async (discordId, reward) => {
  console.log(`📅 출석 체크 시도: ${discordId}`);
  const today = new Date().toISOString().slice(0, 10);

  const user = await getUser(discordId);
  if (!user) return false;

  const attendanceRows = await query(
    'SELECT * FROM attendance WHERE user_id = ? AND date = ?',
    [user.id, today]
  );

  if (attendanceRows.length > 0) {
    console.log("⚠️ 오늘 이미 출석함");
    return false;
  } 

  await query('INSERT INTO attendance (user_id, date, reward) VALUES (?, ?, ?)',
    [user.id, today, reward]
  );

  await query('UPDATE users SET balance = balance + ? WHERE id = ?', [reward, user.id]);

  console.log(`✅ 출석 완료: ${discordId}, 보상: ${reward}`);
  return true;
};
