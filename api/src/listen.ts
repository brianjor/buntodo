import app from "./index.ts";

const port = 8080;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
