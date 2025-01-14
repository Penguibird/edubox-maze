import { Maybe } from 'yup';
import { UserMembershipType } from '../../types';
import { DeepPartial } from './DeepPartial';

export default class UserUtils {
  /**
   *
   * @param user
   * @returns null if user isnt blocked, otherwise an object with the reason and the club that blocked him
   */
  static isBlocked(user: Maybe<DeepPartial<{memberships: Maybe<DeepPartial<UserMembershipType[]>>}>>) {
    const blockedMembership = user?.memberships?.find((m) => m?.blocked);
    return blockedMembership ? {
      club: blockedMembership?.club,
      blocReason: blockedMembership.blockReason
    } : null;
  }
}
