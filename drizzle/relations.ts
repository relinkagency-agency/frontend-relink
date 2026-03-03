import { relations } from "drizzle-orm/relations";
import { adminUsers, files, uploadFolders, i18NLocale, strapiReleases, strapiReleaseActions, strapiWorkflows, strapiWorkflowsStages, upPermissions, upRoles, upUsers, abouts, aboutsCmps, articles, articlesCmps, authors, categories, globals, globalsCmps, homepages, homepagesCmps, adminPermissions, adminRoles, strapiApiTokens, strapiApiTokenPermissions, strapiTransferTokens, strapiTransferTokenPermissions, strapiSessions, strapiHistoryVersions, filesRelatedMph, filesFolderLnk, uploadFoldersParentLnk, strapiReleaseActionsReleaseLnk, strapiWorkflowsStageRequiredToPublishLnk, strapiWorkflowsStagesWorkflowLnk, strapiWorkflowsStagesPermissionsLnk, upPermissionsRoleLnk, upUsersRoleLnk, articlesAuthorLnk, articlesCategoryLnk, adminPermissionsRoleLnk, adminUsersRolesLnk, strapiApiTokenPermissionsTokenLnk, strapiTransferTokenPermissionsTokenLnk, services, projects, projectsServicesLnk, projectsCmps, contacts } from "./schema";

