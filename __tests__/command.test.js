/**
 * Copyright (c) 2018-present The Palmer Group
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const DEFAULT_ENV_VARS = {
  // Confusingly, any value of `failOnSnapshotDiff` other than undefined is currently treated as truthy
  failOnSnapshotDiff: undefined,
  requireSnapshots: true,
};

global.Cypress = {
  env: envVar => {
    return envVar in DEFAULT_ENV_VARS ? DEFAULT_ENV_VARS[envVar] : false;
  },
  log: () => null,
  config: () => '/cypress/screenshots',
  Commands: {
    add: jest.fn(),
  },
};

global.cy = {
  wrap: subject => subject,
};

const {
  matchImageSnapshotCommand,
  addMatchImageSnapshotCommand,
} = require('../src/command');

const defaultOptions = {
  failureThreshold: 0,
  failureThresholdType: 'pixel',
};

const boundMatchImageSnapshot = matchImageSnapshotCommand(defaultOptions).bind({
  test: 'snap',
});
const subject = { screenshot: jest.fn() };
const commandOptions = {
  failureThreshold: 10,
};

describe('command', () => {
  it('should pass options through', async () => {
    global.cy.task = jest.fn().mockResolvedValue({ pass: true });

    await boundMatchImageSnapshot(subject, commandOptions);

    expect(cy.task).toHaveBeenCalledWith('Matching image snapshot', {
      screenshotsFolder: '/cypress/screenshots',
      updateSnapshots: false,
      options: {
        failureThreshold: 10,
        failureThresholdType: 'pixel',
      },
    });
  });

  it('should pass', async () => {
    global.cy.task = jest.fn().mockResolvedValue({ pass: true });

    await expect(
      boundMatchImageSnapshot(subject, commandOptions)
    ).resolves.not.toThrow();
  });

  it('should fail', async () => {
    global.cy.task = jest.fn().mockResolvedValue({
      pass: false,
      added: false,
      updated: false,
      diffRatio: 0.1,
      diffPixelCount: 10,
      diffOutputPath: 'cheese',
    });

    await expect(boundMatchImageSnapshot(subject, commandOptions)).rejects
      .toThrowErrorMatchingInlineSnapshot(`
"Image was 10% different from saved snapshot with 10 different pixels.
See diff for details: cheese"
`);
  });

  it('should fail for a size difference', async () => {
    global.cy.task = jest.fn().mockResolvedValue({
      pass: false,
      added: false,
      updated: false,
      diffRatio: 0.1,
      diffPixelCount: 10,
      diffOutputPath: 'cheese',
      diffSize: true,
      imageDimensions: {
        receivedWidth: 100,
        receivedHeight: 200,
        baselineWidth: 100,
        baselineHeight: 150,
      },
    });

    await expect(
      boundMatchImageSnapshot(subject, {
        ...commandOptions,
        allowSizeMismatch: false,
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
"Image size of new snapshot (100x200) different than saved snapshot size (100x150).

        See diff for details: cheese"
`);
  });

  it('should fail if requireSnapshots is true and a snapshot is added', async () => {
    global.cy.task = jest.fn().mockResolvedValue({
      pass: false,
      added: true,
      updated: false,
      diffRatio: 0.1,
      diffPixelCount: 10,
      diffOutputPath: 'cheese',
    });
    await expect(boundMatchImageSnapshot(subject, 'snap name', commandOptions))
      .rejects.toThrowErrorMatchingInlineSnapshot(`
"New snapshot snap name was added, but 'requireSnapshots' was set to true.
            This is likely because this test was run in a CI environment in which snapshots should already be committed."
`);
  });

  it('should add command', () => {
    Cypress.Commands.add.mockReset();
    addMatchImageSnapshotCommand();
    expect(Cypress.Commands.add).toHaveBeenCalledWith(
      'matchImageSnapshot',
      { prevSubject: ['optional', 'element', 'window', 'document'] },
      expect.any(Function)
    );
  });

  it('should add command with custom name', () => {
    Cypress.Commands.add.mockReset();
    addMatchImageSnapshotCommand('sayCheese');
    expect(Cypress.Commands.add).toHaveBeenCalledWith(
      'sayCheese',
      { prevSubject: ['optional', 'element', 'window', 'document'] },
      expect.any(Function)
    );
  });

  it('should add command with options', () => {
    Cypress.Commands.add.mockReset();
    addMatchImageSnapshotCommand({ failureThreshold: 0.1 });
    expect(Cypress.Commands.add).toHaveBeenCalledWith(
      'matchImageSnapshot',
      { prevSubject: ['optional', 'element', 'window', 'document'] },
      expect.any(Function)
    );
  });
});
