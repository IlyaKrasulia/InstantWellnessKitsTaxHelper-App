export enum Endpoints {
  LOGIN = "/Auth/login",
  USER_INFO = "/Auth/me",
  LOGOUT = "/Auth/logout",
  IMPORT_ORDERS = "/Orders/import",
  POST_ORDER = "/Orders",
  GET_ORDERS = POST_ORDER,
  GET_ORDER_ROW = "/Orders/imports/:orderImportId/rows/:rowId",
  GET_IMPORTS = "/Orders/Imports",
  GET_IMPORTS_BY_ID = "/Orders/Imports/:id",
}

export const compile = (
  endpoint: string,
  params: Record<string, string | number>,
): string => {
  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value.toString());
  });
  return url;
};
