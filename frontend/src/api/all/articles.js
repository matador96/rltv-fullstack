import { get } from "../fetch.js";

export const getAboutMe = () => get("/articles/aboutme", true);
export const getDonateList = () => get("/articles/donate", true);
export const getRoadmap = () => get("/articles/roadmap", true);
export const getBugReport = () => get("/articles/bugreport", true);
