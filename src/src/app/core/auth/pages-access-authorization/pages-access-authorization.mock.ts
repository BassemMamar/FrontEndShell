import { FrontendShell } from './app-pages-declaration/app-pages-declaration';
import { UserRole, AccessLevel } from '../model/user-roles.enum';

export const pagesAccessAuthorizationInfo = [
    // BusinessAccountManagement module
    {
        name: FrontendShell.BusinessAccountManagement.Name,
        rolesAccess: [
            { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.BusinessAccountManagement.Pages.ListBusiness,
                rolesAccess: [
                    { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess },
                   // { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.ReadOnly }
                ]
            },
            {
                name: FrontendShell.BusinessAccountManagement.Pages.EditBusiness,
                rolesAccess: [
                    { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess },
                   // { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.ReadOnly }
                ]
            }
        ]
    },

    // Investigation module
    {
        name: FrontendShell.InvestigationStudio.Name,
        rolesAccess: [
            { role: UserRole.Investigator, accessLevel: AccessLevel.FullAccess },
            { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.InvestigationStudio.Pages.RecentJourneys,
                rolesAccess: [
                    { role: UserRole.Investigator, accessLevel: AccessLevel.ReadOnly },
                    { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
                ]
            }
        ]
    },

    // CaptureStudio module
    {
        name: FrontendShell.CaptureStudio.Name,
        rolesAccess: [
            { role: UserRole.ScanningUser, accessLevel: AccessLevel.FullAccess },
            { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
        ],
        pages: []
    },

    // JourneyDefinition module
    {
        name: FrontendShell.JourneyDefinition.Name,
        rolesAccess: [
            { role: UserRole.BusinessAdmin, accessLevel: AccessLevel.FullAccess }
        ],
        pages: []
    }

];
