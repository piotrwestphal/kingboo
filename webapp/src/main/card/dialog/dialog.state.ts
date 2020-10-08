import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';

export enum DialogView {
  DETAILS = 'details',
  PRICES = 'prices'
}

export interface DialogState {
  readonly open: boolean
  readonly initialView?: DialogView
}

export type DialogContentProps = {
  readonly hotel: SimpleHotelDto
}
