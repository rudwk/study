require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ 봇이 로그인되었습니다: ${client.user.tag}`);
});

// 메시지 명령어 감지
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  // !서버 명령어
  if (message.content === "!서버") {
    const { name, memberCount } = message.guild;
    const serverEmbed = new EmbedBuilder()
      .setTitle("📊 서버 정보")
      .setColor("Blue")
      .addFields(
        { name: "서버 이름", value: name },
        { name: "멤버 수", value: `${memberCount}명` }
      )
      .setThumbnail(message.guild.iconURL())
      .setTimestamp();

    message.channel.send({ embeds: [serverEmbed] });
  }

  // !내정보 명령어
  if (message.content === "!내정보") {
    const user = message.author;
    const userEmbed = new EmbedBuilder()
      .setTitle("🙋 내 정보 위젯")
      .setColor("Green")
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "이름", value: user.tag },
        { name: "ID", value: user.id }
      )
      .setFooter({ text: "디스코드 위젯 봇" });

    message.channel.send({ embeds: [userEmbed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
