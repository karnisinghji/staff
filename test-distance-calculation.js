#!/usr/bin/env node
/**
 * Calculate distance between two locations
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

// Your search location (Chomu Tehsil)
const searchLat = 27.2403269;
const searchLon = 75.6471802;

// Govindgarh (predefined)
const govindgarhLat = 26.5028;
const govindgarhLon = 76.9904;

const distance = calculateDistance(searchLat, searchLon, govindgarhLat, govindgarhLon);

console.log('\n🔍 Distance Calculation:');
console.log('=====================================');
console.log(`Search Location (Chomu Tehsil): ${searchLat}, ${searchLon}`);
console.log(`Govindgarh: ${govindgarhLat}, ${govindgarhLon}`);
console.log(`Distance: ${distance} km`);
console.log('=====================================\n');

if (distance <= 50) {
    console.log('✅ PASS: Within 50km filter');
} else {
    console.log(`❌ FAIL: Exceeds 50km filter (by ${(distance - 50).toFixed(2)} km)`);
}

console.log('\n💡 The issue: You searched from "Chomu Tehsil" but workers are in "Govindgarh"');
console.log('   These are actually ~160km apart!');
console.log('\n✅ Solution: Search from "Govindgarh" instead of "Chomu Tehsil"\n');
