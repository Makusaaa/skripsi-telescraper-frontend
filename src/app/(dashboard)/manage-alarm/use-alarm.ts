/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, useAtom } from "jotai"

type Config = {
  selected: any["id"] | null
}

const configAtom = atom<Config>({
  selected: null,
})

export function useAlarm() {
  return useAtom(configAtom)
}