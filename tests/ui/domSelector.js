// functions to generate CSS selectors for media elements and their placeholders.
// adjust these functions if the HTML component structure changes.
export const assetSelector = ( media ) => {
    if ( media === `img` || media === `video`) {
      return (
          `.twic-i > .twic-w > ${ media }, ` + // non angular
          `.twic-i > twicmedia > .twic-w > ${ media }` // angular
    );
    }
    if ( media === `picture-img` || media === `picture-source` ) {
        const actualMedia = ( media.match(/^picture-(.*)$/ )||[])[ 1 ];
        return (
            `.twic-i > picture.twic-p > ${ actualMedia }, ` + // non angular
            `twicpicture > picture.twic-p > ${ actualMedia }` // angular
      );
    }
}

export const hostSelector = ( media ) => {
    if ( media === `img` || media === `video`) {
        return (
            `.twic-i `
        );
    }
    if ( media === `picture-img` || media === `picture-source` ) {
        return (
            `.twic-i, ` + // non angular
            `twicpicture` // angular
        );
    }
}

export const placeholderSelector = ( media ) => `${ media }~div`;

export const wrapperSelector = () => `.twic-w, .twic-p`;