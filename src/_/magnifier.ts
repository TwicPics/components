/* eslint-disable no-magic-numbers */
const ease = ( t: number, d: number ): number => {
    if ( ( t < 0 ) || ( t > d ) ) {
        return undefined;
    }
    let n = 2 * t / d;
    if ( n < 1 ) {
        return d / 2 * ( n ** 3 );
    }
    n -= 2;
    return d / 2 * ( ( n ** 3 ) + 2 );
};

const move = ( e: MouseEvent | TouchEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLElement;
    // eslint-disable-next-line no-shadow
    const { left, top, right, bottom } = currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e instanceof MouseEvent ?
        e as unknown as MouseEvent :
        ( e as unknown as TouchEvent ).touches[ 0 ];
    const xr = ease( ( clientX - left ), ( right - left ) );
    const yr = ease( ( clientY - top ), ( bottom - top ) );
    if ( ( xr !== undefined ) && ( yr !== undefined ) ) {
        currentTarget.style.setProperty( `--twic-xr`, xr.toString() );
        currentTarget.style.setProperty( `--twic-yr`, yr.toString() );
    }
};

export default ( magnifierContainer: HTMLDivElement ): void => {
    const imageContainer = magnifierContainer.lastElementChild as unknown as HTMLDivElement;
    imageContainer.addEventListener( `mousemove`, ( e: MouseEvent ) => move( e ) );
    imageContainer.addEventListener( `touchmove`, ( e: TouchEvent ) => move( e ) );
};
