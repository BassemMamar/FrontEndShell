export const environment = {
  production: true,
  environmentName: '',
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


// this is for me (bassem) when try to test production build
// export const environment = {
//   production: true,
//   environmentName: 'Production',
//   isDebugMode: true,

//   authority: 'http://localhost:4000',
//   api: {
//     url: '//localhost',
//     bases: {
//       onBoarding: '/OnBoarding/',
//       businessAccountManagement: '/BusinessAccountManagement/'
//     }
//   },
//   visionCortexBasePath: '//localhost/VisionCortex/'
// };
