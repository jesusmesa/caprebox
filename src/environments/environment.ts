// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { SocketIoConfig } from 'ngx-socket-io';

// The list of file replacements can be found in `angular.json`.
const config: SocketIoConfig = { url: 'http://192.168.42.214:3000', options: {} };

export const environment = {
  production: false,
  //apiUrl:"http://192.168.2.142:3000",
  apiUrl:"http://192.168.42.214:3000",
  socketConfig: config
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
