var format = require('util').format;

function rule(analyzer) {
	var data = require('./prefixes.json'),
		prefixes = data.prefixes;

	analyzer.setMetric('oldPropertyPrefixes');

	analyzer.on('declaration', function(rule, property, value) {
		var prefixData = prefixes[property];

		// prefix needs to be kept
		if (prefixData && !prefixData.keep) {
			analyzer.incrMetric('oldPropertyPrefixes');
			analyzer.addOffender('oldPropertyPrefixes', format('%s { %s: %s } // %s', rule.selectors.join(', '), property, value, prefixData.msg));
		}
	});
}

rule.description = 'Reports outdated vendor prefixes';
module.exports = rule;
