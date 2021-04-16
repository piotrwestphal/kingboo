export abstract class TopHotelsRepository {
  abstract find(searchId: string): Promise<any>
}
