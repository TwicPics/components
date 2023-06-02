import transpile from "next-transpile-modules";

const withTM = transpile( [ `@twicpics/components-sample` ] );

const nextConfig = withTM( {
    "test": /\.jsx$/,
} );

export default nextConfig;
