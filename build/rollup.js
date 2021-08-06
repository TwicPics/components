import { rollup } from "rollup";

export default async options => {
    const bundle = await rollup( options );
    if ( Array.isArray( options.output ) ) {
        await Promise.all( options.output.map( bundle.generate ) );
        await Promise.all( options.output.map( bundle.write ) );
    } else {
        await bundle.generate( options.output );
        await bundle.write( options.output );
    }
    await bundle.close();
};
