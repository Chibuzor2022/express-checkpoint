function timeCheck(req, res, next) {
	const now = new Date();
	const day = now.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
	const hour = now.getHours();

	const isWeekday = day >= 1 && day <= 6;
	const isWorkingHour = hour >= 8 && hour < 17;

	if (isWeekday && isWorkingHour) {
		next();
	} else {
		res.send(
			'<h1 style="text-align:center;margin-top:20%">⏰ This website is only available from Monday to Friday, 9AM to 5PM</h1>'
		);
	}
}

module.exports = timeCheck;
