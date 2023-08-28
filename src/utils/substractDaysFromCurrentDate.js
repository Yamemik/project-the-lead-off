function subtractDays(days) {
	const now = new Date();
	return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
}

export default subtractDays;
