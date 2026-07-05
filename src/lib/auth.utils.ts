/** @deprecated Prefira avatarUrl em demoUser (test-utils) — ou gere URL dinâmica no login */
export function buildAvatarUrl(name: string): string {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=2563eb&color=fff&size=128`;
}
