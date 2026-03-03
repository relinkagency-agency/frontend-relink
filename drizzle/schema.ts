import { pgTable, serial, varchar, timestamp, json, text, integer, jsonb, boolean, index, foreignKey, numeric, unique, doublePrecision, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const strapiMigrations = pgTable("strapi_migrations", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	time: timestamp({ mode: 'string' }),
});

export const strapiMigrationsInternal = pgTable("strapi_migrations_internal", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	time: timestamp({ mode: 'string' }),
});

export const strapiDatabaseSchema = pgTable("strapi_database_schema", {
	id: serial().primaryKey().notNull(),
	schema: json(),
	time: timestamp({ mode: 'string' }),
	hash: varchar({ length: 255 }),
});

export const componentsSharedSliders = pgTable("components_shared_sliders", {
	id: serial().primaryKey().notNull(),
});

export const componentsSharedSeos = pgTable("components_shared_seos", {
	id: serial().primaryKey().notNull(),
	metaTitle: varchar("meta_title", { length: 255 }),
	metaDescription: text("meta_description"),
});

export const componentsSharedRichTexts = pgTable("components_shared_rich_texts", {
	id: serial().primaryKey().notNull(),
	body: text(),
});

export const componentsSharedQuotes = pgTable("components_shared_quotes", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }),
	body: text(),
});

export const componentsSharedMedia = pgTable("components_shared_media", {
	id: serial().primaryKey().notNull(),
});

export const componentsSharedHeroSlides = pgTable("components_shared_hero_slides", {
	id: serial().primaryKey().notNull(),
	alt: varchar({ length: 255 }),
	label: varchar({ length: 255 }),
	order: integer(),
});

export const strapiCoreStoreSettings = pgTable("strapi_core_store_settings", {
	id: serial().primaryKey().notNull(),
	key: varchar({ length: 255 }),
	value: text(),
	type: varchar({ length: 255 }),
	environment: varchar({ length: 255 }),
	tag: varchar({ length: 255 }),
});

export const strapiWebhooks = pgTable("strapi_webhooks", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	url: text(),
	headers: jsonb(),
	events: jsonb(),
	enabled: boolean(),
});

export const strapiAiLocalizationJobs = pgTable("strapi_ai_localization_jobs", {
	id: serial().primaryKey().notNull(),
	contentType: varchar("content_type", { length: 255 }).notNull(),
	relatedDocumentId: varchar("related_document_id", { length: 255 }).notNull(),
	sourceLocale: varchar("source_locale", { length: 255 }).notNull(),
	targetLocales: jsonb("target_locales").notNull(),
	status: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
});

