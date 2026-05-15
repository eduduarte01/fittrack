import {describe, test, expect} from 'vitest'

describe('Health Check', () => {
    test('GET /health - deve retornar status OK', async ()=>{
        const response = await fetch ('http://localhost:3000/health')
        const body = await response.json()

        expect(response.status).toBe(200)
        expect(body.status).toBe('OK')
    })
})