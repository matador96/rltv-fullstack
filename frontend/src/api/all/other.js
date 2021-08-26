import { get } from "../fetch.js";

export const getSiteConfigs = () => get("/other", true);
