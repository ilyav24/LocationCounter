import { Building } from './../models/building/building';
import { app } from '../server';
import supertest from 'supertest';
const api = supertest(app);
let id: string;
let buildingId: string;

describe('Test /buildling', () => {
  it('respond with an array', async (done) => {
    const res = await api.get('/building');
    expect(Array.isArray(res.body.data)).toBeTruthy();
    done();
  });

  it('responds with an id', async (done) => {
    let building: Building = {
      id: '34',
      number_of_floors: 5,
      name: 'test',
      capacity: 500,
    };
    const res = await api
      .post('/building')
      .send({
        name: building.name,
        number_of_floors: building.number_of_floors,
        capacity: building.capacity,
      })
      .set('Accept', 'application/json');
    expect(res.body.data[0]).toHaveProperty('id');
    id = res.body.data[0].id;
    done();
  });

  it('should delete the building', async (done) => {
    let res = await api.delete('/building/' + id);
    expect(res.body.data).toBeTruthy();
    res = await api.get('/building');

    for (let i in res.body.data) {
      expect(res.body.data[i].id == id).toBeFalsy();
    }
    done();
  });
});

describe('Test /location', () => {
  it('respond with an array', async (done) => {
    const res = await api.get('/location');
    expect(Array.isArray(res.body.data)).toBeTruthy();
    done();
  });

  it('responds with an id', async (done) => {
    let res = await api
      .post('/building')
      .send({
        name: 'test',
        number_of_floors: 5,
        capacity: 500,
      })
      .set('Accept', 'application/json');
    expect(res.body.data[0]).toHaveProperty('id');
    buildingId = res.body.data[0].id;
    res = await api
      .post('/location')
      .send({
        building_id: buildingId,
        floor: 14,
        name: 'yuval',
        room_num: 15,
        entry: 2222,
      })
      .set('Accept', 'application/json');
    expect(res.body.data[0]).toHaveProperty('id');
    id = res.body.data[0].id;
    done();
  });

  it('should delete the location', async (done) => {
    let res = await api.delete('/location/' + id);
    expect(res.body.data).toBeTruthy();
    res = await api.get('/location');

    for (let i in res.body.data) {
      expect(res.body.data[i].id == id).toBeFalsy();
    }
    await api.delete('/building/' + buildingId);
    done();
  });
});

describe('Tests delete /buildling', () => {
  it('should delete all the locations in the building', async (done) => {
    let res = await api.post('/building').send({
      number_of_floors: 5,
      name: 'test',
      capacity: 500,
    });
    id = res.body.data[0].id;
    res = await api.post('/location').send({
      building_id: id,
      name: 'yuval',
      floor: 14,
      room_num: 15,
      entry: 2222,
    });
    res = await api.delete('/building/' + id);
    res = await api.get('/location');
    for (let i in res.body.data) {
      expect(res.body.data[i].buidling_id == id).toBeFalsy();
    }
    done();
  });
});
