import { DifferenceFinder } from './difference.finder'
import { SearchRequest } from '../../core/model/SearchRequest'

describe('DifferenceFinder', () => {

  const finder = new DifferenceFinder()

  it('should find differences [1]', () => {
    // given
    const current = [
      {searchId: 'A'},
      {searchId: 'B'},
      {searchId: 'C'},
    ] as SearchRequest[]
    const existing = [
      {searchId: 'B'},
      {searchId: 'C'},
      {searchId: 'D'},
    ] as SearchRequest[]

    // when
    const { searchReqsToCreate, searchReqsToDelete, differencesFound } = finder.find(current, existing)

    // then
    expect(differencesFound).toBeTruthy()
    expect(searchReqsToCreate.length).toBe(1)
    expect(searchReqsToDelete.length).toBe(1)
    expect(searchReqsToCreate.map(v => v.searchId).includes('A')).toBeTruthy()
    expect(searchReqsToDelete.map(v => v.searchId).includes('D')).toBeTruthy()
  })

  it('should find differences [2]', () => {
    // given
    const current = [
      {searchId: 'A'},
      {searchId: 'B'},
      {searchId: 'C'},
      {searchId: 'D'},
    ] as SearchRequest[]
    const existing = [
      {searchId: 'B'},
      {searchId: 'C'},
      {searchId: 'A'},
    ] as SearchRequest[]

    // when
    const { searchReqsToCreate, searchReqsToDelete, differencesFound } = finder.find(current, existing)

    // then
    expect(differencesFound).toBeTruthy()
    expect(searchReqsToCreate.length).toBe(1)
    expect(searchReqsToDelete.length).toBe(0)
    expect(searchReqsToCreate.map(v => v.searchId).includes('D')).toBeTruthy()
  })

  it('should find differences [3]', () => {
    // given
    const current = [
      {searchId: 'A'},
      {searchId: 'B'},
      {searchId: 'C'},
    ] as SearchRequest[]
    const existing = [
      {searchId: 'B'},
      {searchId: 'C'},
      {searchId: 'A'},
      {searchId: 'D'},
    ] as SearchRequest[]

    // when
    const { searchReqsToCreate, searchReqsToDelete, differencesFound } = finder.find(current, existing)

    // then
    expect(differencesFound).toBeTruthy()
    expect(searchReqsToCreate.length).toBe(0)
    expect(searchReqsToDelete.length).toBe(1)
    expect(searchReqsToDelete.map(v => v.searchId).includes('D')).toBeTruthy()
  })

  it('should not find differences', () => {
    // given
    const current = [
      {searchId: 'A'},
      {searchId: 'B'},
      {searchId: 'C'},
    ] as SearchRequest[]
    const existing = [
      {searchId: 'B'},
      {searchId: 'C'},
      {searchId: 'A'},
    ] as SearchRequest[]

    // when
    const { searchReqsToCreate, searchReqsToDelete, differencesFound } = finder.find(current, existing)

    // then
    expect(differencesFound).toBeFalsy()
    expect(searchReqsToCreate.length).toBe(0)
    expect(searchReqsToDelete.length).toBe(0)
  })
})
