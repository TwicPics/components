
/* eslint-disable no-magic-numbers */
const ease = ( t: number ): string => {
    let n = 2 * t;
    if ( n < 1 ) {
        return `${ 0.5 * ( n ** 3 ) }`;
    }
    n -= 2;
    return `${ 0.5 * ( ( n ** 3 ) + 2 ) }`;
};
/* eslint-enable no-magic-numbers */
export class Magnifier {
    private container: HTMLDivElement;
    private magnifiedContainer: HTMLDivElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly events:Record<string, any> = {
        "mousemove": ( e: MouseEvent ) => this.move( e ),
        "touchmove": ( e: MouseEvent ) => this.move( e ),
    };
    constructor( magnifiedContainer: HTMLDivElement ) {
        this.magnifiedContainer = magnifiedContainer;
        this.container = magnifiedContainer.parentNode as unknown as HTMLDivElement;
        Object.entries( this.events ).forEach( ( [ key, value ] ) => {
            this.container.addEventListener( key, value );
        } );
    }
    public destroy(): void {
        if ( this.container ) {
            Object.entries( this.events ).forEach( ( [ key, value ] ) => {
                this.container.removeEventListener( key, value );
            } );
        }
    }
    private move( e: MouseEvent | TouchEvent ): void {
        // eslint-disable-next-line no-shadow
        const { left, top, right, bottom } = this.container.getBoundingClientRect();
        const width = right - left;
        const height = bottom - top;
        if ( width && height ) {
            const { clientX, clientY } = e instanceof MouseEvent ?
                e as unknown as MouseEvent :
                ( e as unknown as TouchEvent ).touches[ 0 ];
            this.magnifiedContainer.style.setProperty( `--twic-xr`, ease( ( clientX - left ) / width ) );
            this.magnifiedContainer.style.setProperty( `--twic-yr`, ease( ( clientY - top ) / height ) );
        }
    }
}
