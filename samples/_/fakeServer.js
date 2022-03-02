const ratios = [ `3/4`, `1`, `4/3`, `16/9` ];
const modes = [ `contain`, `cover` ];
const focuss = [ `auto`, null ];

/**
 * returns a random element of theArray
 */
const random = theArray => theArray[ Math.floor( Math.random() * theArray.length ) ];

/* eslint-disable require-await */
export const getSampleImage = async () => {

    const mode = random( modes );
    const ratio = random( ratios );
    // eslint-disable-next-line no-shadow
    const focus = mode === `cover` ? random( focuss ) : null;

    const promise = async () => ( {
        "imgSrc": `https://assets.twicpics.com/examples/football.jpg`,
        ratio,
        mode,
        focus,
    } );

    return promise();
};
