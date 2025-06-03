import path from "path";

const dirname = path.dirname(require.main?.filename ?? "");

export default dirname;
