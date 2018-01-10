// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  environmentName: 'Development',
  isDebugMode: true,

  authority: 'http://localhost:4000',
  api: {
    url: '//localhost',
    bases: {
      onBoarding: '/OnBoarding/',
      businessAccountManagement: '/BusinessAccountManagement/'
    }
  },
  visionCortexBasePath: '//localhost/VisionCortex/',
  exceptionConfiguration: {
    appErrorPrefix: '[Frontend Shell Error] ',
    showInternalServerErrors: true,
    showAppErrors: false
  }
};

/*
 * Notes:
 *  apiUrl: should be without slash and without port.
 *  visionCortexBasePath: used just for journeyCaptureJs configurations.
 *  showInternalServerErrors: show response error when server response status is 500.
 *  showAppErrors: show exceptions fired by angular core framework.
 *  bases.onBoarding: It could be ':8088/IEOS/' OR '/IEOS/' .
 *  bases.businessAccountManagement: It could be ':8088/BAM/' OR '/BAM/' .
 *  api.url: Don't put http or https.
 */