export const adminUsers = pgTable("admin_users", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	firstname: varchar({ length: 255 }),
	lastname: varchar({ length: 255 }),
	username: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	password: varchar({ length: 255 }),
	resetPasswordToken: varchar("reset_password_token", { length: 255 }),
	registrationToken: varchar("registration_token", { length: 255 }),
	isActive: boolean("is_active"),
	blocked: boolean(),
	preferedLanguage: varchar("prefered_language", { length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("admin_users_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("admin_users_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("admin_users_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [table.id],
			name: "admin_users_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [table.id],
			name: "admin_users_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const files = pgTable("files", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	alternativeText: text("alternative_text"),
	caption: text(),
	width: integer(),
	height: integer(),
	formats: jsonb(),
	hash: varchar({ length: 255 }),
	ext: varchar({ length: 255 }),
	mime: varchar({ length: 255 }),
	size: numeric({ precision: 10, scale:  2 }),
	url: text(),
	previewUrl: text("preview_url"),
	provider: varchar({ length: 255 }),
	providerMetadata: jsonb("provider_metadata"),
	folderPath: varchar("folder_path", { length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("files_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("files_documents_idx").using("btree", table.documentId.asc().nullsLast().op("timestamp_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("files_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	index("upload_files_created_at_index").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("upload_files_ext_index").using("btree", table.ext.asc().nullsLast().op("text_ops")),
	index("upload_files_folder_path_index").using("btree", table.folderPath.asc().nullsLast().op("text_ops")),
	index("upload_files_name_index").using("btree", table.name.asc().nullsLast().op("text_ops")),
	index("upload_files_size_index").using("btree", table.size.asc().nullsLast().op("numeric_ops")),
	index("upload_files_updated_at_index").using("btree", table.updatedAt.asc().nullsLast().op("timestamp_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "files_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "files_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const uploadFolders = pgTable("upload_folders", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	pathId: integer("path_id"),
	path: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("upload_folders_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("upload_folders_documents_idx").using("btree", table.documentId.asc().nullsLast().op("timestamp_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("timestamp_ops")),
	index("upload_folders_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "upload_folders_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "upload_folders_updated_by_id_fk"
		}).onDelete("set null"),
	unique("upload_folders_path_id_index").on(table.pathId),
	unique("upload_folders_path_index").on(table.path),
]);

export const i18NLocale = pgTable("i18n_locale", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	code: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("i18n_locale_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("i18n_locale_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("i18n_locale_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "i18n_locale_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "i18n_locale_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiReleases = pgTable("strapi_releases", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	releasedAt: timestamp("released_at", { precision: 6, mode: 'string' }),
	scheduledAt: timestamp("scheduled_at", { precision: 6, mode: 'string' }),
	timezone: varchar({ length: 255 }),
	status: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_releases_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_releases_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_releases_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_releases_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_releases_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiReleaseActions = pgTable("strapi_release_actions", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	type: varchar({ length: 255 }),
	contentType: varchar("content_type", { length: 255 }),
	entryDocumentId: varchar("entry_document_id", { length: 255 }),
	locale: varchar({ length: 255 }),
	isEntryValid: boolean("is_entry_valid"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
}, (table) => [
	index("strapi_release_actions_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_release_actions_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_release_actions_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_release_actions_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_release_actions_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiWorkflows = pgTable("strapi_workflows", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	contentTypes: jsonb("content_types"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_workflows_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_workflows_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_workflows_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_workflows_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_workflows_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiWorkflowsStages = pgTable("strapi_workflows_stages", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	color: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_workflows_stages_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_workflows_stages_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_workflows_stages_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_workflows_stages_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_workflows_stages_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const upPermissions = pgTable("up_permissions", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	action: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("up_permissions_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("up_permissions_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("up_permissions_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "up_permissions_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "up_permissions_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const upRoles = pgTable("up_roles", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	description: varchar({ length: 255 }),
	type: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("up_roles_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("up_roles_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("up_roles_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "up_roles_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "up_roles_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const upUsers = pgTable("up_users", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	username: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	provider: varchar({ length: 255 }),
	password: varchar({ length: 255 }),
	resetPasswordToken: varchar("reset_password_token", { length: 255 }),
	confirmationToken: varchar("confirmation_token", { length: 255 }),
	confirmed: boolean(),
	blocked: boolean(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("up_users_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("up_users_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("up_users_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "up_users_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "up_users_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const abouts = pgTable("abouts", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	title: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("abouts_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("abouts_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("abouts_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "abouts_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "abouts_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const aboutsCmps = pgTable("abouts_cmps", {
	id: serial().primaryKey().notNull(),
	entityId: integer("entity_id"),
	cmpId: integer("cmp_id"),
	componentType: varchar("component_type", { length: 255 }),
	field: varchar({ length: 255 }),
	order: doublePrecision(),
}, (table) => [
	index("abouts_component_type_idx").using("btree", table.componentType.asc().nullsLast().op("text_ops")),
	index("abouts_entity_fk").using("btree", table.entityId.asc().nullsLast().op("int4_ops")),
	index("abouts_field_idx").using("btree", table.field.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.entityId],
			foreignColumns: [abouts.id],
			name: "abouts_entity_fk"
		}).onDelete("cascade"),
	unique("abouts_uq").on(table.entityId, table.cmpId, table.componentType, table.field),
]);

export const articles = pgTable("articles", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	title: varchar({ length: 255 }),
	excerpt: text(),
	slug: varchar({ length: 255 }),
	postStatus: varchar("post_status", { length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("articles_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("articles_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("articles_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "articles_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "articles_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const articlesCmps = pgTable("articles_cmps", {
	id: serial().primaryKey().notNull(),
	entityId: integer("entity_id"),
	cmpId: integer("cmp_id"),
	componentType: varchar("component_type", { length: 255 }),
	field: varchar({ length: 255 }),
	order: doublePrecision(),
}, (table) => [
	index("articles_component_type_idx").using("btree", table.componentType.asc().nullsLast().op("text_ops")),
	index("articles_entity_fk").using("btree", table.entityId.asc().nullsLast().op("int4_ops")),
	index("articles_field_idx").using("btree", table.field.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.entityId],
			foreignColumns: [articles.id],
			name: "articles_entity_fk"
		}).onDelete("cascade"),
	unique("articles_uq").on(table.entityId, table.cmpId, table.componentType, table.field),
]);

export const authors = pgTable("authors", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("authors_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("authors_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("authors_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "authors_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "authors_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	slug: varchar({ length: 255 }),
	description: text(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("categories_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("categories_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("categories_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "categories_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "categories_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const globals = pgTable("globals", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	siteName: varchar("site_name", { length: 255 }),
	siteDescription: text("site_description"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("globals_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("globals_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("globals_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "globals_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "globals_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const globalsCmps = pgTable("globals_cmps", {
	id: serial().primaryKey().notNull(),
	entityId: integer("entity_id"),
	cmpId: integer("cmp_id"),
	componentType: varchar("component_type", { length: 255 }),
	field: varchar({ length: 255 }),
	order: doublePrecision(),
}, (table) => [
	index("globals_component_type_idx").using("btree", table.componentType.asc().nullsLast().op("text_ops")),
	index("globals_entity_fk").using("btree", table.entityId.asc().nullsLast().op("int4_ops")),
	index("globals_field_idx").using("btree", table.field.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.entityId],
			foreignColumns: [globals.id],
			name: "globals_entity_fk"
		}).onDelete("cascade"),
	unique("globals_uq").on(table.entityId, table.cmpId, table.componentType, table.field),
]);

export const homepages = pgTable("homepages", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	heroVariant: varchar("hero_variant", { length: 255 }),
	heroAutoRotateMs: integer("hero_auto_rotate_ms"),
	heroSwipeThreshold: integer("hero_swipe_threshold"),
	heroEyebrow: varchar("hero_eyebrow", { length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("homepages_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("homepages_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("homepages_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "homepages_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "homepages_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const homepagesCmps = pgTable("homepages_cmps", {
	id: serial().primaryKey().notNull(),
	entityId: integer("entity_id"),
	cmpId: integer("cmp_id"),
	componentType: varchar("component_type", { length: 255 }),
	field: varchar({ length: 255 }),
	order: doublePrecision(),
}, (table) => [
	index("homepages_component_type_idx").using("btree", table.componentType.asc().nullsLast().op("text_ops")),
	index("homepages_entity_fk").using("btree", table.entityId.asc().nullsLast().op("int4_ops")),
	index("homepages_field_idx").using("btree", table.field.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.entityId],
			foreignColumns: [homepages.id],
			name: "homepages_entity_fk"
		}).onDelete("cascade"),
	unique("homepages_uq").on(table.entityId, table.cmpId, table.componentType, table.field),
]);

export const adminPermissions = pgTable("admin_permissions", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	action: varchar({ length: 255 }),
	actionParameters: jsonb("action_parameters"),
	subject: varchar({ length: 255 }),
	properties: jsonb(),
	conditions: jsonb(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("admin_permissions_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("admin_permissions_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("admin_permissions_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "admin_permissions_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "admin_permissions_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const adminRoles = pgTable("admin_roles", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	code: varchar({ length: 255 }),
	description: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("admin_roles_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("admin_roles_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("admin_roles_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "admin_roles_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "admin_roles_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiApiTokens = pgTable("strapi_api_tokens", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	description: varchar({ length: 255 }),
	type: varchar({ length: 255 }),
	accessKey: varchar("access_key", { length: 255 }),
	encryptedKey: text("encrypted_key"),
	lastUsedAt: timestamp("last_used_at", { precision: 6, mode: 'string' }),
	expiresAt: timestamp("expires_at", { precision: 6, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	lifespan: bigint({ mode: "number" }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_api_tokens_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_api_tokens_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_api_tokens_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_api_tokens_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_api_tokens_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiApiTokenPermissions = pgTable("strapi_api_token_permissions", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	action: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_api_token_permissions_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_api_token_permissions_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_api_token_permissions_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_api_token_permissions_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_api_token_permissions_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiTransferTokens = pgTable("strapi_transfer_tokens", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	description: varchar({ length: 255 }),
	accessKey: varchar("access_key", { length: 255 }),
	lastUsedAt: timestamp("last_used_at", { precision: 6, mode: 'string' }),
	expiresAt: timestamp("expires_at", { precision: 6, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	lifespan: bigint({ mode: "number" }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_transfer_tokens_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_transfer_tokens_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_transfer_tokens_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_transfer_tokens_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_transfer_tokens_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiTransferTokenPermissions = pgTable("strapi_transfer_token_permissions", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	action: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_transfer_token_permissions_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_transfer_token_permissions_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_transfer_token_permissions_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_transfer_token_permissions_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_transfer_token_permissions_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiSessions = pgTable("strapi_sessions", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	userId: varchar("user_id", { length: 255 }),
	sessionId: varchar("session_id", { length: 255 }),
	childId: varchar("child_id", { length: 255 }),
	deviceId: varchar("device_id", { length: 255 }),
	origin: varchar({ length: 255 }),
	expiresAt: timestamp("expires_at", { precision: 6, mode: 'string' }),
	absoluteExpiresAt: timestamp("absolute_expires_at", { precision: 6, mode: 'string' }),
	status: varchar({ length: 255 }),
	type: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("strapi_sessions_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("strapi_sessions_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("strapi_sessions_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_sessions_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "strapi_sessions_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const strapiHistoryVersions = pgTable("strapi_history_versions", {
	id: serial().primaryKey().notNull(),
	contentType: varchar("content_type", { length: 255 }).notNull(),
	relatedDocumentId: varchar("related_document_id", { length: 255 }),
	locale: varchar({ length: 255 }),
	status: varchar({ length: 255 }),
	data: jsonb(),
	schema: jsonb(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
}, (table) => [
	index("strapi_history_versions_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "strapi_history_versions_created_by_id_fk"
		}).onDelete("set null"),
]);

export const filesRelatedMph = pgTable("files_related_mph", {
	id: serial().primaryKey().notNull(),
	fileId: integer("file_id"),
	relatedId: integer("related_id"),
	relatedType: varchar("related_type", { length: 255 }),
	field: varchar({ length: 255 }),
	order: doublePrecision(),
}, (table) => [
	index("files_related_mph_fk").using("btree", table.fileId.asc().nullsLast().op("int4_ops")),
	index("files_related_mph_idix").using("btree", table.relatedId.asc().nullsLast().op("int4_ops")),
	index("files_related_mph_oidx").using("btree", table.order.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.fileId],
			foreignColumns: [files.id],
			name: "files_related_mph_fk"
		}).onDelete("cascade"),
]);

export const filesFolderLnk = pgTable("files_folder_lnk", {
	id: serial().primaryKey().notNull(),
	fileId: integer("file_id"),
	folderId: integer("folder_id"),
	fileOrd: doublePrecision("file_ord"),
}, (table) => [
	index("files_folder_lnk_fk").using("btree", table.fileId.asc().nullsLast().op("int4_ops")),
	index("files_folder_lnk_ifk").using("btree", table.folderId.asc().nullsLast().op("int4_ops")),
	index("files_folder_lnk_oifk").using("btree", table.fileOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.fileId],
			foreignColumns: [files.id],
			name: "files_folder_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.folderId],
			foreignColumns: [uploadFolders.id],
			name: "files_folder_lnk_ifk"
		}).onDelete("cascade"),
	unique("files_folder_lnk_uq").on(table.fileId, table.folderId),
]);

export const uploadFoldersParentLnk = pgTable("upload_folders_parent_lnk", {
	id: serial().primaryKey().notNull(),
	folderId: integer("folder_id"),
	invFolderId: integer("inv_folder_id"),
	folderOrd: doublePrecision("folder_ord"),
}, (table) => [
	index("upload_folders_parent_lnk_fk").using("btree", table.folderId.asc().nullsLast().op("int4_ops")),
	index("upload_folders_parent_lnk_ifk").using("btree", table.invFolderId.asc().nullsLast().op("int4_ops")),
	index("upload_folders_parent_lnk_oifk").using("btree", table.folderOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.folderId],
			foreignColumns: [uploadFolders.id],
			name: "upload_folders_parent_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.invFolderId],
			foreignColumns: [uploadFolders.id],
			name: "upload_folders_parent_lnk_ifk"
		}).onDelete("cascade"),
	unique("upload_folders_parent_lnk_uq").on(table.folderId, table.invFolderId),
]);

export const strapiReleaseActionsReleaseLnk = pgTable("strapi_release_actions_release_lnk", {
	id: serial().primaryKey().notNull(),
	releaseActionId: integer("release_action_id"),
	releaseId: integer("release_id"),
	releaseActionOrd: doublePrecision("release_action_ord"),
}, (table) => [
	index("strapi_release_actions_release_lnk_fk").using("btree", table.releaseActionId.asc().nullsLast().op("int4_ops")),
	index("strapi_release_actions_release_lnk_ifk").using("btree", table.releaseId.asc().nullsLast().op("int4_ops")),
	index("strapi_release_actions_release_lnk_oifk").using("btree", table.releaseActionOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.releaseActionId],
			foreignColumns: [strapiReleaseActions.id],
			name: "strapi_release_actions_release_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.releaseId],
			foreignColumns: [strapiReleases.id],
			name: "strapi_release_actions_release_lnk_ifk"
		}).onDelete("cascade"),
	unique("strapi_release_actions_release_lnk_uq").on(table.releaseActionId, table.releaseId),
]);

export const strapiWorkflowsStageRequiredToPublishLnk = pgTable("strapi_workflows_stage_required_to_publish_lnk", {
	id: serial().primaryKey().notNull(),
	workflowId: integer("workflow_id"),
	workflowStageId: integer("workflow_stage_id"),
}, (table) => [
	index("strapi_workflows_stage_required_to_publish_lnk_fk").using("btree", table.workflowId.asc().nullsLast().op("int4_ops")),
	index("strapi_workflows_stage_required_to_publish_lnk_ifk").using("btree", table.workflowStageId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.workflowId],
			foreignColumns: [strapiWorkflows.id],
			name: "strapi_workflows_stage_required_to_publish_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.workflowStageId],
			foreignColumns: [strapiWorkflowsStages.id],
			name: "strapi_workflows_stage_required_to_publish_lnk_ifk"
		}).onDelete("cascade"),
	unique("strapi_workflows_stage_required_to_publish_lnk_uq").on(table.workflowId, table.workflowStageId),
]);

export const strapiWorkflowsStagesWorkflowLnk = pgTable("strapi_workflows_stages_workflow_lnk", {
	id: serial().primaryKey().notNull(),
	workflowStageId: integer("workflow_stage_id"),
	workflowId: integer("workflow_id"),
	workflowStageOrd: doublePrecision("workflow_stage_ord"),
}, (table) => [
	index("strapi_workflows_stages_workflow_lnk_fk").using("btree", table.workflowStageId.asc().nullsLast().op("int4_ops")),
	index("strapi_workflows_stages_workflow_lnk_ifk").using("btree", table.workflowId.asc().nullsLast().op("int4_ops")),
	index("strapi_workflows_stages_workflow_lnk_oifk").using("btree", table.workflowStageOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.workflowStageId],
			foreignColumns: [strapiWorkflowsStages.id],
			name: "strapi_workflows_stages_workflow_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.workflowId],
			foreignColumns: [strapiWorkflows.id],
			name: "strapi_workflows_stages_workflow_lnk_ifk"
		}).onDelete("cascade"),
	unique("strapi_workflows_stages_workflow_lnk_uq").on(table.workflowStageId, table.workflowId),
]);

export const strapiWorkflowsStagesPermissionsLnk = pgTable("strapi_workflows_stages_permissions_lnk", {
	id: serial().primaryKey().notNull(),
	workflowStageId: integer("workflow_stage_id"),
	permissionId: integer("permission_id"),
	permissionOrd: doublePrecision("permission_ord"),
}, (table) => [
	index("strapi_workflows_stages_permissions_lnk_fk").using("btree", table.workflowStageId.asc().nullsLast().op("int4_ops")),
	index("strapi_workflows_stages_permissions_lnk_ifk").using("btree", table.permissionId.asc().nullsLast().op("int4_ops")),
	index("strapi_workflows_stages_permissions_lnk_ofk").using("btree", table.permissionOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.workflowStageId],
			foreignColumns: [strapiWorkflowsStages.id],
			name: "strapi_workflows_stages_permissions_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [adminPermissions.id],
			name: "strapi_workflows_stages_permissions_lnk_ifk"
		}).onDelete("cascade"),
	unique("strapi_workflows_stages_permissions_lnk_uq").on(table.workflowStageId, table.permissionId),
]);

export const upPermissionsRoleLnk = pgTable("up_permissions_role_lnk", {
	id: serial().primaryKey().notNull(),
	permissionId: integer("permission_id"),
	roleId: integer("role_id"),
	permissionOrd: doublePrecision("permission_ord"),
}, (table) => [
	index("up_permissions_role_lnk_fk").using("btree", table.permissionId.asc().nullsLast().op("int4_ops")),
	index("up_permissions_role_lnk_ifk").using("btree", table.roleId.asc().nullsLast().op("int4_ops")),
	index("up_permissions_role_lnk_oifk").using("btree", table.permissionOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [upPermissions.id],
			name: "up_permissions_role_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [upRoles.id],
			name: "up_permissions_role_lnk_ifk"
		}).onDelete("cascade"),
	unique("up_permissions_role_lnk_uq").on(table.permissionId, table.roleId),
]);

export const upUsersRoleLnk = pgTable("up_users_role_lnk", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	roleId: integer("role_id"),
	userOrd: doublePrecision("user_ord"),
}, (table) => [
	index("up_users_role_lnk_fk").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("up_users_role_lnk_ifk").using("btree", table.roleId.asc().nullsLast().op("int4_ops")),
	index("up_users_role_lnk_oifk").using("btree", table.userOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [upUsers.id],
			name: "up_users_role_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [upRoles.id],
			name: "up_users_role_lnk_ifk"
		}).onDelete("cascade"),
	unique("up_users_role_lnk_uq").on(table.userId, table.roleId),
]);

export const articlesAuthorLnk = pgTable("articles_author_lnk", {
	id: serial().primaryKey().notNull(),
	articleId: integer("article_id"),
	authorId: integer("author_id"),
	articleOrd: doublePrecision("article_ord"),
}, (table) => [
	index("articles_author_lnk_fk").using("btree", table.articleId.asc().nullsLast().op("int4_ops")),
	index("articles_author_lnk_ifk").using("btree", table.authorId.asc().nullsLast().op("int4_ops")),
	index("articles_author_lnk_oifk").using("btree", table.articleOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [articles.id],
			name: "articles_author_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [authors.id],
			name: "articles_author_lnk_ifk"
		}).onDelete("cascade"),
	unique("articles_author_lnk_uq").on(table.articleId, table.authorId),
]);

export const articlesCategoryLnk = pgTable("articles_category_lnk", {
	id: serial().primaryKey().notNull(),
	articleId: integer("article_id"),
	categoryId: integer("category_id"),
	articleOrd: doublePrecision("article_ord"),
}, (table) => [
	index("articles_category_lnk_fk").using("btree", table.articleId.asc().nullsLast().op("int4_ops")),
	index("articles_category_lnk_ifk").using("btree", table.categoryId.asc().nullsLast().op("int4_ops")),
	index("articles_category_lnk_oifk").using("btree", table.articleOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [articles.id],
			name: "articles_category_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "articles_category_lnk_ifk"
		}).onDelete("cascade"),
	unique("articles_category_lnk_uq").on(table.articleId, table.categoryId),
]);

export const adminPermissionsRoleLnk = pgTable("admin_permissions_role_lnk", {
	id: serial().primaryKey().notNull(),
	permissionId: integer("permission_id"),
	roleId: integer("role_id"),
	permissionOrd: doublePrecision("permission_ord"),
}, (table) => [
	index("admin_permissions_role_lnk_fk").using("btree", table.permissionId.asc().nullsLast().op("int4_ops")),
	index("admin_permissions_role_lnk_ifk").using("btree", table.roleId.asc().nullsLast().op("int4_ops")),
	index("admin_permissions_role_lnk_oifk").using("btree", table.permissionOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [adminPermissions.id],
			name: "admin_permissions_role_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [adminRoles.id],
			name: "admin_permissions_role_lnk_ifk"
		}).onDelete("cascade"),
	unique("admin_permissions_role_lnk_uq").on(table.permissionId, table.roleId),
]);

export const adminUsersRolesLnk = pgTable("admin_users_roles_lnk", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	roleId: integer("role_id"),
	roleOrd: doublePrecision("role_ord"),
	userOrd: doublePrecision("user_ord"),
}, (table) => [
	index("admin_users_roles_lnk_fk").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("admin_users_roles_lnk_ifk").using("btree", table.roleId.asc().nullsLast().op("int4_ops")),
	index("admin_users_roles_lnk_ofk").using("btree", table.roleOrd.asc().nullsLast().op("float8_ops")),
	index("admin_users_roles_lnk_oifk").using("btree", table.userOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [adminUsers.id],
			name: "admin_users_roles_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [adminRoles.id],
			name: "admin_users_roles_lnk_ifk"
		}).onDelete("cascade"),
	unique("admin_users_roles_lnk_uq").on(table.userId, table.roleId),
]);

export const strapiApiTokenPermissionsTokenLnk = pgTable("strapi_api_token_permissions_token_lnk", {
	id: serial().primaryKey().notNull(),
	apiTokenPermissionId: integer("api_token_permission_id"),
	apiTokenId: integer("api_token_id"),
	apiTokenPermissionOrd: doublePrecision("api_token_permission_ord"),
}, (table) => [
	index("strapi_api_token_permissions_token_lnk_fk").using("btree", table.apiTokenPermissionId.asc().nullsLast().op("int4_ops")),
	index("strapi_api_token_permissions_token_lnk_ifk").using("btree", table.apiTokenId.asc().nullsLast().op("int4_ops")),
	index("strapi_api_token_permissions_token_lnk_oifk").using("btree", table.apiTokenPermissionOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.apiTokenPermissionId],
			foreignColumns: [strapiApiTokenPermissions.id],
			name: "strapi_api_token_permissions_token_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.apiTokenId],
			foreignColumns: [strapiApiTokens.id],
			name: "strapi_api_token_permissions_token_lnk_ifk"
		}).onDelete("cascade"),
	unique("strapi_api_token_permissions_token_lnk_uq").on(table.apiTokenPermissionId, table.apiTokenId),
]);

export const strapiTransferTokenPermissionsTokenLnk = pgTable("strapi_transfer_token_permissions_token_lnk", {
	id: serial().primaryKey().notNull(),
	transferTokenPermissionId: integer("transfer_token_permission_id"),
	transferTokenId: integer("transfer_token_id"),
	transferTokenPermissionOrd: doublePrecision("transfer_token_permission_ord"),
}, (table) => [
	index("strapi_transfer_token_permissions_token_lnk_fk").using("btree", table.transferTokenPermissionId.asc().nullsLast().op("int4_ops")),
	index("strapi_transfer_token_permissions_token_lnk_ifk").using("btree", table.transferTokenId.asc().nullsLast().op("int4_ops")),
	index("strapi_transfer_token_permissions_token_lnk_oifk").using("btree", table.transferTokenPermissionOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.transferTokenPermissionId],
			foreignColumns: [strapiTransferTokenPermissions.id],
			name: "strapi_transfer_token_permissions_token_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.transferTokenId],
			foreignColumns: [strapiTransferTokens.id],
			name: "strapi_transfer_token_permissions_token_lnk_ifk"
		}).onDelete("cascade"),
	unique("strapi_transfer_token_permissions_token_lnk_uq").on(table.transferTokenPermissionId, table.transferTokenId),
]);

export const services = pgTable("services", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	title: varchar({ length: 255 }),
	slug: varchar({ length: 255 }),
	shortDescription: varchar("short_description", { length: 255 }),
	longDescription: jsonb("long_description"),
	order: integer(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("services_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("services_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("services_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "services_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "services_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const projectsServicesLnk = pgTable("projects_services_lnk", {
	id: serial().primaryKey().notNull(),
	projectId: integer("project_id"),
	serviceId: integer("service_id"),
	serviceOrd: doublePrecision("service_ord"),
	projectOrd: doublePrecision("project_ord"),
}, (table) => [
	index("projects_services_lnk_fk").using("btree", table.projectId.asc().nullsLast().op("int4_ops")),
	index("projects_services_lnk_ifk").using("btree", table.serviceId.asc().nullsLast().op("int4_ops")),
	index("projects_services_lnk_ofk").using("btree", table.serviceOrd.asc().nullsLast().op("float8_ops")),
	index("projects_services_lnk_oifk").using("btree", table.projectOrd.asc().nullsLast().op("float8_ops")),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "projects_services_lnk_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.serviceId],
			foreignColumns: [services.id],
			name: "projects_services_lnk_ifk"
		}).onDelete("cascade"),
	unique("projects_services_lnk_uq").on(table.projectId, table.serviceId),
]);

export const componentsSharedResults = pgTable("components_shared_results", {
	id: serial().primaryKey().notNull(),
});

export const projectsCmps = pgTable("projects_cmps", {
	id: serial().primaryKey().notNull(),
	entityId: integer("entity_id"),
	cmpId: integer("cmp_id"),
	componentType: varchar("component_type", { length: 255 }),
	field: varchar({ length: 255 }),
	order: doublePrecision(),
}, (table) => [
	index("projects_component_type_idx").using("btree", table.componentType.asc().nullsLast().op("text_ops")),
	index("projects_entity_fk").using("btree", table.entityId.asc().nullsLast().op("int4_ops")),
	index("projects_field_idx").using("btree", table.field.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.entityId],
			foreignColumns: [projects.id],
			name: "projects_entity_fk"
		}).onDelete("cascade"),
	unique("projects_uq").on(table.entityId, table.cmpId, table.componentType, table.field),
]);

export const componentsSharedDeliverables = pgTable("components_shared_deliverables", {
	id: serial().primaryKey().notNull(),
	label: varchar({ length: 255 }),
	details: text(),
});

export const contacts = pgTable("contacts", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	name: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	phone: varchar({ length: 255 }),
	location: varchar({ length: 255 }),
	services: varchar({ length: 255 }),
	help: text(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
}, (table) => [
	index("contacts_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("contacts_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("contacts_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "contacts_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "contacts_updated_by_id_fk"
		}).onDelete("set null"),
]);

export const projects = pgTable("projects", {
	id: serial().primaryKey().notNull(),
	documentId: varchar("document_id", { length: 255 }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }),
	publishedAt: timestamp("published_at", { precision: 6, mode: 'string' }),
	createdById: integer("created_by_id"),
	updatedById: integer("updated_by_id"),
	locale: varchar({ length: 255 }),
	title: varchar({ length: 255 }),
	slug: varchar({ length: 255 }),
	excerpt: text(),
	clientName: varchar("client_name", { length: 255 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	year: bigint({ mode: "number" }),
	liveUrl: varchar("live_url", { length: 255 }),
	isFeatured: boolean("is_featured"),
	challenge: text(),
	solution: jsonb(),
}, (table) => [
	index("projects_created_by_id_fk").using("btree", table.createdById.asc().nullsLast().op("int4_ops")),
	index("projects_documents_idx").using("btree", table.documentId.asc().nullsLast().op("text_ops"), table.locale.asc().nullsLast().op("text_ops"), table.publishedAt.asc().nullsLast().op("text_ops")),
	index("projects_updated_by_id_fk").using("btree", table.updatedById.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [adminUsers.id],
			name: "projects_created_by_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [adminUsers.id],
			name: "projects_updated_by_id_fk"
		}).onDelete("set null"),
]);