export const adminUsersRelations = relations(adminUsers, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [adminUsers.createdById],
		references: [adminUsers.id],
		relationName: "adminUsers_createdById_adminUsers_id"
	}),
	adminUsers_createdById: many(adminUsers, {
		relationName: "adminUsers_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [adminUsers.updatedById],
		references: [adminUsers.id],
		relationName: "adminUsers_updatedById_adminUsers_id"
	}),
	adminUsers_updatedById: many(adminUsers, {
		relationName: "adminUsers_updatedById_adminUsers_id"
	}),
	files_createdById: many(files, {
		relationName: "files_createdById_adminUsers_id"
	}),
	files_updatedById: many(files, {
		relationName: "files_updatedById_adminUsers_id"
	}),
	uploadFolders_createdById: many(uploadFolders, {
		relationName: "uploadFolders_createdById_adminUsers_id"
	}),
	uploadFolders_updatedById: many(uploadFolders, {
		relationName: "uploadFolders_updatedById_adminUsers_id"
	}),
	i18NLocales_createdById: many(i18NLocale, {
		relationName: "i18NLocale_createdById_adminUsers_id"
	}),
	i18NLocales_updatedById: many(i18NLocale, {
		relationName: "i18NLocale_updatedById_adminUsers_id"
	}),
	strapiReleases_createdById: many(strapiReleases, {
		relationName: "strapiReleases_createdById_adminUsers_id"
	}),
	strapiReleases_updatedById: many(strapiReleases, {
		relationName: "strapiReleases_updatedById_adminUsers_id"
	}),
	strapiReleaseActions_createdById: many(strapiReleaseActions, {
		relationName: "strapiReleaseActions_createdById_adminUsers_id"
	}),
	strapiReleaseActions_updatedById: many(strapiReleaseActions, {
		relationName: "strapiReleaseActions_updatedById_adminUsers_id"
	}),
	strapiWorkflows_createdById: many(strapiWorkflows, {
		relationName: "strapiWorkflows_createdById_adminUsers_id"
	}),
	strapiWorkflows_updatedById: many(strapiWorkflows, {
		relationName: "strapiWorkflows_updatedById_adminUsers_id"
	}),
	strapiWorkflowsStages_createdById: many(strapiWorkflowsStages, {
		relationName: "strapiWorkflowsStages_createdById_adminUsers_id"
	}),
	strapiWorkflowsStages_updatedById: many(strapiWorkflowsStages, {
		relationName: "strapiWorkflowsStages_updatedById_adminUsers_id"
	}),
	upPermissions_createdById: many(upPermissions, {
		relationName: "upPermissions_createdById_adminUsers_id"
	}),
	upPermissions_updatedById: many(upPermissions, {
		relationName: "upPermissions_updatedById_adminUsers_id"
	}),
	upRoles_createdById: many(upRoles, {
		relationName: "upRoles_createdById_adminUsers_id"
	}),
	upRoles_updatedById: many(upRoles, {
		relationName: "upRoles_updatedById_adminUsers_id"
	}),
	upUsers_createdById: many(upUsers, {
		relationName: "upUsers_createdById_adminUsers_id"
	}),
	upUsers_updatedById: many(upUsers, {
		relationName: "upUsers_updatedById_adminUsers_id"
	}),
	abouts_createdById: many(abouts, {
		relationName: "abouts_createdById_adminUsers_id"
	}),
	abouts_updatedById: many(abouts, {
		relationName: "abouts_updatedById_adminUsers_id"
	}),
	articles_createdById: many(articles, {
		relationName: "articles_createdById_adminUsers_id"
	}),
	articles_updatedById: many(articles, {
		relationName: "articles_updatedById_adminUsers_id"
	}),
	authors_createdById: many(authors, {
		relationName: "authors_createdById_adminUsers_id"
	}),
	authors_updatedById: many(authors, {
		relationName: "authors_updatedById_adminUsers_id"
	}),
	categories_createdById: many(categories, {
		relationName: "categories_createdById_adminUsers_id"
	}),
	categories_updatedById: many(categories, {
		relationName: "categories_updatedById_adminUsers_id"
	}),
	globals_createdById: many(globals, {
		relationName: "globals_createdById_adminUsers_id"
	}),
	globals_updatedById: many(globals, {
		relationName: "globals_updatedById_adminUsers_id"
	}),
	homepages_createdById: many(homepages, {
		relationName: "homepages_createdById_adminUsers_id"
	}),
	homepages_updatedById: many(homepages, {
		relationName: "homepages_updatedById_adminUsers_id"
	}),
	adminPermissions_createdById: many(adminPermissions, {
		relationName: "adminPermissions_createdById_adminUsers_id"
	}),
	adminPermissions_updatedById: many(adminPermissions, {
		relationName: "adminPermissions_updatedById_adminUsers_id"
	}),
	adminRoles_createdById: many(adminRoles, {
		relationName: "adminRoles_createdById_adminUsers_id"
	}),
	adminRoles_updatedById: many(adminRoles, {
		relationName: "adminRoles_updatedById_adminUsers_id"
	}),
	strapiApiTokens_createdById: many(strapiApiTokens, {
		relationName: "strapiApiTokens_createdById_adminUsers_id"
	}),
	strapiApiTokens_updatedById: many(strapiApiTokens, {
		relationName: "strapiApiTokens_updatedById_adminUsers_id"
	}),
	strapiApiTokenPermissions_createdById: many(strapiApiTokenPermissions, {
		relationName: "strapiApiTokenPermissions_createdById_adminUsers_id"
	}),
	strapiApiTokenPermissions_updatedById: many(strapiApiTokenPermissions, {
		relationName: "strapiApiTokenPermissions_updatedById_adminUsers_id"
	}),
	strapiTransferTokens_createdById: many(strapiTransferTokens, {
		relationName: "strapiTransferTokens_createdById_adminUsers_id"
	}),
	strapiTransferTokens_updatedById: many(strapiTransferTokens, {
		relationName: "strapiTransferTokens_updatedById_adminUsers_id"
	}),
	strapiTransferTokenPermissions_createdById: many(strapiTransferTokenPermissions, {
		relationName: "strapiTransferTokenPermissions_createdById_adminUsers_id"
	}),
	strapiTransferTokenPermissions_updatedById: many(strapiTransferTokenPermissions, {
		relationName: "strapiTransferTokenPermissions_updatedById_adminUsers_id"
	}),
	strapiSessions_createdById: many(strapiSessions, {
		relationName: "strapiSessions_createdById_adminUsers_id"
	}),
	strapiSessions_updatedById: many(strapiSessions, {
		relationName: "strapiSessions_updatedById_adminUsers_id"
	}),
	strapiHistoryVersions: many(strapiHistoryVersions),
	adminUsersRolesLnks: many(adminUsersRolesLnk),
	services_createdById: many(services, {
		relationName: "services_createdById_adminUsers_id"
	}),
	services_updatedById: many(services, {
		relationName: "services_updatedById_adminUsers_id"
	}),
	contacts_createdById: many(contacts, {
		relationName: "contacts_createdById_adminUsers_id"
	}),
	contacts_updatedById: many(contacts, {
		relationName: "contacts_updatedById_adminUsers_id"
	}),
	projects_createdById: many(projects, {
		relationName: "projects_createdById_adminUsers_id"
	}),
	projects_updatedById: many(projects, {
		relationName: "projects_updatedById_adminUsers_id"
	}),
}));

