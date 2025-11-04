import { getUser, createUser } from '../db/models/User.js';
import { checkAttendance } from '../db/models/Attendance.js';

export const data = { name: 'attendance', description: '출석 체크' };

export async function execute(interaction) {
  const discordId = interaction.user.id;

  let user = await getUser(discordId);
  if (!user) {
    await createUser(discordId);
    user = await getUser(discordId);
  }

  const reward = parseInt(process.env.ATTENDANCE_REWARD || 1000);
  const success = await checkAttendance(discordId, reward);

  if (!success) return interaction.reply('오늘은 이미 출석 체크를 했습니다!');
  interaction.reply(`✅ 출석 완료! ${reward}원이 지급되었습니다.`);
}
