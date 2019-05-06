module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'deployment',
	DB_URL:
		process.env.DB_URL || 'postgresql://jordanepps@localhost/find_the_recipe',
	JWT_SECRET:
		process.env.JWT_SECRET ||
		'9526DD0E61D1305FBFA33BBEDC3DA1ABCAEDBC2B3F609824AEB65EB1941221B3',
	JWT_EXPIRY: process.env.JWT_EXPIRY || '24h'
};
