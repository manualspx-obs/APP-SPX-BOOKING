import { BookingRequest, BookingStatus, BookingFormData } from './types';

export const DEPARTMENTS = ['FIEP', 'SENAI', 'SESI', 'IEL', 'CORPORATIVA', 'EXTERNO'];

export const LAYOUT_OPTIONS = [
  { id: 'auditorio', name: 'Auditório (até 60 pessoas)', capacity: 60, img: 'https://images.unsplash.com/photo-1542037104-924839975173?q=80&w=400' },
  { id: 'mesa_u', name: 'Mesa em "U" (até 30 pessoas)', capacity: 30, img: 'https://images.unsplash.com/photo-1591115765321-04535c363518?q=80&w=400' },
  { id: 'mesa_v', name: 'Mesa em "V" (até 30 pessoas)', capacity: 30, img: 'https://images.unsplash.com/photo-1588621434521-5a3d76b1f28e?q=80&w=400' },
  { id: 'mesa_circulo', name: 'Mesa em Círculo (até 50 pessoas)', capacity: 50, img: 'https://images.unsplash.com/photo-1604328702803-311c6d655f48?q=80&w=400' },
  { id: 'meia_lua', name: 'Meia Lua (até 42 pessoas)', capacity: 42, img: 'https://images.unsplash.com/photo-1582653291939-950858f79f0a?q=80&w=400' },
  { id: 'mesa_triangulo_grande', name: 'Mesa em Triângulo (até 30 pessoas)', capacity: 30, img: 'https://images.unsplash.com/photo-1521737852594-3b8c5b5f8c1f?q=80&w=400' },
  { id: 'mesa_triangulo_pequeno', name: 'Triângulo Pequeno (até 44 pessoas)', capacity: 44, img: 'https://i.ibb.co/jDG4rV7/triangulo-pequeno.png' },
  { id: 'conselho', name: 'Conselho (até 50 pessoas)', capacity: 50, img: 'https://drive.google.com/uc?export=view&id=1ioJgtAVUrCZ2i-aN91Tslpnf3glL63vK' },
  { id: 'mesa_retangulo', name: 'Mesa em Retângulo (até 42 pessoas)', capacity: 42, img: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?q=80&w=400' },
];

export const EQUIPMENT_LABELS: { [key in keyof BookingFormData['equipment']]: string } = {
  microphone: 'Microfone',
  ledPanel: 'Painel de Led',
  clickShare: 'ClickShare',
  slidePresenter: 'Passador de Slide',
};

const MOCK_DETAILS_1: BookingFormData = {
  eventName: 'Planejamento Estratégico 2025', department: 'CORPORATIVA', startDate: '2024-08-15', startTime: '09:00', endDate: '2024-08-15', endTime: '18:00', responsible: 'Ana Silva', attendees: 28,
  requesterName: 'Ana Silva', requesterEmail: 'ana.silva@sistemafiep.org.br', backupName: 'Carlos Pereira', backupEmail: 'carlos.pereira@sistemafiep.org.br',
  equipment: { microphone: true, ledPanel: true, clickShare: true, slidePresenter: true },
  equipmentCount: { microphone: 3, clickShare: 2 },
  needsRecording: 'sim', streamingType: 'teams', foodService: 'sim',
  foodOptions: { cafeEAgua: true, coffeeBreak: true, brunch: false, coquetel: false },
  needsTranslation: 'nao', needsPress: 'nao', needsReception: 'sim', needsSupportTable: 'sim', roomLayout: 'mesa_u'
};

const MOCK_DETAILS_2: BookingFormData = {
  eventName: 'Workshop de Inovação', department: 'SENAI', startDate: '2024-08-20', startTime: '14:00', endDate: '2024-08-20', endTime: '17:30', responsible: 'Carlos Pereira', attendees: 30,
  requesterName: 'Carlos Pereira', requesterEmail: 'carlos.pereira@sistemafiep.org.br',
  equipment: { microphone: false, ledPanel: true, clickShare: true, slidePresenter: true },
  equipmentCount: { microphone: 0, clickShare: 4 },
  needsRecording: 'nao', streamingType: 'sem_transmissao', foodService: 'sim',
  foodOptions: { cafeEAgua: true, coffeeBreak: true, brunch: false, coquetel: false },
  needsTranslation: 'nao', needsPress: 'nao', needsReception: 'nao', needsSupportTable: 'sim', roomLayout: 'mesa_retangulo'
};

const MOCK_DETAILS_3: BookingFormData = {
  eventName: 'Reunião de Alinhamento IEL', department: 'IEL', startDate: '2024-08-22', startTime: '10:00', endDate: '2024-08-22', endTime: '11:00', responsible: 'Mariana Costa', attendees: 15,
  requesterName: 'Mariana Costa', requesterEmail: 'mariana.costa@sistemafiep.org.br',
  equipment: { microphone: false, ledPanel: true, clickShare: false, slidePresenter: false },
  equipmentCount: { microphone: 0, clickShare: 0 },
  needsRecording: 'nao', streamingType: 'sem_transmissao', foodService: 'nao',
  foodOptions: { cafeEAgua: false, coffeeBreak: false, brunch: false, coquetel: false },
  needsTranslation: 'nao', needsPress: 'nao', needsReception: 'nao', needsSupportTable: 'nao', roomLayout: 'conselho'
};

const MOCK_DETAILS_4: BookingFormData = {
  eventName: 'Apresentação Novos Projetos SENAI', department: 'SENAI', startDate: '2024-09-01', startTime: '09:30', endDate: '2024-09-01', endTime: '12:00', responsible: 'João Santos', attendees: 55,
  requesterName: 'João Santos', requesterEmail: 'joao.santos@sistemafiep.org.br', backupName: 'Ana Silva', backupEmail: 'ana.silva@sistemafiep.org.br',
  equipment: { microphone: true, ledPanel: true, clickShare: false, slidePresenter: true },
  equipmentCount: { microphone: 1, clickShare: 0 },
  needsRecording: 'sim', streamingType: 'youtube', foodService: 'nao',
  foodOptions: { cafeEAgua: false, coffeeBreak: false, brunch: false, coquetel: false },
  needsTranslation: 'nao', needsPress: 'sim', needsReception: 'sim', needsSupportTable: 'nao', roomLayout: 'auditorio'
};


export const MOCK_BOOKINGS: BookingRequest[] = [
  {
    id: '1',
    bookingCode: 'SPX-20240815-1234',
    eventName: 'Planejamento Estratégico 2025',
    startDate: new Date('2024-08-15T09:00:00'),
    endDate: new Date('2024-08-15T18:00:00'),
    requester: 'Ana Silva',
    status: BookingStatus.Aprovado,
    details: MOCK_DETAILS_1,
  },
  {
    id: '2',
    bookingCode: 'SPX-20240820-5678',
    eventName: 'Workshop de Inovação',
    startDate: new Date('2024-08-20T14:00:00'),
    endDate: new Date('2024-08-20T17:30:00'),
    requester: 'Carlos Pereira',
    status: BookingStatus.EmAnalise,
    details: MOCK_DETAILS_2,
  },
  {
    id: '3',
    bookingCode: 'SPX-20240822-9012',
    eventName: 'Reunião de Alinhamento IEL',
    startDate: new Date('2024-08-22T10:00:00'),
    endDate: new Date('2024-08-22T11:00:00'),
    requester: 'Mariana Costa',
    status: BookingStatus.Recusado,
    details: MOCK_DETAILS_3,
  },
  {
    id: '4',
    bookingCode: 'SPX-20240901-3456',
    eventName: 'Apresentação Novos Projetos SENAI',
    startDate: new Date('2024-09-01T09:30:00'),
    endDate: new Date('2024-09-01T12:00:00'),
    requester: 'João Santos',
    status: BookingStatus.EmAnalise,
    details: MOCK_DETAILS_4,
  },
];