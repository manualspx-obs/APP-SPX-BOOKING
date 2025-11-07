export enum BookingStatus {
  EmAnalise = 'em_analise',
  Aprovado = 'aprovado',
  Recusado = 'recusado',
  Cancelado = 'cancelado',
}

export interface BookingRequest {
  id: string;
  bookingCode: string;
  eventName: string;
  startDate: Date;
  endDate: Date;
  requester: string;
  status: BookingStatus;
  details?: BookingFormData;
}

export interface Notification {
  id: string;
  bookingId: string;
  bookingCode: string;
  eventName: string;
  status: BookingStatus;
  read: boolean;
  createdAt: Date;
}

export interface BookingFormData {
  eventName: string;
  department: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  responsible: string;
  attendees: number | '';
  requesterName: string;
  requesterEmail: string;
  backupName?: string;
  backupEmail?: string;
  equipment: {
    microphone: boolean;
    ledPanel: boolean;
    clickShare: boolean;
    slidePresenter: boolean;
  };
  equipmentCount: {
    microphone: number;
    clickShare: number;
  };
  needsRecording: 'sim' | 'nao';
  streamingType: 'sem_transmissao' | 'teams' | 'youtube';
  foodService: 'sim' | 'nao';
  foodOptions: {
    cafeEAgua: boolean;
    coffeeBreak: boolean;
    brunch: boolean;
    coquetel: boolean;
  };
  needsTranslation: 'sim' | 'nao';
  needsPress: 'sim' | 'nao';
  needsReception: 'sim' | 'nao';
  needsSupportTable: 'sim' | 'nao';
  roomLayout: string;
}