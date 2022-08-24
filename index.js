const http = require("http");
const fs = require("fs");

let count = 0;

const readFile = (path) => {
	return new Promise ((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if(err) reject(err)
			else resolve(data);
		})
	})
}

const index = http.createServer(async (req, res) => {
	count++

	switch (req.url) {
		case '/students':
			res.write("Students")
			res.end();
			break
		case "/home":
			const data = await readFile("pages/home.html");
			res.write(data);
			res.end();
			break
		default:
			res.write('404 Not Found');
			res.end();
	}
});

index.listen(3003);
