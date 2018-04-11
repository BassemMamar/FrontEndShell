import { TreeviewEventParser, TreeviewComponent, DownlineTreeviewItem, TreeviewItem } from 'ngx-treeview';
import * as _ from 'lodash';

export class CustomTreeviewEventParser extends TreeviewEventParser {
    getSelectedChange(component: TreeviewComponent): any[] {
        const checkedItems = component.selection.checkedItems;
        if (!_.isNil(checkedItems)) {
            return checkedItems.map(item => item.value);
        }

        return [];
    }
    // getSelectedChange(component: TreeviewComponent): any[] {
    //     const items = component.items;
    //     if (!_.isNil(items)) {
    //         let result: DownlineTreeviewItem[] = [];
    //         items.forEach(item => {
    //             const links = this.getLinks(item, null);
    //             if (!_.isNil(links)) {
    //                 result = result.concat(links);
    //             }
    //         });

    //        //   return result.map(item => item.item.value);
    //            return result;
    //     }

    //     return [];
    // }

    private getLinks(item: TreeviewItem, parent: DownlineTreeviewItem): DownlineTreeviewItem[] {
        let result: DownlineTreeviewItem[] = [];

        if (item.checked) {
            result.push({
                item: item,
                parent: parent
            });
        }

        if (!_.isNil(item.children)) {
            const link = {
                item: item,
                parent: parent
            };
            item.children.forEach(child => {
                const links = this.getLinks(child, link);
                if (!_.isNil(links)) {
                    result = result.concat(links);
                }
            });
        }

        return result;
    }
}
















// import { TreeviewEventParser, TreeviewComponent, DownlineTreeviewItem, TreeviewItem } from 'ngx-treeview';
// import * as _ from 'lodash';

// export class CustomTreeviewEventParser extends TreeviewEventParser {
//     // getSelectedChange(component: TreeviewComponent): any[] {
//     //     const checkedItems = component.selection.checkedItems;
//     //     if (!_.isNil(checkedItems)) {
//     //         return checkedItems.map(item => item.value);
//     //     }

//     //     return [];
//     // }
//     getSelectedChange(component: TreeviewComponent): any[] {
//         const items = component.items;
//         if (!_.isNil(items)) {
//             let result: DownlineTreeviewItem[] = [];
//             items.forEach(item => {
//                 const links = this.getLinks(item, null);
//                 if (!_.isNil(links)) {
//                     result = result.concat(links);
//                 }
//             });

//            //   return result.map(item => item.item.value);
//                return result;
//         }

//         return [];
//     }

//     private getLinks(item: TreeviewItem, parent: DownlineTreeviewItem): DownlineTreeviewItem[] {
//         let result: DownlineTreeviewItem[] = [];

//         if (item.checked) {
//             result.push({
//                 item: item,
//                 parent: parent
//             });
//         }

//         if (!_.isNil(item.children)) {
//             const link = {
//                 item: item,
//                 parent: parent
//             };
//             item.children.forEach(child => {
//                 const links = this.getLinks(child, link);
//                 if (!_.isNil(links)) {
//                     result = result.concat(links);
//                 }
//             });
//         }

//         return result;
//     }
// }
