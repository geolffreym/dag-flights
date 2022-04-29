import server from'./server.js'
import supertest from 'supertest'
const requestWithSupertest = supertest(server);

describe('API Endpoints', () => {

    it('GET / should return empty for empty/not added routes', async () => {
        const res = await requestWithSupertest.get('/A/B');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toEqual([])
    });

    it('PUT / should return expected new route stores', async () => {
        const res = await requestWithSupertest.put('/A/B');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual("[A,B] edge stored")
    });

});