export class CreatedUserEvent {
  constructor(public readonly userId: string, public readonly name: string) {}
}
