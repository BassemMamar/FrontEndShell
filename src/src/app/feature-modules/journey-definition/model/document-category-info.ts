export class DocumentCategoryInfo {
    categoryName: string;
    documentTypes: DocumentTypeInfo[];
    constructor() {
        this.categoryName = '';
        this.documentTypes = new Array<DocumentTypeInfo>();
    }
}

export class DocumentTypeInfo {
    id: string;
    typeName: string;
    categoryName: string; // father's name
}

// pass to the server eigher:
// categoryName if selected is parent
// id if selected is child


