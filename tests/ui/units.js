// This file defines the list of frameworks to be tested.
const units = [
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
    only: true
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

export const getFrameworks = ( filters = `` ) => {
    const filterArray = filters.split( `,` ).map( f => f.trim() ).filter( f => f );
    const inclusiveFilters = filterArray.filter( f => !f.startsWith( `^` ) );
    const exclusiveFilters = filterArray.filter( f => f.startsWith( `^` ) ).map( f => f.substring(1) );
    let frameworks = units;

    if ( inclusiveFilters.length ) {
        const matchedFrameworks = units.filter(
            unit => inclusiveFilters.some( filter => new RegExp( `^${ filter }` ).test( unit.framework ) )
        );
        frameworks = matchedFrameworks.length ? matchedFrameworks : frameworks;
    }

    if ( exclusiveFilters.length ) {
        frameworks = frameworks.filter(
            unit => !exclusiveFilters.some( filter => new RegExp( `^${ filter }` ).test( unit.framework ) )
        );
    }

    return frameworks.length > 0 ? frameworks : units;
}


