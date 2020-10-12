import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';

export enum DialogView {
  DETAILS = 'Details',
  PRICES = 'Prices'
}

export interface DialogState {
  readonly open: boolean
  readonly initialView?: DialogView
}

export type DialogContentProps = {
  readonly hotel: SimpleHotelDto
}
