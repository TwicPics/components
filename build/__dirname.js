import { dirname } from "path";
import { fileURLToPath } from "url";

export default dirname( fileURLToPath( import.meta.url ) );
