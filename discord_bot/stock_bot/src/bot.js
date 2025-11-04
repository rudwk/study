import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';

import { initDB } from './db/index.js';
import * as attendance from './commands/attendance.js';
import * as trading from './commands/trading.js';
import * as portfolio from './commands/portfolio.js';


(async () => {
  await initDB();

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  // 슬래시 명령어 등록
  const commands = [
    new SlashCommandBuilder().setName("attendance").setDescription("출석체크"),
    new SlashCommandBuilder().setName("buy").setDescription("주식 매수")
      .addStringOption(o => o.setName("symbol").setDescription("주식명").setRequired(true))
      .addIntegerOption(o => o.setName("quantity").setDescription("수량").setRequired(true)),
    new SlashCommandBuilder().setName("sell").setDescription("주식 매도")
      .addStringOption(o => o.setName("symbol").setDescription("주식명").setRequired(true))
      .addIntegerOption(o => o.setName("quantity").setDescription("수량").setRequired(true)),
    new SlashCommandBuilder().setName("portfolio").setDescription("내 포트폴리오 보기"),
    new SlashCommandBuilder().setName("leaderboard").setDescription("상위 유저 보기"),
  ].map(c => c.toJSON());

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

  client.on("ready", () => console.log(`✅ Logged in as ${client.user.tag}`));

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const name = interaction.commandName;
    if (name === 'buy') await trading.execute(interaction);
    if (name === 'attendance') await attendance.execute(interaction);
    if (name === 'portfolio') await portfolio.execute(interaction);
  });

  client.login(process.env.DISCORD_TOKEN);
})();