export const filesRelations = relations(files, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [files.createdById],
		references: [adminUsers.id],
		relationName: "files_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [files.updatedById],
		references: [adminUsers.id],
		relationName: "files_updatedById_adminUsers_id"
	}),
	filesRelatedMphs: many(filesRelatedMph),
	filesFolderLnks: many(filesFolderLnk),
}));

export const uploadFoldersRelations = relations(uploadFolders, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [uploadFolders.createdById],
		references: [adminUsers.id],
		relationName: "uploadFolders_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [uploadFolders.updatedById],
		references: [adminUsers.id],
		relationName: "uploadFolders_updatedById_adminUsers_id"
	}),
	filesFolderLnks: many(filesFolderLnk),
	uploadFoldersParentLnks_folderId: many(uploadFoldersParentLnk, {
		relationName: "uploadFoldersParentLnk_folderId_uploadFolders_id"
	}),
	uploadFoldersParentLnks_invFolderId: many(uploadFoldersParentLnk, {
		relationName: "uploadFoldersParentLnk_invFolderId_uploadFolders_id"
	}),
}));

export const i18NLocaleRelations = relations(i18NLocale, ({one}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [i18NLocale.createdById],
		references: [adminUsers.id],
		relationName: "i18NLocale_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [i18NLocale.updatedById],
		references: [adminUsers.id],
		relationName: "i18NLocale_updatedById_adminUsers_id"
	}),
}));

export const strapiReleasesRelations = relations(strapiReleases, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiReleases.createdById],
		references: [adminUsers.id],
		relationName: "strapiReleases_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiReleases.updatedById],
		references: [adminUsers.id],
		relationName: "strapiReleases_updatedById_adminUsers_id"
	}),
	strapiReleaseActionsReleaseLnks: many(strapiReleaseActionsReleaseLnk),
}));

export const strapiReleaseActionsRelations = relations(strapiReleaseActions, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiReleaseActions.createdById],
		references: [adminUsers.id],
		relationName: "strapiReleaseActions_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiReleaseActions.updatedById],
		references: [adminUsers.id],
		relationName: "strapiReleaseActions_updatedById_adminUsers_id"
	}),
	strapiReleaseActionsReleaseLnks: many(strapiReleaseActionsReleaseLnk),
}));

export const strapiWorkflowsRelations = relations(strapiWorkflows, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiWorkflows.createdById],
		references: [adminUsers.id],
		relationName: "strapiWorkflows_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiWorkflows.updatedById],
		references: [adminUsers.id],
		relationName: "strapiWorkflows_updatedById_adminUsers_id"
	}),
	strapiWorkflowsStageRequiredToPublishLnks: many(strapiWorkflowsStageRequiredToPublishLnk),
	strapiWorkflowsStagesWorkflowLnks: many(strapiWorkflowsStagesWorkflowLnk),
}));

export const strapiWorkflowsStagesRelations = relations(strapiWorkflowsStages, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiWorkflowsStages.createdById],
		references: [adminUsers.id],
		relationName: "strapiWorkflowsStages_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiWorkflowsStages.updatedById],
		references: [adminUsers.id],
		relationName: "strapiWorkflowsStages_updatedById_adminUsers_id"
	}),
	strapiWorkflowsStageRequiredToPublishLnks: many(strapiWorkflowsStageRequiredToPublishLnk),
	strapiWorkflowsStagesWorkflowLnks: many(strapiWorkflowsStagesWorkflowLnk),
	strapiWorkflowsStagesPermissionsLnks: many(strapiWorkflowsStagesPermissionsLnk),
}));

