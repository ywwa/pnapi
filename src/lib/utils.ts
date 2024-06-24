/**
 * Regular expression to validate slug
 *
 * Allowed chars: lowercase letters, numbers, dashes
 * Cannot start or end with dash
 * Cannot have multiple dashes in a row
 */
export const slugRegex = /^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/;

/**
 * Regular expression to validate code
 * Allowed chars: lowercase letters, numbers, dashes
 * Cannot start or end with dash
 * Cannot have multiple dashes in a row
 *
 */
export const codeRegex = /^(?!-)(?!.*--)[a-zA-Z0-9-](?<!-)$/;
