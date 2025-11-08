#!/usr/bin/env node
/**
 * Verify Govindgarh coordinates are correct (near Chomu)
 */

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100;
}

// Chomu coordinates
const chomuLat = 27.1524;
const chomuLon = 75.7196;

// New Govindgarh coordinates (near Jaipur/Chomu)
const govindgarhLat = 27.2440;
const govindgarhLon = 75.6584;

const distance = calculateDistance(chomuLat, chomuLon, govindgarhLat, govindgarhLon);

console.log('\n🔍 Distance Verification:');
console.log('=====================================');
console.log(`Chomu: ${chomuLat}, ${chomuLon}`);
console.log(`Govindgarh (NEW): ${govindgarhLat}, ${govindgarhLon}`);
console.log(`Distance: ${distance} km`);
console.log('=====================================\n');

if (distance <= 20) {
    console.log(`✅ CORRECT: ${distance}km is close to the expected ~14km`);
    console.log('   (Small difference due to exact location within towns)');
} else {
    console.log(`⚠️  WARNING: ${distance}km seems too far. Expected ~14km`);
}

console.log('\n📍 Now testing with your search location:');
const searchLat = 27.2403269;
const searchLon = 75.6471802;

const distanceFromSearch = calculateDistance(searchLat, searchLon, govindgarhLat, govindgarhLon);

console.log(`Search Location: ${searchLat}, ${searchLon}`);
console.log(`Govindgarh: ${govindgarhLat}, ${govindgarhLon}`);
console.log(`Distance: ${distanceFromSearch} km`);

if (distanceFromSearch <= 50) {
    console.log(`\n✅ SUCCESS: Within 50km filter! Workers will appear in search results.\n`);
} else {
    console.log(`\n❌ FAIL: Still exceeds 50km filter\n`);
}
