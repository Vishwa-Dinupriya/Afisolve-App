// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,

  project_manager_api_url: 'http://localhost:3000/projectManager',
  ceo_api_url: 'http://localhost:3000/ceo',

  adminApiUrl: 'http://localhost:3000/admin',
  customerApiUrl: 'http://localhost:3000/customer',
  homeApiUrl: 'http://localhost:3000/home',

  accountCoordinatorApiUrl: 'http://localhost:3000/accountCoordinator',
  developerApiUrl: 'http://localhost:3000/developer'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
