import { app } from '../server';
import supertest from 'supertest';
const api = supertest(app);

describe('GET /user', () => {
  it('respond with an array', async (done) => {
    const res = await api.get('/location');
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
  });

  it('responds with json', async (done) => {
    const res = await api
      .post('/location')
      .send({
        building_id: 21,
        floor: 14,
        room_num: 15,
        entry: 2222,
      })
      .set('Accept', 'application/json');
    expect(res.body[0]).toHaveProperty('id');
    done();
  });
});
