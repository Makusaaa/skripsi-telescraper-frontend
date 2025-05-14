export const alarms = [
  {
    alarmid: 14,
    companyid: 3,
    status: 0,
    assignto: null,
    channelname: "BotTeleScrapySkipsiTest",
    channeluserid: "skripsiscrapyku",
    filename: "@cloudxurl (406).txt",
    messageid: 203,
    text: "Found leaked credentials on channel https://t.me/skripsiscrapyku/203",
    discoverydate: "2025-05-12T09:00:00",
    notes: "",

    read: true,
  },
  {
    alarmid: 15,
    companyid: 4,
    status: 0,
    assignto: null,
    channelname: "BotTeleScrapySkipsiTest",
    channeluserid: "skripsiscrapyku",
    filename: "dummy123.txt",
    messageid: 203,
    text: "Found leaked credentials on channel https://t.me/skripsiscrapyku/203",
    discoverydate: "2025-05-14T13:50:18",
    notes: "",

    read: false,
  },
]

export type Alarm = (typeof alarms)[number]