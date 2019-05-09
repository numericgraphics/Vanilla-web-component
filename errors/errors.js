
/*
    "ERROR_AGERATING12_MESSAGE":"To protect children under the age of 12, {{ type }} is only available between 8 p.m. and 6 a.m.",
    "ERROR_AGERATING18_MESSAGE":"To protect children under the age of 18, {{ type }} is only available between 11 p.m. and 5 a.m.",
    "ERROR_COMMERCIAL_MESSAGE":"Advertising will not be shown.",
    "ERROR_ENDDATE_MESSAGE":"For legal reasons, {{ type }} was only available for a specified period of time.",
    "ERROR_GEOBLOCK_MESSAGE":"For legal reasons, {{ type }} is only available within Switzerland.",
    "ERROR_LEGAL_MESSAGE":"Unfortunately {{ type }} cannot be transmitted for legal reasons.",
    "ERROR_STARTDATE_MESSAGE":"Unfortunately {{ type }} is not yet available. Please try again later.",
    "ERROR_UNKNOWN_MESSAGE":"Unfortunately {{ type }} is not available.",
    "ERROR_NOT_AVAILABLE_MESSAGE":"Unfortunately {{ type }} is no longer available.",
    "ERROR_MISSING_STREAM_MESSAGE":"Unfortunately {{ type }} is no longer available.",
    "ERROR_PLAYBACK_MESSAGE":"Oops! An error has interrupted {{ type }} stream.",
    "ERROR_INVALID_MESSAGE":"Unfortunately {{ type }} is no longer available.",
    "ERROR_UPDATE_BROWSER_MESSAGE":"Update your browser to reproduce {{ type }}.",
    "ERROR_INCOMPATIBLE_DEVICE_MESSAGE":"Unfortunately {{ type }} format is not compatible with your device.",
    "ERROR_INCOMPATIBLE_BROWSER_MESSAGE":"Unfortunately {{ type }} format is not compatible with your browser.",
    "ERROR_INSTALL_FLASH_MESSAGE":"Install Adobe Flash Player to reproduce {{ type }}.",
    "360_UNSUPPORTED":"Unfortunately the 360 playback experience is not compatible with your browser version.",
    "ERROR_DRM_NOT_SUPPORTED_MESSAGE":"Unable to display the content. For more information and help, click here..."
*/




export const ERRORTYPE = {
    'ERROR_DRM_NOT_SUPPORTED_MESSAGE': {
        code: 6,
        type: 'ERROR_DRM_NOT_SUPPORTED_MESSAGE',
        message: "Unable to display the content. For more information and help, click here..."
    },
    '360_UNSUPPORTED': {
        code: 7,
        type: '360_UNSUPPORTED',
        message: "Unfortunately the 360 playback experience is not compatible with your browser version."
    },
    'ERROR_INCOMPATIBLE_BROWSER_MESSAGE': {
        code: 8,
        type: 'ERROR_INCOMPATIBLE_BROWSER_MESSAGE',
        message: "Unfortunately {{ type }} format is not compatible with your browser."
    }
};
