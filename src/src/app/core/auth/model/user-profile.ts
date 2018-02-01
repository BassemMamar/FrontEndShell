export const UserRoles = [
    /*Scanning User */
    'scanninguser',
    /* Investigator User */
    'investigator',
    /*Business Administrator User */
    'businessadmin',
    /*Business Account Manager User */
    'businessaccountmanager'
];



export class UserProfile {

    displayName: string;
    username: string;
    email: string;
    id_token: string;
    access_token: string;
    roles: string[];
    authClient: string;

    constructor() { }

    reset() {
        this.displayName = '';
        this.username = '';
        this.email = '';
        this.id_token = '';
        this.access_token = '';
        this.authClient = '';
        this.roles = [];
    }
}
