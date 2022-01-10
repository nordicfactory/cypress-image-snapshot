import { Options } from './index';

declare function addMatchImageSnapshotCommand(
  nameOrOptions?: string | Options
): void;
declare function addMatchImageSnapshotCommand(
  name: string,
  options: Options
): void;

declare global {
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot(nameOrOptions?: string | Options): void;
      matchImageSnapshot(name: string, options: Options): void;
    }
  }
}

export { addMatchImageSnapshotCommand };
