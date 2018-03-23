import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EntryTypes } from '../../../feature-modules/journey-definition/model/entry-types';

// https://github.com/angular/in-memory-web-api
export class InMemService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Windstorm' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
    ];
    const entryDefinitionOptions = {
      result: [
        { name: 'Proof Of Identity', value: EntryTypes.ProofOfIdentity },
        { name: 'Proof Of Address', value: EntryTypes.ProofOfAddress },
        { name: 'Additional Document', value: EntryTypes.AdditionalDocument },
        { name: 'Selfie', value: EntryTypes.Selfie }
      ],
      responseMetaData: null
    };

    const SupportedCaptureMediaChannels = {
      result: [
        {
          channelType: 'Camera',
          name: 'Webcam'
        },
        {
          channelType: 'FileUpload',
          name: 'File Upload'
        }
      ],
      responseMetaData: null
    };

    const Regions = {
      result: [
        {
          id: '1',
          name: 'Reg 1',
          countries: [
            {
              code: 'AF',
              name: 'Afghanistan',
            },
            {
              code: 'PL',
              name: 'Poland',
            },
            {
              code: 'SA',
              name: 'Saudi Arabia',
            }
          ]
        },
        {
          id: '2',
          name: 'Reg 2',
          countries: [
            {
              code: 'RO',
              name: 'Romania',
            },
            {
              code: 'SE',
              name: 'Sweden',
            },
            {
              code: 'AE',
              name: 'United Arab Emirates',
            }
          ]
        }
      ],
      responseMetaData: null
    };

    const POACategory = {
      result: [
        {
          id: '23',
          friendlyName: 'Bank Document',
          subCategories: [
            {
              id: '24',
              friendlyName: 'Bank Account Details',
              subCategories: null
            },
            {
              id: '25',
              friendlyName: 'Bank Letter',
              subCategories: null
            },
            {
              id: '26',
              friendlyName: 'Bank Statement',
              subCategories: null
            },
            {
              id: '27',
              friendlyName: 'Card Statement',
              subCategories: null
            },
            {
              id: '28',
              friendlyName: 'Mortgage Statement',
              subCategories: null
            }
          ]
        },
        {
          id: '29',
          friendlyName: 'Bank Letter',
          subCategories: [
            {
              id: '30',
              friendlyName: 'Card Statement',
              subCategories: null
            },
            {
              id: '31',
              friendlyName: 'Bank Statement',
              subCategories: null
            },
            {
              id: '32',
              friendlyName: 'Mortgage Statement',
              subCategories: null
            }
          ]
        }
      ],
      responseMetaData: null
    };

    const POICategory = {
      result: [
        {
          id: '23',
          friendlyName: 'Passport',
          subCategories: [
            {
              id: '24',
              friendlyName: 'E-Passport',
              subCategories: null
            },
            {
              id: '25',
              friendlyName: 'National Passport',
              subCategories: null
            },
            {
              id: '26',
              friendlyName: 'Passport',
              subCategories: null
            },
            {
              id: '27',
              friendlyName: 'Travel Document',
              subCategories: null
            }
          ]
        },
        {
          id: '29',
          friendlyName: 'Driving License',
          subCategories: [
            {
              id: '30',
              friendlyName: 'Driving License',
              subCategories: null
            },
            {
              id: '31',
              friendlyName: 'Provisional Driving License',
              subCategories: null
            }
          ]
        },
        {
          id: '32',
          friendlyName: 'National Identification Card',
          subCategories: [
            {
              id: '33',
              friendlyName: 'Proof of Age Card',
              subCategories: null
            },
            {
              id: '34',
              friendlyName: 'Agents License',
              subCategories: null
            },
            {
              id: '35',
              friendlyName: 'Job License',
              subCategories: null
            },
            {
              id: '36',
              friendlyName: 'Membership Identification Card',
              subCategories: null
            },
            {
              id: '37',
              friendlyName: 'Health Card',
              subCategories: null
            }
          ]
        }
      ],
      responseMetaData: null
    };


    return { heroes, entryDefinitionOptions, SupportedCaptureMediaChannels, Regions, POACategory, POICategory };
  }
}
