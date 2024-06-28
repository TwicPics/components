// functions to generate CSS selectors for media elements and their placeholders.
// adjust these functions if the HTML component structure changes.
export const assetSelector = ( media ) => {
    if ( media === `img` || media === `video`) {
        return `.twic-i > .twic-w > ${ media }, .twic-i > twicmedia > .twic-w > ${ media }`;
    }
    if ( media === `picture-img` || media === `picture-source` ) {
        const actualMedia = ( media.match(/^picture-(.*)$/ )||[])[ 1 ];
        return `.twic-i > picture.twic-p > ${ actualMedia }, twicpicture > picture.twic-p > ${ actualMedia }`;
    }
}
export const placeholderSelector = ( media ) => `${ media }~div`;