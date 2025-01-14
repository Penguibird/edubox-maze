import { SlotType } from '../../receptions/types/SlotType';
import { Cart, DocumentTypeEnumType, Maybe, Note, NoteTypeEnum, } from '../../types';
import { getSlotNotes as _getSlotNotes } from '../notes/getSlotNotes';
import { DeepPartial } from './DeepPartial';
import { stripTypenames } from '../../helpers/functions';
import { DetailedPlayerFragment } from '../avatar/fragments/DetailedPlayer.generated';
import { DetailedUserFragment } from '../avatar/fragments/DetailedUser.generated';
import { BareBonesPlayerInfoType } from '../avatar/Avatar';
import { FullTeetimeSlotFragment } from '../../receptions/gql/reservationsReception.generated';

export default class TeetimeSlotUtils {

  static toPlayerInfo(slot: SlotType): DetailedUserFragment | BareBonesPlayerInfoType | DetailedPlayerFragment {
    if (slot?.user) {
      return slot.user;
    }
    return {
      email: slot?.email ?? slot?.reservation?.contactEmail,
      phone: slot?.number ?? slot?.reservation?.contactPhone,
      memberNumber: slot?.memberNumber,
      firstName: slot?.firstName,
      lastName: slot?.lastName,
      // Honestly I dont know if it happens, but I think it can so its better to pass it
      // @ts-ignore
      title: slot?.title,
    } as BareBonesPlayerInfoType;
  }

    /**
     * Canceled refers to payment cancelation aka/or a refund
     *
     */
    static isCanceled(slot: Maybe<DeepPartial<{
        cancelNote: any,
        notes?: Maybe<DeepPartial<Maybe<DeepPartial<Note>>[]>>,
        cart?: Maybe<DeepPartial<Cart>>,
        datePaid?: any
        dateCanceled?: any
    }>>): boolean {
        if (!slot) return false;
        const isNote = slot.cancelNote || slot.notes?.some((note) => note?.type == NoteTypeEnum.ReservationPlayerCancel);
        // const isCreditNote = slot.cart?.mainCart?.order?.documents
        //     ?.some((d) => d?.documentType == DocumentTypeEnumType.DocumentCreditNote && d.company?.isEshopOperator && d.items?.some(i => i.));
        const isCreditNote = false;
        const isCancelled = isCreditNote || (isNote && slot.datePaid == null) || slot.dateCanceled;
        return Boolean(isCancelled);
    }

  static getSlotNotes = _getSlotNotes;

  static getNotesInfo(slot: FullTeetimeSlotFragment): { hasClientNote: boolean, hasNotes: boolean, notes: ReturnType<typeof _getSlotNotes> } {
    const notes = this.getSlotNotes(slot);

    const hasNotes = notes && notes.length > 0;
    const hasClientNote = hasNotes && !!notes.find((s) => [
      NoteTypeEnum.ReservationPlayerClient,
      NoteTypeEnum.BookingClient,
      NoteTypeEnum.ReservationTournamentPlayerClient,
    ].includes(s.type!));
    return { hasClientNote, hasNotes, notes };
  }

  /**
   * Returns true if the price has been edited
   */
  static isPriceEdited(slot: SlotType): boolean {
    return slot?.notes?.some((note) => note && note.type == NoteTypeEnum.ReservationPlayerPriceChange) || (slot?.priceHasBeenEdited ?? false);
  }
}