export const upPermissionsRelations = relations(upPermissions, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [upPermissions.createdById],
		references: [adminUsers.id],
		relationName: "upPermissions_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [upPermissions.updatedById],
		references: [adminUsers.id],
		relationName: "upPermissions_updatedById_adminUsers_id"
	}),
	upPermissionsRoleLnks: many(upPermissionsRoleLnk),
}));

export const upRolesRelations = relations(upRoles, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [upRoles.createdById],
		references: [adminUsers.id],
		relationName: "upRoles_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [upRoles.updatedById],
		references: [adminUsers.id],
		relationName: "upRoles_updatedById_adminUsers_id"
	}),
	upPermissionsRoleLnks: many(upPermissionsRoleLnk),
	upUsersRoleLnks: many(upUsersRoleLnk),
}));

export const upUsersRelations = relations(upUsers, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [upUsers.createdById],
		references: [adminUsers.id],
		relationName: "upUsers_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [upUsers.updatedById],
		references: [adminUsers.id],
		relationName: "upUsers_updatedById_adminUsers_id"
	}),
	upUsersRoleLnks: many(upUsersRoleLnk),
}));

export const aboutsRelations = relations(abouts, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [abouts.createdById],
		references: [adminUsers.id],
		relationName: "abouts_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [abouts.updatedById],
		references: [adminUsers.id],
		relationName: "abouts_updatedById_adminUsers_id"
	}),
	aboutsCmps: many(aboutsCmps),
}));

export const aboutsCmpsRelations = relations(aboutsCmps, ({one}) => ({
	about: one(abouts, {
		fields: [aboutsCmps.entityId],
		references: [abouts.id]
	}),
}));

export const articlesRelations = relations(articles, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [articles.createdById],
		references: [adminUsers.id],
		relationName: "articles_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [articles.updatedById],
		references: [adminUsers.id],
		relationName: "articles_updatedById_adminUsers_id"
	}),
	articlesCmps: many(articlesCmps),
	articlesAuthorLnks: many(articlesAuthorLnk),
	articlesCategoryLnks: many(articlesCategoryLnk),
}));

export const articlesCmpsRelations = relations(articlesCmps, ({one}) => ({
	article: one(articles, {
		fields: [articlesCmps.entityId],
		references: [articles.id]
	}),
}));

export const authorsRelations = relations(authors, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [authors.createdById],
		references: [adminUsers.id],
		relationName: "authors_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [authors.updatedById],
		references: [adminUsers.id],
		relationName: "authors_updatedById_adminUsers_id"
	}),
	articlesAuthorLnks: many(articlesAuthorLnk),
}));

export const categoriesRelations = relations(categories, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [categories.createdById],
		references: [adminUsers.id],
		relationName: "categories_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [categories.updatedById],
		references: [adminUsers.id],
		relationName: "categories_updatedById_adminUsers_id"
	}),
	articlesCategoryLnks: many(articlesCategoryLnk),
}));

export const globalsRelations = relations(globals, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [globals.createdById],
		references: [adminUsers.id],
		relationName: "globals_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [globals.updatedById],
		references: [adminUsers.id],
		relationName: "globals_updatedById_adminUsers_id"
	}),
	globalsCmps: many(globalsCmps),
}));

export const globalsCmpsRelations = relations(globalsCmps, ({one}) => ({
	global: one(globals, {
		fields: [globalsCmps.entityId],
		references: [globals.id]
	}),
}));

export const homepagesRelations = relations(homepages, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [homepages.createdById],
		references: [adminUsers.id],
		relationName: "homepages_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [homepages.updatedById],
		references: [adminUsers.id],
		relationName: "homepages_updatedById_adminUsers_id"
	}),
	homepagesCmps: many(homepagesCmps),
}));

