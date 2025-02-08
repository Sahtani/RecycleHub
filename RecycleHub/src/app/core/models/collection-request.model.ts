import {WasteType} from './wastetype.enum';
import {  Status} from './status.enum';


export interface CollectionRequest {
  id: string;
  wasteTypes: WasteType[];
  photos?: string[];
  estimatedWeight: number;
  collectionAddress: string;
  collectionDate: Date;
  timeSlot: string;
  additionalNotes?: string;
  status: Status;
}
