export class UpdatedUserEvent {
  constructor(public readonly userId: string, public readonly name: string) {}
}
