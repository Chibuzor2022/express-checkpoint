const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to restrict access to working hours
function workingHoursMiddleware(req, res, next) {
	const now = new Date();
	const day = now.getDay(); // days starting with Saunday=0;
	const hour = now.getHours(); //hours

	if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
		next();
	} else {
		res.send("<h1>We are closed. Our working time (Mon-Fri, 9 AM - 5 PM)</h1>");
	}
}

// Use middleware
app.use(workingHoursMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/services", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "services.html"));
});

app.get("/contact", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
