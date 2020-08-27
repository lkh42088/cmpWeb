import client from "./client";

/*--------------------------------------------------------------------------*/
// Code MENU
export const getCodes = () => client.get("/v1/codes");
export const getCodesTag = () => client.get("/v1/codesetting/menu/tag");
export const getMainCodeByType = ({
                                      type, subType,
                                  }) => client.get(`/v1/codesetting/code/${type}/${subType}`);

export const getSubCodeByIdx = ({
                                    type, subType, idx,
                                }) => client.get(`/v1/codesetting/code/${type}/${subType}/${idx}`);
