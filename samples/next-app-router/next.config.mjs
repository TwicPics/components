import withCSS from "@zeit/next-css";
import withPlugins from "next-compose-plugins";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPlugins( [ [ withCSS ] ], nextConfig );
