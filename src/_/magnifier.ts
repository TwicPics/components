/* eslint-disable no-magic-numbers */
const ease = ( t: number, d: number ): number => {
    if ( ( t < 0 ) || ( t > d ) ) {
        return Math.min( Math.max( 0, t ), d );
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
    currentTarget.style.setProperty( `--twic-xr`, ease( ( clientX - left ), ( right - left ) ).toString() );
    currentTarget.style.setProperty( `--twic-yr`, ease( ( clientY - top ), ( bottom - top ) ).toString() );
};

export default ( magnifierContainer: HTMLDivElement ): void => {
    const imageContainer = magnifierContainer.firstElementChild as unknown as HTMLDivElement;
    imageContainer.addEventListener( `mousemove`, ( e: MouseEvent ) => move( e ) );
    imageContainer.addEventListener( `touchmove`, ( e: TouchEvent ) => move( e ) );
};
