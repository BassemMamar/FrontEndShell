import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EntryType } from '../../../feature-modules/journey-definition/model/entry-type';

// https://github.com/angular/in-memory-web-api
export class InMemService implements InMemoryDbService {
  createDb() {

    const entryDefinitionOptions = {
      result: [
        { name: 'Proof Of Identity', value: EntryType.ProofOfIdentity },
        { name: 'Proof Of Address', value: EntryType.ProofOfAddress },
        { name: 'Additional Document', value: EntryType.AdditionalDocument },
        { name: 'Selfie', value: EntryType.Selfie }
      ],
      responseMetaData: null
    };

    const CaptureMediaChannels = {
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

    const ProofOfAddress = {
      result: [
        {
          id: '23',
          categoryName: 'Bank Document',
          documentTypes: [
            {
              id: '24',
              categoryName: 'Bank Account Details',
              documentTypes: null
            },
            {
              id: '25',
              categoryName: 'Bank Letter',
              documentTypes: null
            },
            {
              id: '26',
              categoryName: 'Bank Statement',
              documentTypes: null
            },
            {
              id: '27',
              categoryName: 'Card Statement',
              documentTypes: null
            },
            {
              id: '28',
              categoryName: 'Mortgage Statement',
              documentTypes: null
            }
          ]
        },
        {
          id: '29',
          categoryName: 'Bank Letter',
          documentTypes: [
            {
              id: '30',
              categoryName: 'Card Statement',
              documentTypes: null
            },
            {
              id: '31',
              categoryName: 'Bank Statement',
              documentTypes: null
            },
            {
              id: '32',
              categoryName: 'Mortgage Statement',
              documentTypes: null
            }
          ]
        }
      ],
      responseMetaData: null
    };


    const ProofOfIdentity = {
      result: [
        {
          id: '23',
          categoryName: 'Passport',
          documentTypes: [
            {
              id: '24',
              categoryName: 'E-Passport',
              documentTypes: null
            },
            {
              id: '25',
              categoryName: 'National Passport',
              documentTypes: null
            },
            {
              id: '26',
              categoryName: 'Passport',
              documentTypes: null
            },
            {
              id: '27',
              categoryName: 'Travel Document',
              documentTypes: null
            }
          ]
        },
        {
          id: '29',
          categoryName: 'Driving License',
          documentTypes: [
            {
              id: '30',
              categoryName: 'Driving License',
              documentTypes: null
            },
            {
              id: '31',
              categoryName: 'Provisional Driving License',
              documentTypes: null
            }
          ]
        },
        {
          id: '32',
          categoryName: 'National Identification Card',
          documentTypes: [
            {
              id: '33',
              categoryName: 'Proof of Age Card',
              documentTypes: null
            },
            {
              id: '34',
              categoryName: 'Agents License',
              documentTypes: null
            },
            {
              id: '35',
              categoryName: 'Job License',
              documentTypes: null
            },
            {
              id: '36',
              categoryName: 'Membership Identification Card',
              documentTypes: null
            },
            {
              id: '37',
              categoryName: 'Health Card',
              documentTypes: null
            }
          ]
        }
      ],
      responseMetaData: null
    };

    const List = {
      result: [
        {
          journeyDefinitionGroupId: '1',
          lastUpdateDate: new Date(),
          code: 'QWDF44GF',
          name: 'Bank1',
          isActive: true
        },
        {
          journeyDefinitionGroupId: '2',
          lastUpdateDate: new Date(),
          code: 'WLKK34DC',
          name: 'Bank2',
          isActive: false
        }
      ],
      responseMetaData: null
    }
    return {
      List, entryDefinitionOptions, CaptureMediaChannels, Regions, ProofOfAddress, ProofOfIdentity
    };
  }
}
