let roomsLayer;

fetch("http://localhost:3000/QgisBuildingModel/data/index/scene.json")
  .then((response) => response.json())
  .then((data) => {
    roomsLayer = data.layers[0];
  });

function fetchRoomsData() {
  return fetch("http://localhost:5000/stats/rooms").then((response) =>
    response.json()
  );
}

async function refreshData() {
  if (roomsLayer) {
    const countData = await fetchRoomsData();
    const blocks = roomsLayer.data.blocks;

    for (block of blocks) {
      const features = block.features;

      for (feature of features) {
        const roomId = feature.prop[3];
        const peopleCount = countData[roomId];

        feature.prop[0] = peopleCount;
        feature.prop[4] = `${roomId} | ${peopleCount}`;
        feature.mtl.face = Math.floor(peopleCount / 20);
      }
    }

    app.loadJSONObject(roomsLayer);
  }

  setTimeout(refreshData, 5000);
}

refreshData();
