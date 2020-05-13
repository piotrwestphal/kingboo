import { DifferenceFinder } from './difference.finder';

describe('DifferenceFinder', () => {

  const finder = new DifferenceFinder();

  it('should find differences in arrays', () => {
    const { searchIdsToCreate, searchIdsToDelete, differencesFound } = finder.find(['A', 'B', 'C'], ['B', 'C', 'D']);
    expect(differencesFound).toBeTruthy();
    expect(searchIdsToCreate.length).toBe(1);
    expect(searchIdsToDelete.length).toBe(1);
    expect(searchIdsToCreate.includes('A')).toBeTruthy();
    expect(searchIdsToDelete.includes('D')).toBeTruthy();
  });

  it('should not find differences', () => {
    const { searchIdsToCreate, searchIdsToDelete, differencesFound } = finder.find(['A', 'B', 'C'], ['B', 'C', 'A']);
    expect(differencesFound).toBeFalsy();
    expect(searchIdsToCreate.length).toBe(0);
    expect(searchIdsToDelete.length).toBe(0);
  });

  it('3', () => {
    const { searchIdsToCreate, searchIdsToDelete, differencesFound } = finder.find(['A', 'B', 'C', 'D'], ['B', 'C', 'A']);
    expect(differencesFound).toBeTruthy();
    expect(searchIdsToCreate.length).toBe(1);
    expect(searchIdsToDelete.length).toBe(0);
    expect(searchIdsToCreate.includes('D')).toBeTruthy();
  });

  it('4', () => {
    const { searchIdsToCreate, searchIdsToDelete, differencesFound } = finder.find(['A', 'B', 'C'], ['B', 'C', 'A', 'D']);
    expect(differencesFound).toBeTruthy();
    expect(searchIdsToCreate.length).toBe(0);
    expect(searchIdsToDelete.length).toBe(1);
    expect(searchIdsToDelete.includes('D')).toBeTruthy();
  });
});
