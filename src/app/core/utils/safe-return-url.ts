/**
 * Only same-origin relative paths survive this. `returnUrl` travels in the
 * query string, so it is attacker-controlled: without the check,
 * `?returnUrl=https://evil.example/login` turns our own post-login redirect
 * into an open redirect and hands the phishing page our referrer.
 * A leading `//` is protocol-relative — `//evil.example` is not a local path.
 * A backslash is rejected anywhere, not just in front: browsers and URL
 * parsers disagree about whether `/\evil.example` is a path or an authority,
 * and the cheapest way not to depend on which one wins is to refuse it.
 */
export function safeReturnUrl(raw: string | null): string | null {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return null;
  return raw;
}
