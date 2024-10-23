const fs = require('fs');
const path = require('path');
const projectRoot = process.cwd();

const assetsFolder = path.join(projectRoot, 'src', 'assets', '3d');
const manifestPath = path.join(projectRoot, 'src', 'assets', 'manifestAssets3d.json');

const textureExtensions = ['.jpg', '.png'];
const textureTypes = ['diffuse', 'normal', 'specular'];

function generateManifest() {
    const assets = [];

    function scanDirectory(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                scanDirectory(filePath);
            } else {
                const ext = path.extname(file).toLowerCase();
                const baseName = path.basename(file, ext);
                const relativePath = path.relative(assetsFolder, filePath).replace(/\\/g, '/'); // Normalize Windows paths

                if (ext === '.obj') {
                    const mtlPath = path.join(dir, `${baseName}.mtl`);
                    const mtlRelativePath = path.relative(assetsFolder, mtlPath).replace(/\\/g, '/');

                    const objEntry = {
                        alias: `${baseName}.obj`,
                        src: `assets/3d/${relativePath}`,
                        mtl: fs.existsSync(mtlPath) ? `assets/3d/${mtlRelativePath}` : null
                    };

                    assets.push(objEntry);
                } else if (ext === '.fbx') {
                    const fbxEntry = {
                        alias: `${baseName}.fbx`,
                        src: `assets/3d/${relativePath}`,
                        textures: findTexturesForModel(dir, baseName) // Find textures for the FBX model
                    };

                    assets.push(fbxEntry);
                }
            }
        });
    }

    function findTexturesForModel(directory, baseName) {
        const textures = {};

        textureTypes.forEach(type => {
            textureExtensions.forEach(ext => {
                const texturePath = path.join(directory, `${baseName}_${type}${ext}`);
                if (fs.existsSync(texturePath)) {
                    const relativeTexturePath = path.relative(assetsFolder, texturePath).replace(/\\/g, '/');
                    textures[type] = `assets/3d/${relativeTexturePath}`;
                }
            });
        });

        return Object.keys(textures).length > 0 ? textures : null;
    }

    scanDirectory(assetsFolder);

    const manifest = { assets };

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log('Manifest generated successfully:', manifestPath);
}

generateManifest();