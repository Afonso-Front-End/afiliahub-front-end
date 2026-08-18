export function gateBypassed(isAdminRoute, isLoading, ready) {
    return isAdminRoute || isLoading || !ready;
}
export function visitorMayBrowse(storeOnline, isAdmin) {
    return storeOnline || isAdmin;
}
