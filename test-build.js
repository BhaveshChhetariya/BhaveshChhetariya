const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Checking Angular project for errors...\n');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed\n');
    } catch (error) {
        console.error('❌ Failed to install dependencies:', error.message);
        process.exit(1);
    }
}

// Try to build the project
console.log('🔨 Building project to check for errors...');
try {
    execSync('npx ng build --configuration development', { stdio: 'inherit' });
    console.log('\n✅ Build successful! No compilation errors found.');
    console.log('\n🚀 You can now run: npm start');
} catch (error) {
    console.error('\n❌ Build failed. Check the errors above.');
    console.log('\n💡 Common fixes:');
    console.log('   - Check TypeScript syntax errors');
    console.log('   - Verify all imports are correct');
    console.log('   - Make sure all components are properly exported');
    process.exit(1);
}
