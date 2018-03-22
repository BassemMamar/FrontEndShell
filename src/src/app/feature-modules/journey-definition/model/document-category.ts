export class DocumentCategory {
    id: string;
    friendlyName: string;
    subCategories: DocumentCategory[];
    constructor() {
        this.id = '';
        this.friendlyName = '';
        this.subCategories = new Array<DocumentCategory>();
    }
}

