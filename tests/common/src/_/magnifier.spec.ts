import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { JSDOM } from 'jsdom';
import initMagnifier from '../../../../src/_/magnifier';

describe('magnifier', () => {
    let wrapperContainer: HTMLDivElement;
    let magnifierContainer: HTMLDivElement;
    let jsdom: JSDOM;

    // mock touch event
    ( global.window as any ).Touch = class {
        identifier: number;
        target: EventTarget;
        clientX: number;
        clientY: number;

        constructor( { identifier, target, clientX, clientY }: any ) {
            this.identifier = identifier;
            this.target = target;
            this.clientX = clientX;
            this.clientY = clientY;
        }
    };

    beforeEach( () => {
        jsdom = new JSDOM( '<!DOCTYPE html><div class="twic-z"><div class="twic-m"></div></div>' );

        wrapperContainer = jsdom.window.document.getElementsByClassName( 'twic-z' )[ 0 ] as HTMLDivElement;
        magnifierContainer = jsdom.window.document.getElementsByClassName( 'twic-m' )[ 0 ] as HTMLDivElement;

        magnifierContainer.getBoundingClientRect = vi.fn(() => ({
            left: 0,
            top: 0,
            right: 100,
            bottom: 100,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            toJSON: () => ({})
        }));

        vi.spyOn( magnifierContainer, 'addEventListener' );

        initMagnifier( wrapperContainer );
    });

    it( 'should add event listeners magnifier container ', () => {
        expect( magnifierContainer.addEventListener ).toHaveBeenCalledTimes( 2 );
    });

    const eventsTest = [
      {
        input: {
            clientX: 50,
            clientY: 50
        },
        expected: {
            xr: '50',
            yr: '50'
        },
        description: 'should compute and update css variables on mouse move',
      },
      {
        input: {
            clientX: 25,
            clientY: 75
        },
        expected: {
            xr: '6.25',
            yr: '93.75'
        },
        description: 'should compute and update css variables using the ease function',
      },
      {
        input: {
            clientX: -1000,
            clientY: 1000
        },
        expected: {
            xr: '0',
            yr: '100'
        },
        description: 'should hold the image inside the container',
      },
    ];

    describe( 'mouse event', () => {
      test.each( eventsTest )( 'it $description', ( { input: { clientX, clientY }, expected: { xr, yr } } ) => {
            const event = new MouseEvent( 'mousemove', { clientX, clientY } );

            magnifierContainer.dispatchEvent( event );

            expect( magnifierContainer.style.getPropertyValue( '--twic-xr' ) ).toBe( xr );
            expect( magnifierContainer.style.getPropertyValue( '--twic-yr' ) ).toBe( yr );
      } );
    } );

    describe( 'touch event', () => {
      test.each( eventsTest )( 'it $description', ( { input: { clientX, clientY }, expected: { xr, yr } } ) => {
          const touch = new window.Touch({
              identifier: 1,
              target: magnifierContainer,
              clientX,
              clientY
          });

          const event = new TouchEvent('touchmove', {
              touches: [touch]
          });

          magnifierContainer.dispatchEvent( event );

          expect( magnifierContainer.style.getPropertyValue( '--twic-xr' ) ).toBe( xr );
          expect( magnifierContainer.style.getPropertyValue( '--twic-yr' ) ).toBe( yr );
      } );
    } );

});
