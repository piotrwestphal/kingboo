//// BASIC OPTIONS
const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
const SERVICE_LABEL = process.env.SERVICE_LABEL || 'DC';
export const PORT = parseInt(process.env.PORT, 10) || 8080;
// REMEMBER TO SET 'http://' FOR GC
export const ASKING_FOR_FREE_SEARCH_REQUEST_INTERVALS_SECONDS =
  parseInt(process.env.ASKING_FOR_FREE_SEARCH_REQUEST_INTERVALS_SECONDS, 10) || 30;
export const CLEANING_UP_INTERVAL_MINUTES = parseInt(process.env.CLEANING_UP_INTERVAL_MINUTES, 10) || 5;
// After this threshold an occupancy of search request will be set to 'FREE"
export const EXPIRED_REQUEST_OCCUPANCY_MINUTES = parseInt(process.env.EXPIRED_REQUEST_OCCUPANCY_MINUTES, 10) || 5;
export const EXPIRED_LOCK_SECONDS = parseInt(process.env.EXPIRED_LOCK_SECONDS, 10) || 5;

//// LOG OPTIONS
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const EXPANDED_VIEW_OF_JSON_IN_LOGS = process.env.EXPANDED_VIEW_OF_JSON_IN_LOGS === 'true';
const COLOR_LOGS = process.env.COLOR_LOGS === 'true';

//// SCRAPING OPTIONS
export const SAVE_RESULTS_AS_JSON_AND_TAKE_SCREENSHOTS_ON_ERROR = true; // process.env.SAVE_RESULTS_AS_JSON_AND_TAKE_SCREENSHOTS_ON_ERROR === 'true';

// PUPPETEER OPTIONS
export const PUPPETEER_EXECUTABLE_PATH = process.env.PUPPETEER_EXECUTABLE_PATH || './node_modules/puppeteer/.local-chromium/mac-722234/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
export const PUPPETEER_DEVTOOLS_TURNED_ON = process.env.PUPPETEER_DEVTOOLS_TURNED_ON === 'true';
export const PUPPETEER_HEADLESS_SCRAPING = process.env.PUPPETEER_HEADLESS_SCRAPING === 'true';
export const PUPPETEER_SLOW_MO_MS = parseInt(process.env.PUPPETEER_SLOW_MO_MS, 10) || 0;

console.debug('Start logging with app setup: ', {
  IS_PRODUCTION,
  SERVICE_LABEL,
  PORT,
  ASKING_FOR_FREE_SEARCH_REQUEST_INTERVALS_SECONDS,
  CLEANING_UP_INTERVAL_MINUTES,
  EXPIRED_REQUEST_OCCUPANCY_MINUTES,
  EXPIRED_LOCK_SECONDS,
  LOG_LEVEL,
  EXPANDED_VIEW_OF_JSON_IN_LOGS,
  COLOR_LOGS,
  SAVE_RESULTS_AS_JSON_AND_TAKE_SCREENSHOTS_ON_ERROR,
  PUPPETEER_DEVTOOLS_TURNED_ON,
  PUPPETEER_HEADLESS_SCRAPING,
  PUPPETEER_SLOW_MO_MS,
});

if (IS_PRODUCTION) {
  console.debug('Google cloud setup: ', {
    GAE_APPLICATION: process.env.GAE_APPLICATION, // The ID of your App Engine application.
    GAE_DEPLOYMENT_ID: process.env.GAE_DEPLOYMENT_ID, // The ID of the current deployment.
    GAE_ENV: process.env.GAE_ENV, // The App Engine environment. Set to standard.
    GAE_INSTANCE: process.env.GAE_INSTANCE, // The ID of the instance on which your service is currently running.
    GAE_MEMORY_MB: process.env.GAE_MEMORY_MB, // The amount of memory available to the application process, in MB.
    GAE_RUNTIME: process.env.GAE_RUNTIME, // The runtime specified in your app.yaml file. The value is nodejs8 for Node.js.
    // The service name specified in your app.yaml file. If no service name is specified, it is set to default.
    GAE_SERVICE: process.env.GAE_SERVICE,
    GAE_VERSION: process.env.GAE_VERSION, // The current version label of your service.
    GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT, // The GCP project ID associated with your application.
    NODE_ENV: process.env.NODE_ENV, // Set to production when your service is deployed.
    PORT: process.env.PORT, // The port that receives HTTP requests. Set to 8080.
  });
}
