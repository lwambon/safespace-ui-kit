const { updateHotspot, getHotspots } = require('../models/hotspotModel');

const updateHotspotController = async (req, res) => {
  try {
    const hotspot = await updateHotspot(req.body);
    res.status(201).json(hotspot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update hotspot' });
  }
};

const getHotspotsController = async (req, res) => {
  try {
    const hotspots = await getHotspots();
    res.json(hotspots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
};

module.exports = { updateHotspot: updateHotspotController, getHotspots: getHotspotsController };