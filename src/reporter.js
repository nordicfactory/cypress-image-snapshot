import fs from 'fs-extra';
import termImage from 'term-img';
import chalk from 'chalk';
import { cachePath } from './plugin';

function fallback() {
    // do nothing
}

function reporter(runner) {
    fs.writeFileSync(cachePath, JSON.stringify([]), 'utf8');

    runner.on('end', () => {
        const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        if (cache.length) {
            console.log(
                chalk.red(`\n  (${chalk.underline.bold('Snapshot Diffs')})`)
            ); // eslint-disable-line

            cache.forEach(({ diffRatio, diffPixelCount, diffOutputPath }) => {
                console.log(
                    // eslint-disable-line
                    `\n  - ${diffOutputPath}\n    Screenshot was ${diffRatio *
                        100}% different from saved snapshot with ${diffPixelCount} different pixels.\n`
                );
                termImage(diffOutputPath, { fallback });
            });
        }

        fs.removeSync(cachePath);
    });
}

module.exports = reporter;
