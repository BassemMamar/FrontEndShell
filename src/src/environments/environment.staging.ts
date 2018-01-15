export const environment = {
  production: false,
  environmentName: 'Staging',
  isDebugMode: true,

  authority: 'https://onboardingsuite.com:8088/AuthenticationServer',
  api: {
    url: '//OnboardingSuite.com',
    bases: {
      onBoarding: ':8082/',
      businessAccountManagement: ':8088/BAM/'
    }
  },
  visionCortexBasePath: '//OnboardingSuite.com:8088'
};
