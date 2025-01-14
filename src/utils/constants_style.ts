import { css } from '@emotion/react';
import constants from './constants_parameters';

const { isTycko } = constants;

export interface AppStyles {
    primaryColor: {
        light: string,
        dark: string,
        rest: string,
    }
    danger: {
        light: string,
        dark: string,
        rest: string,
        dangerBased: string,
    }
    text: {
        onSurface: string
        onSurfaceVariant: string
    },
}

const primaryColor = isTycko ? {
    light: '#bed9d2',
    rest: '#268068',
    dark: '#1A5948',
} : {
    light: '#C8DDFE',
    rest: '#0450C8',
    dark: '#264980',
};
const danger = isTycko ? {
    light: '#F9D2D5',
    rest: '#A31621',
    dark: '#5A0C12',
    dangerBased: '#F00505',
} : {
    light: '#FCCAD6',
    rest: '#EF476F',
    dark: '#80263B',
    dangerBased: '#F00505',
};

const localStyle = {
    primaryFont: 'Inter, Roboto, sans-serif',
    headerColumnWidth: '10rem',
    background: constants.isTycko ? '#FAF7F2' : '#F5F5F5',
    gisBackground: '#FAF7F2',
    // background: '#FFFBF5',
    // primaryColor: {} as AppStyles['primaryColor'],
    // danger: {} as AppStyles['danger'],
    // text: {} as AppStyles['text'],
    border: {
        muted: '#E8E8E8',
    },
    primaryColor,
    danger,
    text: {
        onSurface: '#353535',
        onSurfaceVariant: '#6F6F6F',
        onSurfaceMuted: '#8E8E8E',
    },
    info: {
        light: '#CAF3FC',
        rest: '#68C5DB',
        dark: '',
        lowest: '#C4F1FA',
        highest: '#246373',
        covered: '#62b9ce', // used for light being covered with a black 10
    },
    crayola: {
        light: '#EFFCCA',
        dark: '#698026',
        rest: '#CAE679',
        covered: '#bed872', // used for light being covered with a black 10
    },
    fawn: {
        rest: '#E6A879',
        light: '#FCE0CA',
        dark: '#DA7E39',
    },
    blue: {
        60: '#575D90',
        80: '#262940',
    },
    success: {
        light: 'rgb(202,252,239)',
        rest: '#06D6A0',
        dark: '#01be8d',
        successBased: '#50C804',
    },
    warning: {
        light: '#FCEDCA',
        rest: '#FFD166',
        dark: '#806826',
    },
    reservation: {
        web: {
            rest: '#79CCE6',
            light: ' #CAF0FC',
        },
        reception: {
            rest: '#CAE679',
            light: '#EEFCC9',
        },
    },
    white: {
        20: 'rgba(255, 255, 255, 0.2)',
        40: 'rgba(255, 255, 255, 0.4)',
        60: 'rgba(255, 255, 255, 0.6)',
        80: 'rgba(255, 255, 255, 0.8)',
        100: '#fff',
    },
    black: {
        10: 'rgba(0, 0, 0, 0.1)',
        20: 'rgba(0, 0, 0, 0.2)',
        40: 'rgba(0, 0, 0, 0.4)',
    },
    gray: {
        5: '#FAFAFA',
        10: '#F5F5F5',
        15: '#EFEFEF',
        20: '#EBEBEB',
        25: '#E5E5E5',
        28: '#dddddd', // Used for a gray covered with a black 10
        30: '#D6D6D6',
        40: '#B8B8B8',
        50: '#999999',
        60: '#7A7A7A',
        70: '#5C5C5C',
        80: '#3D3D3D',
        90: '#1F1F1F',
        100: '#000',
    },
    surface: {
        based: '#f3f3f3'
    },
    tycko: {
        primary: {
            rest: '#268068',
        },
        red: {
            rest: '#A31621',
            light: '#F9D2D5',
        },
        secondary: {
            dark: '#262940',
            light: '#DFE1EC',
            rest: '#575D90',
            muted: '#767992',
            branLowest: '#D8F3EC',
        },
        tertiary: {
            lowest: '#FEF6E1',
        },
        yellow: {
            light: '#FFF0CC',
            darker: '#fcfaf8',
            dark: '#664700',
            stroke: '#F2EBDE',
        },
        background: {
            rest: '#faf7f2',
        },
    },
    complementary: {
        lavender: {
            rest: '#A979E6',
            light: '#E0CAFC',
            dark: '#4E2680',
        },
        middle_red: {
            rest: '#E68B79',
        },
        pastel_green: {
            rest: '#7BE679',
        },
        deep_mauve: {
            rest: '#D079E6',
            light: '#F2CAFC',
            dark: '#6E2680',
        },
        cornflower: {
            rest: '#7984E6',
            light: '#CACFFC',
            dark: '#262F80',
        },
        crayola: {
            rest: '#CAE679',
            light: '#EFFCCA',
            dark: '#698026',
        },
        begonia: {
            rest: '#FA7272',
        },
        medium_sky: {
            rest: '#79E6D9',
        },
        areo: {
            rest: '#79ABE6',
        },
        middle_purple: {
            rest: '#E679B4',
        },
        medium_aqua: {
            rest: '#79E6B2',
        },
        middle_blue: {
            rest: '#79CCE6',
        },
        straw: {
            rest: '#E4E679',
        },
        straw_dark: {
            light: '#FCEFCA',
            rest: '#E6C979',
            dark: '#806826',
        },
    },
    focusShade: `0px 0px 0px 3px ${primaryColor.light}`,
    dangerShade: `0px 0px 0px 3px ${danger.light}`,
    shadows: {
        1: '0px 4px 1px rgba(0, 0, 0, 0.01), 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.09), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);',
        2: '0px 4px 8px rgba(0, 0, 0, 0.14)',
        3: '0px 8px 16px rgba(0, 0, 0, 0.14)',
        4: '0px 32px 64px rgba(0, 0, 0, 0.1876), 0px 2px 21px rgba(0, 0, 0, 0.1474)',
        5: '0px 4px 12px rgba(0, 0, 0, 0.04), 0px 0.500862px 1.50259px rgba(0, 0, 0, 0.02)',
        6: '0px 9px 4px rgba(0, 0, 0, 0.01), 0px 5px 3px rgba(0, 0, 0, 0.05), 0px 2px 2px rgba(0, 0, 0, 0.09), 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
        4: '4px',
        8: '8px',
        12: '12px',
        md: '12px',
    },
} as const;

// await import(isTycko ? './styles-golferis' : './styles-golferis').then((a: {appStyles: AppStyles}) => {
//     localStyle = {...localStyle, ...a.appStyles};
// });

export const style = localStyle;

export const stripedBg = (backgroundColor: string) => `
    repeating-linear-gradient(-45deg,
       transparent 0px,
       transparent 12px,
       rgba(0,0,0,0.05) 12px,
       rgba(0,0,0,0.05) 24px
    ), ${backgroundColor}
`;

export const stripedOrGrayedOut = (stylesColor: { [key: string | 'rest' | 'light' | 'dark']: string }, isGreyedOut: boolean, isStriped: boolean) => css`
  ${isStriped ? stripedBg(isGreyedOut ? stylesColor.light : stylesColor.rest) : stylesColor[isGreyedOut ? 'light' : 'rest']}
`;

export default style;
