const fs = require('fs');
const path = require('path');
const projectRoot = process.cwd();

const assetsFolder = path.join(projectRoot, 'src', 'assets', '2d');
const manifestPath = path.join(projectRoot, 'src', 'assets', 'manifestAssets2d.json');

const supportedExtensions = ['.png', '.jpg', '.jpeg'];

function generateManifest() {
    const assets = [];

    function scanDirectory(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                scanDirectory(filePath);
            } else if (supportedExtensions.includes(path.extname(file).toLowerCase())) {
                const relativePath = path.relative(assetsFolder, filePath).replace(/\\/g, '/'); // Normalize Windows paths
                assets.push({
                    alias: relativePath,
                    src: `assets/2d/${relativePath}`
                });
            }
        });
    }

    scanDirectory(assetsFolder);

    const manifest = { assets };

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log('Manifest generated successfully:', manifestPath);
}

generateManifest();