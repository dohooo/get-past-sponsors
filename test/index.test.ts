import { describe, it } from 'vitest'
import get from '../src'


describe('should', () => {
  it('exported', async () => {
    const users = await get('dohooo')
    console.log(users)
  })
})
