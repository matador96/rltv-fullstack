import { get } from "../fetch.js";

export const getSiteConfigs = () => get("/other/configs", true);
export const getLastSearchers = () => get("/other/lastsearchers", true);
export const getRankDistribution = () => get("/other/rankdistribution", true);
