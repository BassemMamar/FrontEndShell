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
          documentCategoryType: 'POACategory',
          friendlyName: 'Bank Document',
          subCategories: [
            {
              id: '24',
              documentCategoryType: 'POACategory',
              friendlyName: 'Bank Account Details',
              subCategories: null
            },
            {
              id: '25',
              documentCategoryType: 'POACategory',
              friendlyName: 'Bank Letter',
              subCategories: null
            },
            {
              id: '26',
              documentCategoryType: 'POACategory',
              friendlyName: 'Bank Statement',
              subCategories: null
            },
            {
              id: '27',
              documentCategoryType: 'POACategory',
              friendlyName: 'Card Statement',
              subCategories: null
            },
            {
              id: '28',
              documentCategoryType: 'POACategory',
              friendlyName: 'Mortgage Statement',
              subCategories: null
            }
          ]
        },
        {
          id: '29',
          documentCategoryType: 'POACategory',
          friendlyName: 'Bank Letter',
          subCategories: [
            {
              id: '30',
              documentCategoryType: 'POACategory',
              friendlyName: 'Card Statement',
              subCategories: null
            },
            {
              id: '31',
              documentCategoryType: 'POACategory',
              friendlyName: 'Bank Statement',
              subCategories: null
            },
            {
              id: '32',
              documentCategoryType: 'POACategory',
              friendlyName: 'Mortgage Statement',
              subCategories: null
            }
          ]
        }
      ],
      responseMetaData: null
    };


    return { heroes, entryDefinitionOptions, SupportedCaptureMediaChannels, Regions, POACategory };
  }
}
