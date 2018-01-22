export class NavMenuItem {
    constructor(title?: string, link?: string, icon?: string, subNav?: NavMenuItem[]) {
        this.title = title || '';
        this.link = link || '';
        this.icon = icon || '';
        this.subNav = subNav || [];
    }
    title: string;
    link: string;
    icon: string;
    subNav: NavMenuItem[];
}
