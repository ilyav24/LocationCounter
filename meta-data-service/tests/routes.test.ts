import { Building } from './../models/building/building';
import { app } from '../server';
import supertest from 'supertest';
const api = supertest(app);
let id: string;
describe('Test /buildling', () => {
  it('respond with an array', async (done) => {
    const res = await api.get('/building');
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
  });

  it('responds with an id', async (done) => {
    let building: Building = {
      id: '1',
      number_of_floors: 5,
      name: 'test',
    };
    const res = await api
      .post('/building')
      .send({
        name: building.name,
        number_of_floors: building.number_of_floors,
      })
      .set('Accept', 'application/json');
    expect(res.body[0]).toHaveProperty('id');
    id = res.body[0].id;
    done();
  });

  it('should delete the building', async (done) => {
    let res = await api.delete('/building/' + id);
    expect(res.body.data).toBeTruthy();
    res = await api.get('/building');

    for (let i in res.body) {
      expect(res.body[i].id == id).toBeFalsy();
    }
    done();
  });
});

describe('Test /location', () => {
  it('respond with an array', async (done) => {
    const res = await api.get('/location');
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
  });

  it('responds with an id', async (done) => {
    const res = await api
      .post('/location')
      .send({
        building_id: 1,
        floor: 14,
        room_num: 15,
        entry: 2222,
      })
      .set('Accept', 'application/json');
    expect(res.body[0]).toHaveProperty('id');
    id = res.body[0].id;
    done();
  });

  it('should delete the location', async (done) => {
    let res = await api.delete('/location/' + id);
    expect(res.body.data).toBeTruthy();
    res = await api.get('/location');

    for (let i in res.body) {
      expect(res.body[i].id == id).toBeFalsy();
    }
    done();
  });
});
