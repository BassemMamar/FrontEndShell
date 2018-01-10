export const environment = {
  production: true,
  environmentName: 'Production',
  isDebugMode: false,

  authority: 'https://onboardingsuite.com:8088/AuthenticationServer',
  api: {
    url: '//OnboardingSuite.com',
    bases: {
      onBoarding: ':8082/',
      businessAccountManagement: ':8088/BAM/'
    }
  },
  visionCortexBasePath: '//OnboardingSuite.com:8088',
  exceptionConfiguration: {
    appErrorPrefix: '[Frontend Shell Error] ',
    showInternalServerErrors: true,
    showAppErrors: false
  }
};
