const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up...');

// Remove cache directories if they exist
const cacheDirs = [
  '.expo',
  'node_modules/.cache',
];

cacheDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dir}...`);
    try {
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${dirPath}"`);
      } else {
        execSync(`rm -rf "${dirPath}"`);
      }
    } catch (err) {
      console.error(`Failed to remove ${dir}: ${err.message}`);
    }
  }
});

// Clear Metro bundler cache
console.log('Clearing Metro bundler cache...');
try {
  execSync('npx react-native start --reset-cache', { stdio: 'inherit' });
} catch (err) {
  console.error(`Failed to clear Metro cache: ${err.message}`);
}

console.log('✨ Cleanup complete! You can now start your app with:');
console.log('npx expo start --clear'); 