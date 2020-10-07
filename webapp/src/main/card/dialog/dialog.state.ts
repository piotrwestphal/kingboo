import { FunctionComponent } from 'react';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';

export interface DialogState {
  readonly open: boolean
  readonly dialog?: FunctionComponent<DialogContentProps>
}

export type DialogContentProps = {
  readonly hotel: SimpleHotelDto
}
