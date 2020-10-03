let roomsLayer;

fetch(
  `${window.location.origin}/locationCounter/QgisBuildingModel/data/index/scene.json`
)
  .then((response) => response.json())
  .then((data) => {
    roomsLayer = data.layers[0];
  });

window.addEventListener("message", updateModel);

function updateModel(event) {
  if (event.origin === window.location.origin) {
    const roomCountTable = event.data;

    if (!roomsLayer) {
      setTimeout(updateModel, 200, event);
    } else {
      const blocks = roomsLayer.data.blocks;

      for (block of blocks) {
        updateFeatures(block.features, roomCountTable);
      }

      app.loadJSONObject(roomsLayer);
    }
  }
}

function updateFeatures(features, roomCountTable) {
  for (feature of features) {
    const roomId = feature.prop[3];
    let peopleCount = Math.abs(roomCountTable[roomId]); // abs for testing against api

    if (peopleCount) {
      feature.prop[0] = peopleCount.toString();
      feature.prop[4] = `${roomId} | ${peopleCount}`;

      const OccupancyColor = Math.floor(peopleCount / 20);

      if (OccupancyColor > 4) feature.mtl.face = 4;
      else feature.mtl.face = OccupancyColor;
    } else {
      feature.prop[0] = "Unknown";
      feature.prop[4] = `${roomId} | Unknown`;
    }
  }
}
