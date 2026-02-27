/**
 * EDT (Effective Disclosure Tier) Calculator
 *
 * Calculates the minimum tier visible between two users
 * based on completed tiers and shared tier permissions.
 *
 * Usage:
 *   node calculate-edt.js <yourCompleted> <theirCompleted> <youShared> <theyShared>
 *
 * Example:
 *   node calculate-edt.js 4 3 3 2
 *   Output: EDT = 2
 */

function calculateEDT(yourCompleted, theirCompleted, youShared, theyShared) {
  // Validate inputs
  const values = [yourCompleted, theirCompleted, youShared, theyShared];

  if (values.some(v => v < 0 || v > 5 || !Number.isInteger(v))) {
    throw new Error('All values must be integers between 0 and 5');
  }

  // EDT is the minimum of all four values
  const edt = Math.min(...values);

  return {
    edt,
    breakdown: {
      yourCompleted,
      theirCompleted,
      youShared,
      theyShared,
    },
    visibleTiers: Array.from({ length: edt }, (_, i) => i + 1),
    lockedTiers: Array.from({ length: 5 - edt }, (_, i) => edt + i + 1),
  };
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 4) {
    console.error('Usage: node calculate-edt.js <yourCompleted> <theirCompleted> <youShared> <theyShared>');
    console.error('Example: node calculate-edt.js 4 3 3 2');
    process.exit(1);
  }

  const [yourCompleted, theirCompleted, youShared, theyShared] = args.map(Number);

  try {
    const result = calculateEDT(yourCompleted, theirCompleted, youShared, theyShared);

    console.log('\n=== EDT Calculation Result ===');
    console.log(`\nEDT: ${result.edt}`);
    console.log(`\nBreakdown:`);
    console.log(`  You completed:  Tier ${result.breakdown.yourCompleted}`);
    console.log(`  They completed: Tier ${result.breakdown.theirCompleted}`);
    console.log(`  You sharing:    Tier ${result.breakdown.youShared}`);
    console.log(`  They sharing:   Tier ${result.breakdown.theyShared}`);
    console.log(`\nVisible Tiers: ${result.visibleTiers.join(', ') || 'None'}`);
    console.log(`Locked Tiers:  ${result.lockedTiers.join(', ') || 'None'}\n`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { calculateEDT };
