export function gateBypassed(isAdminRoute: boolean, isLoading: boolean, ready: boolean) {
  return isAdminRoute || isLoading || !ready;
}

export function visitorMayBrowse(storeOnline: boolean, isAdmin: boolean) {
  return storeOnline || isAdmin;
}
