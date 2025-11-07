import React, { useState, useCallback, useEffect } from 'react';
import HomePage from './pages/HomePage';
import RequestsPage from './pages/RequestsPage';
import NewBookingPage from './pages/NewBookingPage';
import { BookingRequest, BookingFormData, BookingStatus, Notification } from './types';
import { MOCK_BOOKINGS } from './constants';
import Notifications from './components/Notifications';
import BookingDetailsModal from './components/BookingDetailsModal';
import CancellationConfirmationModal from './components/CancellationConfirmationModal';


type View = 'home' | 'requests' | 'newBooking';

const App: React.FC = () => {
  const [view, setView] = useState<View>('newBooking');
  const [bookings, setBookings] = useState<BookingRequest[]>(MOCK_BOOKINGS);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<BookingRequest | null>(null);

  useEffect(() => {
    const initialNotifications = bookings.map(booking => ({
      id: `notif-${booking.id}`,
      bookingId: booking.id,
      bookingCode: booking.bookingCode,
      eventName: booking.eventName,
      status: booking.status,
      read: booking.status === BookingStatus.Aprovado || booking.status === BookingStatus.Recusado,
      createdAt: booking.startDate,
    }));
    setNotifications(initialNotifications);
  }, [bookings]);

  const addBooking = useCallback((formData: BookingFormData): BookingRequest => {
    const dateParts = formData.startDate.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const randomPart = String(Math.floor(1000 + Math.random() * 9000));
    const bookingCode = `SPX-${year}${month}${day}-${randomPart}`;

    const newBooking: BookingRequest = {
      id: new Date().toISOString(),
      bookingCode,
      eventName: formData.eventName,
      startDate: new Date(`${formData.startDate}T${formData.startTime}`),
      endDate: new Date(`${formData.endDate}T${formData.endTime}`),
      requester: formData.requesterName,
      status: BookingStatus.EmAnalise,
      details: formData,
    };
    setBookings(prev => [newBooking, ...prev]);
    
    const newNotification: Notification = {
      id: `notif-${newBooking.id}`,
      bookingId: newBooking.id,
      bookingCode: newBooking.bookingCode,
      eventName: newBooking.eventName,
      status: newBooking.status,
      read: false,
      createdAt: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);

    return newBooking;
  }, []);

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: BookingStatus.Cancelado }
          : booking
      )
    );
  }, []);

  const handleConfirmCancellation = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel.id);
      setBookingToCancel(null);
      setSelectedBooking(null);
    }
  };

  const handleNotificationClick = useCallback((bookingId: string, notificationId: string) => {
    const bookingToShow = bookings.find(b => b.id === bookingId);
    if (bookingToShow) {
      setSelectedBooking(bookingToShow);
    }
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  }, [bookings]);

  const handleMarkAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);


  const renderView = () => {
    switch (view) {
      case 'requests':
        return <RequestsPage bookings={bookings} onSelectBooking={setSelectedBooking} />;
      case 'newBooking':
        return <NewBookingPage addBooking={addBooking} setView={setView} />;
      case 'home':
      default:
        return <HomePage setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')} title="Página Inicial">
             <h1 className="text-2xl font-bold text-brand-dark">
                SP<span className="text-brand-blue">X</span> <span className="font-light tracking-wider">BOOKING</span>
            </h1>
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setView('home')}
              className={`text-sm font-semibold hover:text-brand-blue transition-colors ${view === 'home' ? 'text-brand-blue' : 'text-gray-600'}`}
            >
              Início
            </button>
            <button
              onClick={() => setView('newBooking')}
              className={`text-sm font-semibold hover:text-brand-blue transition-colors ${view === 'newBooking' ? 'text-brand-blue' : 'text-gray-600'}`}
            >
              Agendar Sala
            </button>
            <button
              onClick={() => setView('requests')}
              className={`text-sm font-semibold hover:text-brand-blue transition-colors ${view === 'requests' ? 'text-brand-blue' : 'text-gray-600'}`}
            >
              Minhas Solicitações
            </button>
            <Notifications notifications={notifications} onNotificationClick={handleNotificationClick} onMarkAllRead={handleMarkAllRead} />
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
      
      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
          onCancelRequest={() => setBookingToCancel(selectedBooking)}
        />
      )}

      {bookingToCancel && (
        <CancellationConfirmationModal
          booking={bookingToCancel}
          onConfirm={handleConfirmCancellation}
          onClose={() => setBookingToCancel(null)}
        />
      )}
      
      <footer className="bg-white mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>Desenvolvido pelo <a href="https://www.instagram.com/obs.ind/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-blue hover:underline">Observatório Sistema Fiep</a></p>
        </div>
      </footer>
    </div>
  );
};

export default App;