const frameworks = [
  {
    "framework": `angular`,
    "port": 4000,
  },
  {
    "framework": `next`,
    "port": 4010,
  },
  {
    "framework": `nuxt2`,
    "port": 4020,
  },
  {
    "framework": `nuxt3`,
    "port": 4030,
  },
  {
    "framework": `react`,
    "port": 4040,
  },
  {
    "framework": `svelte3`,
    "port": 4050,
  },
  {
    "framework": `svelte4`,
    "port": 4060,
  },
  {
    "framework": `svelte5`,
    "port": 4070,
  },
  {
    "framework": `sveltekit`,
    "port": 4080,
  },
  {
    "framework": `vue2`,
    "port": 4090,
  },
  {
    "framework": `vue3`,
    "port": 4100,
  },
]

const only = frameworks.find( f => f.only );
export default only ? [ only ] : frameworks.filter( f => !f.disabled );

