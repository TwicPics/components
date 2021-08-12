export const installerError = ( msg: string ): never => {
    throw new Error( `impossible to install TwicPics: ${ msg }` );
}
