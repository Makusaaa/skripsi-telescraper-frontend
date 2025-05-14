import { atom, useAtom } from "jotai"

import { Alarm, alarms } from "./data"

type Config = {
  selected: Alarm["id"] | null
}

const configAtom = atom<Config>({
  selected: alarms[0].id,
})

export function useAlarm() {
  return useAtom(configAtom)
}
