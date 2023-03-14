/* eslint-disable no-magic-numbers */
const ease = ( t: number, d: number ): number => {
    let n = 2 * t / d;
    if ( n < 1 ) {
        return d / 2 * ( n ** 3 );
    }
    n -= 2;
    return d / 2 * ( ( n ** 3 ) + 2 );
};
/* eslint-enable no-magic-numbers */
export class Magnifier {
    private container: HTMLDivElement;
    private magnifiedContainer: HTMLDivElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor( magnifiedContainer: HTMLDivElement ) {
        this.magnifiedContainer = magnifiedContainer;
        this.container = magnifiedContainer.parentNode as unknown as HTMLDivElement;
        this.container.addEventListener( `mousemove`, ( e: MouseEvent ) => this.move( e ) );
        this.container.addEventListener( `touchmove`, ( e: TouchEvent ) => this.move( e ) );
    }
    private move( e: MouseEvent | TouchEvent ): void {
        // eslint-disable-next-line no-shadow
        const { left, top, right, bottom } = this.container.getBoundingClientRect();
        const width = right - left;
        const height = bottom - top;
        const { clientX, clientY } = e instanceof MouseEvent ?
            e as unknown as MouseEvent :
            ( e as unknown as TouchEvent ).touches[ 0 ];
        this.magnifiedContainer.style.setProperty( `--twic-xr`, ease( ( clientX - left ), width ).toString() );
        this.magnifiedContainer.style.setProperty( `--twic-yr`, ease( ( clientY - top ), height ).toString() );
    }
}
