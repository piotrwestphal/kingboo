// fix for differences in setting an env variable in app engine and in github actions
export const parsePemKey = (rawPemKey: string) => rawPemKey.replace(/\\+n/g, '\n')
