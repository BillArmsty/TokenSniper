import { Telegraf } from "telegraf";
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx: any) => {
  ctx.reply(
    "Welcome, You account is successfully setup and is ready to receive notifications  ..."
  );
});

bot.hears("id", (ctx: { [x: string]: any; reply: (arg0: string) => any }) =>
  ctx.reply(`chat id ${ctx.message.chat.id}`)
);
const sendNotification = async (message: any) => {
  console.log("\n\n Sending telegram notification ...");

  bot.telegram
    .sendMessage("884205932", message, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    })
    .catch((error: any) => {
      console.log(
        "\n\n Encountered an error while sending notification to the bot "
      );
      console.log("==============================");
      console.log(error);
    });

  console.log("Done");
};

bot.launch();
export { sendNotification };
