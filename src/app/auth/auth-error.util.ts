const errorKeyMap: Record<string, string> = {
  'Invalid Credentials':                               'errors.invalidCredentials',
  'Please verify your email before logging in':        'errors.emailNotVerified',
  'Username already taken':                            'errors.usernameTaken',
  'Email already taken':                               'errors.emailTaken',
  'Verification link already used or expired':         'errors.linkExpired',
  'Invalid or expired verification link':              'errors.linkInvalid',
  'Invalid token type':                                'errors.linkInvalid',
  'Reset link already used or expired':                'errors.resetLinkExpired',
  'Invalid or expired reset link':                     'errors.resetLinkInvalid',
  'Email not found':                                   'errors.unexpected',
  'Too many requests. Please wait before trying again': 'errors.tooManyRequests',
};

export function getErrorKey(backendMessage?: string): string {
  if (!backendMessage) return 'errors.unexpected';
  return errorKeyMap[backendMessage] ?? 'errors.unexpected';
}
