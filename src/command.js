/**
 * Copyright (c) 2018-present The Palmer Group
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MATCH, RECORD } from './constants';

const screenshotsFolder = Cypress.config('screenshotsFolder');
const updateSnapshots = Cypress.env('updateSnapshots') || false;
const failOnSnapshotDiff =
  typeof Cypress.env('failOnSnapshotDiff') === 'undefined';

function getPixelDiff(diffRatio, diffPixelCount) {
  return `Image was ${diffRatio *
    100}% different from saved snapshot with ${diffPixelCount} different pixels.`;
}

function getErrorMessage(
  diffSize,
  allowSizeMismatch,
  imageDimensions,
  diffOutputPath,
  diffRatio,
  diffPixelCount
) {
  const seeDiff = `See diff for details: ${diffOutputPath}`;

  const pixelDiff = getPixelDiff(diffRatio, diffPixelCount);

  if (diffSize) {
    const newSnapshotDimensions = `${imageDimensions.receivedWidth}x${
      imageDimensions.receivedHeight
    }`;
    const oldSnapshotDimensions = `${imageDimensions.baselineWidth}x${
      imageDimensions.baselineHeight
    }`;
    if (!allowSizeMismatch) {
      return `Image size of new snapshot (${newSnapshotDimensions}) different than saved snapshot size (${oldSnapshotDimensions}).\n
        ${seeDiff}`;
    }
    return `${pixelDiff}\n
        New snapshot was also ${newSnapshotDimensions} when saved snapshot was ${oldSnapshotDimensions}.\n
        ${seeDiff}`;
  }
  return `${pixelDiff}\n${seeDiff}`;
}

export function matchImageSnapshotCommand(defaultOptions) {
  return function matchImageSnapshot(subject, maybeName, commandOptions) {
    const options = {
      ...defaultOptions,
      ...((typeof maybeName === 'string' ? commandOptions : maybeName) || {}),
    };
    const allowSizeMismatch = !!options.allowSizeMismatch;

    cy.task(MATCH, {
      screenshotsFolder,
      updateSnapshots,
      options,
    });

    const name = typeof maybeName === 'string' ? maybeName : undefined;
    const target = subject ? cy.wrap(subject) : cy;
    target.screenshot(name, options);

    return cy
      .task(RECORD)
      .then(
        ({
          pass,
          added,
          updated,
          diffSize,
          imageDimensions,
          diffRatio,
          diffPixelCount,
          diffOutputPath,
        }) => {
          if (!pass && !added && !updated) {
            const message = getErrorMessage(
              diffSize,
              allowSizeMismatch,
              imageDimensions,
              diffOutputPath,
              diffRatio,
              diffPixelCount
            );
            if (failOnSnapshotDiff) {
              throw new Error(message);
            } else {
              Cypress.log({ message });
            }
          }
        }
      );
  };
}

export function addMatchImageSnapshotCommand(
  maybeName = 'matchImageSnapshot',
  maybeOptions
) {
  const options = typeof maybeName === 'string' ? maybeOptions : maybeName;
  const name = typeof maybeName === 'string' ? maybeName : 'matchImageSnapshot';
  Cypress.Commands.add(
    name,
    {
      prevSubject: ['optional', 'element', 'window', 'document'],
    },
    matchImageSnapshotCommand(options)
  );
}