export const homepagesCmpsRelations = relations(homepagesCmps, ({one}) => ({
	homepage: one(homepages, {
		fields: [homepagesCmps.entityId],
		references: [homepages.id]
	}),
}));

export const adminPermissionsRelations = relations(adminPermissions, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [adminPermissions.createdById],
		references: [adminUsers.id],
		relationName: "adminPermissions_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [adminPermissions.updatedById],
		references: [adminUsers.id],
		relationName: "adminPermissions_updatedById_adminUsers_id"
	}),
	strapiWorkflowsStagesPermissionsLnks: many(strapiWorkflowsStagesPermissionsLnk),
	adminPermissionsRoleLnks: many(adminPermissionsRoleLnk),
}));

export const adminRolesRelations = relations(adminRoles, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [adminRoles.createdById],
		references: [adminUsers.id],
		relationName: "adminRoles_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [adminRoles.updatedById],
		references: [adminUsers.id],
		relationName: "adminRoles_updatedById_adminUsers_id"
	}),
	adminPermissionsRoleLnks: many(adminPermissionsRoleLnk),
	adminUsersRolesLnks: many(adminUsersRolesLnk),
}));

export const strapiApiTokensRelations = relations(strapiApiTokens, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiApiTokens.createdById],
		references: [adminUsers.id],
		relationName: "strapiApiTokens_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiApiTokens.updatedById],
		references: [adminUsers.id],
		relationName: "strapiApiTokens_updatedById_adminUsers_id"
	}),
	strapiApiTokenPermissionsTokenLnks: many(strapiApiTokenPermissionsTokenLnk),
}));

export const strapiApiTokenPermissionsRelations = relations(strapiApiTokenPermissions, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiApiTokenPermissions.createdById],
		references: [adminUsers.id],
		relationName: "strapiApiTokenPermissions_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiApiTokenPermissions.updatedById],
		references: [adminUsers.id],
		relationName: "strapiApiTokenPermissions_updatedById_adminUsers_id"
	}),
	strapiApiTokenPermissionsTokenLnks: many(strapiApiTokenPermissionsTokenLnk),
}));

export const strapiTransferTokensRelations = relations(strapiTransferTokens, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiTransferTokens.createdById],
		references: [adminUsers.id],
		relationName: "strapiTransferTokens_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiTransferTokens.updatedById],
		references: [adminUsers.id],
		relationName: "strapiTransferTokens_updatedById_adminUsers_id"
	}),
	strapiTransferTokenPermissionsTokenLnks: many(strapiTransferTokenPermissionsTokenLnk),
}));

export const strapiTransferTokenPermissionsRelations = relations(strapiTransferTokenPermissions, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiTransferTokenPermissions.createdById],
		references: [adminUsers.id],
		relationName: "strapiTransferTokenPermissions_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiTransferTokenPermissions.updatedById],
		references: [adminUsers.id],
		relationName: "strapiTransferTokenPermissions_updatedById_adminUsers_id"
	}),
	strapiTransferTokenPermissionsTokenLnks: many(strapiTransferTokenPermissionsTokenLnk),
}));

export const strapiSessionsRelations = relations(strapiSessions, ({one}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [strapiSessions.createdById],
		references: [adminUsers.id],
		relationName: "strapiSessions_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [strapiSessions.updatedById],
		references: [adminUsers.id],
		relationName: "strapiSessions_updatedById_adminUsers_id"
	}),
}));

export const strapiHistoryVersionsRelations = relations(strapiHistoryVersions, ({one}) => ({
	adminUser: one(adminUsers, {
		fields: [strapiHistoryVersions.createdById],
		references: [adminUsers.id]
	}),
}));

export const filesRelatedMphRelations = relations(filesRelatedMph, ({one}) => ({
	file: one(files, {
		fields: [filesRelatedMph.fileId],
		references: [files.id]
	}),
}));

