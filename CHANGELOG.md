# cypress-image-snapshot

## 4.1.0

### Minor Changes

- [`fbe58b8`](https://github.com/OakNorthAI/cypress-image-snapshot/commit/fbe58b8e03f8dcdc54967ed6f260996c224faf72) [#6](https://github.com/OakNorthAI/cypress-image-snapshot/pull/6) Thanks [@lexanth](https://github.com/lexanth)! - Log image diff on success

* [`67542c6`](https://github.com/OakNorthAI/cypress-image-snapshot/commit/67542c6a9dfa002e64bc1b70ebdf5e3d02d57c46) [#2](https://github.com/OakNorthAI/cypress-image-snapshot/pull/2) Thanks [@lexanth](https://github.com/lexanth)! - Save a copy of the actual (observed) snapshot when encountering an error

- [`be7189c`](https://github.com/OakNorthAI/cypress-image-snapshot/commit/be7189c0af0ebc9bfa6d4f0da998f482615c7972) [#5](https://github.com/OakNorthAI/cypress-image-snapshot/pull/5) Thanks [@lexanth](https://github.com/lexanth)! - Add option to require snapshots to be present or fail if they're missing

### Patch Changes

- [`e449d3a`](https://github.com/OakNorthAI/cypress-image-snapshot/commit/e449d3aab1fa978a066beff36bd8b1d2c81d6987) [#3](https://github.com/OakNorthAI/cypress-image-snapshot/pull/3) Thanks [@lexanth](https://github.com/lexanth)! - Fix error messages for snapshot failures

  Previously had dimensions the wrong way round and always reported a size issue as the failure cause, even if we're allowing size mismatches.

* [`1de309f`](https://github.com/OakNorthAI/cypress-image-snapshot/commit/1de309f76775954140de0450e1f943e16cfdf2e9) [#4](https://github.com/OakNorthAI/cypress-image-snapshot/pull/4) Thanks [@lexanth](https://github.com/lexanth)! - Widen cypress peer dependency range

## 4.0.1

### Patch Changes

- [`17f7927`](https://github.com/jaredpalmer/cypress-image-snapshot/commit/17f7927384bfdbd6cbb65d344c8337d32926b691) Thanks [@jaredpalmer](https://github.com/jaredpalmer)! - When using native retries that come in Cypress v5+ real image failures are marked as passed on the retries because cypress names the snapshots as 'filename (attempt X).png (and there is no configuration option to change this). The fix just removes the ' (attempt X)' suffix from the filename.
