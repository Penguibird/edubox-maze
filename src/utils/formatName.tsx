import {Maybe} from 'graphql/jsutils/Maybe';
import {PLACEHOLDER_QUICKRES_NAME} from '../../receptions/quickReservations/QuickReservationButton';
import {AnyTranslations} from "../avatar/AvatarPlayerInfoClasses";
import capitalize from './capitalize';

/**
 * Returns the name formatted as "LASTNAME Firstname"
 *
 */
export default (firstName: Maybe<string>, lastName: Maybe<string>, t: { unknownPersonName: string }) => {
    if (firstName == PLACEHOLDER_QUICKRES_NAME || lastName == PLACEHOLDER_QUICKRES_NAME || (firstName == null && lastName == null) || (firstName == '' && lastName == '')) {
        return t.unknownPersonName;
    }
    return `${lastName?.toUpperCase()} ${capitalize(firstName)}`.trim();
};
