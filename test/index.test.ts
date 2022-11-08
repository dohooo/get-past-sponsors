import { describe, expect, it, test } from 'vitest'
import get, { TUser } from '../src'


describe('should', () => {
  let allSponsors: TUser[] = []

  it('include private sponsors', async () => {
    const sponsors = await get('dohooo', { privateSponsor: true })
    allSponsors = sponsors
    expect(sponsors.length).gt(0)
  }, 0)

  it('exclude private sponsors', async () => {
    const sponsors = await get('dohooo', { privateSponsor: false })
    expect(sponsors.length).lt(allSponsors.length)
  }, 0)
})
