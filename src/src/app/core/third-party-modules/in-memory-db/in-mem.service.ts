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
    const entryDefinitionOptions = [
      { name: 'Proof Of Identity', value: EntryTypes.ProofOfIdentity },
      { name: 'Proof Of Address', value: EntryTypes.ProofOfAddress },
      { name: 'Additional Document', value: EntryTypes.AdditionalDocument },
      { name: 'Selfie', value: EntryTypes.Selfie }
    ];

    const mediaChannelType = [
      {
        channelType: 'Camera',
        name: 'Webcam'
      },
      {
        channelType: 'FileUpload',
        name: 'File Upload'
      }
    ];

    return { heroes, entryDefinitionOptions, mediaChannelType };
  }
}
