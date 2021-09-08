const {
  timeLeftendOfSeason,
  siteStatus,
  season,
  seasons,
  alertOnHeader,
} = require("../constant/anyConfig");

module.exports.getSiteConfigs = async (req, res) => {
  try {
    const data = {
      timeLeftendOfSeason,
      siteStatus,
      season,
      seasons,
      alertOnHeader,
    };

    const fileName = "./../json/anyData.json";
    const file = require(fileName);

    data.lastHourOnline = file.lastHourOnline;
    data.trackedPlayers = file.trackedPlayers;

    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getLastSearchers = async (req, res) => {
  try {
    const fileName = "./../json/last-searcheds.json";
    const file = require(fileName);

    return res.status(200).json({ status: 200, data: file });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getRankDistribution = async (req, res) => {
  try {
    const fileName = "./../json/rankDistribution.json";
    const file = require(fileName);

    return res.status(200).json({ status: 200, data: file });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getSitemap = async (req, res) => {
  try {
    res.write('<?xml version="1.0" encoding="UTF-8"?>');
    res.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    res.write(
      "<url><loc>https://rltv.top</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>"
    );

    res.write(
      "<url><loc>https://rltv.top/roadmap</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>"
    );
    res.write(
      "<url><loc>https://rltv.top/bugreport</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>"
    );
    res.write(
      "<url><loc>https://rltv.top/donate</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>"
    );
    res.write(
      "<url><loc>https://rltv.top/aboutme</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>"
    );
    res.write(
      "<url><loc>https://rltv.top/distribution</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>"
    );
    res.write(
      "<url><loc>https://rltv.top/favorites</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>"
    );

    // priority 1, weekly monthly daily

    res.end("</urlset>");
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};
