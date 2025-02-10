import {WasteType} from './wastetype.enum';
import {  Status} from './status.enum';
import {User} from './user.model';


export interface CollectionRequest {
  id: string;
  createdBy: string;
  wasteTypes: WasteType[];
  photos?: string[];
  estimatedWeight: number;
  collectionAddress: string;
  collectionDate: Date;
  timeSlot: string;
  additionalNotes?: string;
  status: Status;
}
