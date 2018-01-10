export const environment = {
  production: false,
  environmentName: 'Spec',
  isDebugMode: true,

  authority: 'http://onboarding-app1:8088/AuthenticationServer',
  api: {
    url: '//localhost:3000',
    bases: {
      onBoarding: '/OnBoarding/',
      businessAccountManagement: '/BusinessAccountManagement/'
    }
  },
  visionCortexBasePath: '',
  exceptionConfiguration: {
    appErrorPrefix: '[Frontend Shell Error] ',
    showInternalServerErrors: true,
    showAppErrors: false
  }
};
