/* eslint-disable no-magic-numbers */
const ease = ( t: number, d: number ): number => {
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
    const { left, top, right, bottom } = currentTarget.getBoundingClientRect();
    const magnifiedContainer = currentTarget.lastElementChild as HTMLDivElement;
    const { clientX, clientY } = e instanceof MouseEvent ?
        e as unknown as MouseEvent :
        ( e as unknown as TouchEvent ).touches[ 0 ];
    magnifiedContainer.style.setProperty( `--twic-xr`, ease( ( clientX - left ), ( right - left ) ).toString() );
    magnifiedContainer.style.setProperty( `--twic-yr`, ease( ( clientY - top ), ( bottom - top ) ).toString() );
};

export default ( magnifiedContainer: HTMLDivElement ): void => {
    const imageContainer = magnifiedContainer.parentNode as unknown as HTMLDivElement;
    imageContainer.addEventListener( `mousemove`, ( e: MouseEvent ) => move( e ) );
    imageContainer.addEventListener( `touchmove`, ( e: TouchEvent ) => move( e ) );
};
