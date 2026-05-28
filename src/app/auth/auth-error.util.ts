const errorKeyMap: Record<string, string> = {
  'Invalid Credentials':                               'errors.invalidCredentials',
  'Please verify your email before logging in':        'errors.emailNotVerified',
  'Username already taken':                            'errors.usernameTaken',
  'Email already taken':                               'errors.emailTaken',
  'Verification link already used or expired':         'errors.linkExpired',
  'Invalid or expired verification link':              'errors.linkInvalid',
  'Invalid token type':                                'errors.linkInvalid',
};

/**
 * Maps a backend error message string to a Transloco i18n key.
 * Falls back to 'errors.unexpected' for unknown messages.
 */
export function getErrorKey(backendMessage?: string): string {
  if (!backendMessage) return 'errors.unexpected';
  return errorKeyMap[backendMessage] ?? 'errors.unexpected';
}