export const filesFolderLnkRelations = relations(filesFolderLnk, ({one}) => ({
	file: one(files, {
		fields: [filesFolderLnk.fileId],
		references: [files.id]
	}),
	uploadFolder: one(uploadFolders, {
		fields: [filesFolderLnk.folderId],
		references: [uploadFolders.id]
	}),
}));

export const uploadFoldersParentLnkRelations = relations(uploadFoldersParentLnk, ({one}) => ({
	uploadFolder_folderId: one(uploadFolders, {
		fields: [uploadFoldersParentLnk.folderId],
		references: [uploadFolders.id],
		relationName: "uploadFoldersParentLnk_folderId_uploadFolders_id"
	}),
	uploadFolder_invFolderId: one(uploadFolders, {
		fields: [uploadFoldersParentLnk.invFolderId],
		references: [uploadFolders.id],
		relationName: "uploadFoldersParentLnk_invFolderId_uploadFolders_id"
	}),
}));

export const strapiReleaseActionsReleaseLnkRelations = relations(strapiReleaseActionsReleaseLnk, ({one}) => ({
	strapiReleaseAction: one(strapiReleaseActions, {
		fields: [strapiReleaseActionsReleaseLnk.releaseActionId],
		references: [strapiReleaseActions.id]
	}),
	strapiRelease: one(strapiReleases, {
		fields: [strapiReleaseActionsReleaseLnk.releaseId],
		references: [strapiReleases.id]
	}),
}));

export const strapiWorkflowsStageRequiredToPublishLnkRelations = relations(strapiWorkflowsStageRequiredToPublishLnk, ({one}) => ({
	strapiWorkflow: one(strapiWorkflows, {
		fields: [strapiWorkflowsStageRequiredToPublishLnk.workflowId],
		references: [strapiWorkflows.id]
	}),
	strapiWorkflowsStage: one(strapiWorkflowsStages, {
		fields: [strapiWorkflowsStageRequiredToPublishLnk.workflowStageId],
		references: [strapiWorkflowsStages.id]
	}),
}));

export const strapiWorkflowsStagesWorkflowLnkRelations = relations(strapiWorkflowsStagesWorkflowLnk, ({one}) => ({
	strapiWorkflowsStage: one(strapiWorkflowsStages, {
		fields: [strapiWorkflowsStagesWorkflowLnk.workflowStageId],
		references: [strapiWorkflowsStages.id]
	}),
	strapiWorkflow: one(strapiWorkflows, {
		fields: [strapiWorkflowsStagesWorkflowLnk.workflowId],
		references: [strapiWorkflows.id]
	}),
}));

export const strapiWorkflowsStagesPermissionsLnkRelations = relations(strapiWorkflowsStagesPermissionsLnk, ({one}) => ({
	strapiWorkflowsStage: one(strapiWorkflowsStages, {
		fields: [strapiWorkflowsStagesPermissionsLnk.workflowStageId],
		references: [strapiWorkflowsStages.id]
	}),
	adminPermission: one(adminPermissions, {
		fields: [strapiWorkflowsStagesPermissionsLnk.permissionId],
		references: [adminPermissions.id]
	}),
}));

export const upPermissionsRoleLnkRelations = relations(upPermissionsRoleLnk, ({one}) => ({
	upPermission: one(upPermissions, {
		fields: [upPermissionsRoleLnk.permissionId],
		references: [upPermissions.id]
	}),
	upRole: one(upRoles, {
		fields: [upPermissionsRoleLnk.roleId],
		references: [upRoles.id]
	}),
}));

export const upUsersRoleLnkRelations = relations(upUsersRoleLnk, ({one}) => ({
	upUser: one(upUsers, {
		fields: [upUsersRoleLnk.userId],
		references: [upUsers.id]
	}),
	upRole: one(upRoles, {
		fields: [upUsersRoleLnk.roleId],
		references: [upRoles.id]
	}),
}));

export const articlesAuthorLnkRelations = relations(articlesAuthorLnk, ({one}) => ({
	article: one(articles, {
		fields: [articlesAuthorLnk.articleId],
		references: [articles.id]
	}),
	author: one(authors, {
		fields: [articlesAuthorLnk.authorId],
		references: [authors.id]
	}),
}));

