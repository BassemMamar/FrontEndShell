export class DocumentCategory {
    level: string;
    friendlyName: string;
    subCategories: DocumentCategory[];
    constructor() {
        this.level = '';
        this.friendlyName = '';
        this.subCategories = new Array<DocumentCategory>();
    }
}

