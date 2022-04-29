import server from './server.js'
import supertest from 'supertest'
const requestWithSupertest = supertest(server)

// Integration tests
describe('API Endpoints', () => {
  it('GET / should return empty for empty/not added routes', async () => {
    const res = await requestWithSupertest.get('/A/B')
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toEqual([])
  })

  it('GET / should return error 404 for invalid request', async () => {
    const res = await requestWithSupertest.get('/')
    expect(res.status).toEqual(404)
  })

  it('GET / should return expected route based on history', async () => {
    await requestWithSupertest.put('/SFO/EWR')

    await requestWithSupertest.put('/IND/EWR')
    await requestWithSupertest.put('/SFO/ATL')
    await requestWithSupertest.put('/GSO/IND')
    await requestWithSupertest.put('/ATL/GSO')

    const res = await requestWithSupertest.get('/SFO/EWR')
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toEqual([
      ['SFO', 'EWR'],
      ['SFO', 'ATL', 'GSO', 'IND', 'EWR'],
    ])
  })

  it('PUT / should return expected new route stored', async () => {
    const res = await requestWithSupertest.put('/A/B')
    expect(res.status).toEqual(200)
    expect(res.text).toEqual('[A, B] edge stored')
  })

  it('PUT / should return error 404 for invalid request', async () => {
    const res = await requestWithSupertest.put('/')
    expect(res.status).toEqual(404)
  })
})
