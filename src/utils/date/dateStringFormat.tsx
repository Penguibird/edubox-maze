/**
 *
 The format which comes from database (yyyy-mm-dd) is not standard, so it doesn't work in some browsers.
 This function replaces the dashes with slashes, which works everywhere.
 */
// ! This was throwing bugs in safari
// export default function dateStringFormat(dateString: string | null) {
//     if (!dateString) {
//         return 0;
//     }
//     return dateString.replace(/-/g, '/').replace(/T/g, ' ');
// }

import DateUtils from '../../../helpers/DateUtils';

/**
 * Changes the gql input from the database so it can be parsed by new Date();
 * @deprecated use DateUtils instead
 */
export default function dateStringFormat(dateString: string | null): string | number {
    if (!dateString) {
        return 0;
    }
    return DateUtils.gqlDateTimeToDate(dateString).toISOString();
}