export const articlesCategoryLnkRelations = relations(articlesCategoryLnk, ({one}) => ({
	article: one(articles, {
		fields: [articlesCategoryLnk.articleId],
		references: [articles.id]
	}),
	category: one(categories, {
		fields: [articlesCategoryLnk.categoryId],
		references: [categories.id]
	}),
}));

export const adminPermissionsRoleLnkRelations = relations(adminPermissionsRoleLnk, ({one}) => ({
	adminPermission: one(adminPermissions, {
		fields: [adminPermissionsRoleLnk.permissionId],
		references: [adminPermissions.id]
	}),
	adminRole: one(adminRoles, {
		fields: [adminPermissionsRoleLnk.roleId],
		references: [adminRoles.id]
	}),
}));

export const adminUsersRolesLnkRelations = relations(adminUsersRolesLnk, ({one}) => ({
	adminUser: one(adminUsers, {
		fields: [adminUsersRolesLnk.userId],
		references: [adminUsers.id]
	}),
	adminRole: one(adminRoles, {
		fields: [adminUsersRolesLnk.roleId],
		references: [adminRoles.id]
	}),
}));

export const strapiApiTokenPermissionsTokenLnkRelations = relations(strapiApiTokenPermissionsTokenLnk, ({one}) => ({
	strapiApiTokenPermission: one(strapiApiTokenPermissions, {
		fields: [strapiApiTokenPermissionsTokenLnk.apiTokenPermissionId],
		references: [strapiApiTokenPermissions.id]
	}),
	strapiApiToken: one(strapiApiTokens, {
		fields: [strapiApiTokenPermissionsTokenLnk.apiTokenId],
		references: [strapiApiTokens.id]
	}),
}));

export const strapiTransferTokenPermissionsTokenLnkRelations = relations(strapiTransferTokenPermissionsTokenLnk, ({one}) => ({
	strapiTransferTokenPermission: one(strapiTransferTokenPermissions, {
		fields: [strapiTransferTokenPermissionsTokenLnk.transferTokenPermissionId],
		references: [strapiTransferTokenPermissions.id]
	}),
	strapiTransferToken: one(strapiTransferTokens, {
		fields: [strapiTransferTokenPermissionsTokenLnk.transferTokenId],
		references: [strapiTransferTokens.id]
	}),
}));

export const servicesRelations = relations(services, ({one, many}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [services.createdById],
		references: [adminUsers.id],
		relationName: "services_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [services.updatedById],
		references: [adminUsers.id],
		relationName: "services_updatedById_adminUsers_id"
	}),
	projectsServicesLnks: many(projectsServicesLnk),
}));

export const projectsServicesLnkRelations = relations(projectsServicesLnk, ({one}) => ({
	project: one(projects, {
		fields: [projectsServicesLnk.projectId],
		references: [projects.id]
	}),
	service: one(services, {
		fields: [projectsServicesLnk.serviceId],
		references: [services.id]
	}),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
	projectsServicesLnks: many(projectsServicesLnk),
	projectsCmps: many(projectsCmps),
	adminUser_createdById: one(adminUsers, {
		fields: [projects.createdById],
		references: [adminUsers.id],
		relationName: "projects_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [projects.updatedById],
		references: [adminUsers.id],
		relationName: "projects_updatedById_adminUsers_id"
	}),
}));

export const projectsCmpsRelations = relations(projectsCmps, ({one}) => ({
	project: one(projects, {
		fields: [projectsCmps.entityId],
		references: [projects.id]
	}),
}));

export const contactsRelations = relations(contacts, ({one}) => ({
	adminUser_createdById: one(adminUsers, {
		fields: [contacts.createdById],
		references: [adminUsers.id],
		relationName: "contacts_createdById_adminUsers_id"
	}),
	adminUser_updatedById: one(adminUsers, {
		fields: [contacts.updatedById],
		references: [adminUsers.id],
		relationName: "contacts_updatedById_adminUsers_id"
	}),
}));