import { BrowserConnectOptions, BrowserLaunchArgumentOptions, LaunchOptions } from 'puppeteer'

export type PuppeteerLaunchOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions
