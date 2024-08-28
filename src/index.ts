import path from "path";
import dotenv from 'dotenv';

import TwitchClientFactory, {
    ClientType,
    CustomLogMessageFragmentBuilder,
    HandlerType,
    LogBackground,
    LogForeground,
    LogType,
    ManagerType,
  } from "twitch-bot-framework";

dotenv.config();

const clientId = process.env.CLIENT_ID as string;
const clientSecret = process.env.CLIENT_SECRET as string;
const userRefreshToken = process.env.USER_REFRESH_TOKEN as string;
const userId = process.env.USER_ID as string;

const twitch = TwitchClientFactory(
  {
    clientId,
    clientSecret,
    userRefreshToken,
    userId,
    projectPath: path.join(__dirname),
  },
  {
    logger: {
      output: [LogType.Info, LogType.Success, LogType.Warning, LogType.Error],
      modulePrefix: {
        GLOBAL: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`Global =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ClientType.App]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`App =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ClientType.Api]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`Api =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ClientType.Auth]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`Auth =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ClientType.EventSub]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`EventSub =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ClientType.EventSubApi]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`EventSubApi =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ClientType.Twitch]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`Twitch =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [HandlerType.EventSubNotifications]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`EventSubNotifications =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [HandlerType.Commands]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`Commands =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ManagerType.Token]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`Token =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ManagerType.LocalFiles]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`LocalFiles =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
        [ManagerType.APIRequests]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`APIRequests =>`)
              .setStyle(LogBackground.BgCyan)
              .build(),
          ],
        },
      },
      logTypePrefix: {
        [LogType.Info]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`[Info]`)
              .setStyle(LogForeground.FgBlue)
              .build(),
          ],
        },
        [LogType.Success]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`[Success]`)
              .setStyle(LogForeground.FgGreen)
              .build(),
          ],
        },
        [LogType.Warning]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`[Warning]`)
              .setStyle(LogForeground.FgYellow)
              .build(),
          ],
        },
        [LogType.Error]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`[Error]`)
              .setStyle(LogForeground.FgRed)
              .build(),
          ],
        },
        [LogType.Debug]: {
          prefix: [
            new CustomLogMessageFragmentBuilder()
              .setText(`[Debug]`)
              .setStyle(LogForeground.FgMagenta)
              .build(),
          ],
        },
      },
    },
  }
);
