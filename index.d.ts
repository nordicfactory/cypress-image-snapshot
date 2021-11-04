export interface Options
  extends Partial<
    {
      blackout: string[];
      capture: 'runner' | 'viewport' | 'fullPage';
      clip: { x: number; y: number; width: number; height: number };
      disableTimersAndAnimations: boolean;
      padding:
        | number
        | [number]
        | [number, number]
        | [number, number, number]
        | [number, number, number, number];
      scale: boolean;
      beforeScreenshot(doc: Document): void;
      afterScreenshot(doc: Document): void;
    } & {
      allowSizeMismatch?: boolean;
      comparisonMethod?: 'pixelmatch' | 'ssim';
      customDiffConfig?: {
        readonly threshold?: number;
        readonly includeAA?: boolean;
      };
      customSnapshotsDir?: string;
      customDiffDir?: string;
      customSnapshotIdentifier?:
        | ((
            parameters: {
              testPath: string;
              currentTestName: string;
              counter: number;
              defaultIdentifier: string;
            }
          ) => string)
        | string;
      diffDirection?: 'horizontal' | 'vertical';
      dumpDiffToConsole?: boolean;
      noColors?: boolean;
      failureThreshold?: number;
      failureThresholdType?: 'pixel' | 'percent';
      updatePassedSnapshot?: boolean;
      blur?: number;
      runInProcess?: boolean;
    }
  >
  /**
   * If set to true, the build will not fail when the screenshots to compare have different sizes.
   * @default false
   */ /**
 * The method by which images are compared.
 * `pixelmatch` does a pixel by pixel comparison, whereas `ssim` does a structural similarity comparison.
 * @default 'pixelmatch'
 */
/**
 * Custom config passed to 'pixelmatch' or 'ssim'
 */
/**
 * Custom snapshots directory.
 * Absolute path of a directory to keep the snapshot in.
 */
/**
 * A custom absolute path of a directory to keep this diff in
 */
/**
 * A custom name to give this snapshot. If not provided, one is computed automatically. When a function is provided
 * it is called with an object containing testPath, currentTestName, counter and defaultIdentifier as its first
 * argument. The function must return an identifier to use for the snapshot.
 */
/**
 * Changes diff image layout direction.
 * @default 'horizontal'
 */
/**
 * Will output base64 string of a diff image to console in case of failed tests (in addition to creating a diff image).
 * This string can be copy-pasted to a browser address string to preview the diff for a failed test.
 * @default false
 */
/**
 * Removes coloring from the console output, useful if storing the results to a file.
 * @default false.
 */
/**
 * Sets the threshold that would trigger a test failure based on the failureThresholdType selected. This is different
 * to the customDiffConfig.threshold above - the customDiffConfig.threshold is the per pixel failure threshold, whereas
 * this is the failure threshold for the entire comparison.
 * @default 0.
 */
/**
 * Sets the type of threshold that would trigger a failure.
 * @default 'pixel'.
 */
/**
 * Updates a snapshot even if it passed the threshold against the existing one.
 * @default false.
 */
/**
 * Applies Gaussian Blur on compared images, accepts radius in pixels as value. Useful when you have noise after
 * scaling images per different resolutions on your target website, usually setting its value to 1-2 should be
 * enough to solve that problem.
 * @default 0.
 */
/**
 * Runs the diff in process without spawning a child process.
 * @default false.
 */
{}
