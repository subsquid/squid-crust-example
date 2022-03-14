/**
 * Asset Balance Entity Id
 * @param assetId
 * @param accountId
 * @returns {string}
 */
export function getAssetBalanceId(assetId: string, accountId: string): string {
  return `${assetId}-${accountId}`;
}
