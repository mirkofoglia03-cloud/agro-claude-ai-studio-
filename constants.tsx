
import React from 'react';
import type { NavItem, Task } from './types';
import { SubscriptionPlan } from './types';

// Icon Components (Heroicons)
const HomeIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const LeafIcon = (props: { className?: string }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121a2 2 0 01-2.828 0L6.606 9.434a2 2 0 112.828-2.828l4.687 4.687a2 2 0 010 2.828z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>
);
const CheckCircleIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const CloudIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
);
const PencilIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
);
const UserCircleIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const CashIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const CollectionIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
);
const UsersIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const ShoppingCartIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const QuestionMarkCircleIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4-1.742 0-3.223-.835-3.772-2M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>
);
const ArrowUpIcon = (props: { className?: string }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
);


export const NAV_ITEMS: NavItem[] = [
  { name: 'Il mio Orto', icon: HomeIcon, plan: SubscriptionPlan.HOBBY },
  { name: 'I miei ortaggi', icon: LeafIcon, plan: SubscriptionPlan.HOBBY },
  { name: 'Check List', icon: CheckCircleIcon, plan: SubscriptionPlan.HOBBY },
  { name: 'Meteo', icon: CloudIcon, plan: SubscriptionPlan.HOBBY },
  { name: 'Progetta il tuo Orto', icon: PencilIcon, plan: SubscriptionPlan.PRO },
  { name: 'Il tuo AgroGiardiniere', icon: UserCircleIcon, plan: SubscriptionPlan.PRO },
  { name: 'Entrate/Uscite', icon: CashIcon, plan: SubscriptionPlan.BUSINESS },
  { name: 'Raccolti', icon: CollectionIcon, plan: SubscriptionPlan.BUSINESS },
  { name: 'Community', icon: UsersIcon, plan: SubscriptionPlan.PRO },
  { name: 'E-Commerce', icon: ShoppingCartIcon, plan: SubscriptionPlan.BUSINESS },
  { name: 'Faq', icon: QuestionMarkCircleIcon, plan: SubscriptionPlan.HOBBY },
  { name: 'Upgrade', icon: ArrowUpIcon, plan: SubscriptionPlan.HOBBY },
];

export const MOCK_TASKS: Task[] = [
  { id: '1', text: 'Annaffiare i pomodori', completed: false, priority: 'Alta' },
  { id: '2', text: 'Controllare la presenza di parassiti sulle zucchine', completed: true, priority: 'Media' },
  { id: '3', text: 'Fertilizzare le melanzane', completed: false, priority: 'Media' },
  { id: '4', text: 'Rimuovere le erbacce dall\'aiuola delle carote', completed: false, priority: 'Bassa' },
  { id: '5', text: 'Preparare il terreno per la semina degli spinaci', completed: false, priority: 'Alta' },
];
