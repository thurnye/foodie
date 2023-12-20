
import { createContext, useContext} from 'react';
import { getRandomInt } from '../util/commons';

export const defaultEventForm = {
    eventDetails : {
      eventTitle: '',
      location: '',
      isOnline: false,
      isFree: false,
      repeat: false,
      frequency: 'weekly',
      thumbnail: '',
      eventDescription: '',
      addFAQs: false,
      starts: new Date(),
      ends:'',
      fAQs:[{
        ques: "",
        ans: "",
      }], //{question:'', answer: ''}
      organiserName: '',
      organiserDescription: '',
      includeLinks: false, //links to the event
    },
    tickets : [
        {
          ticketName : 'Early Bird',
          quantity: 1,
          price: 1,
          ticketDescription: '',
          showDescriptionOnEventPage: true, //default false
          onlineSales: true,
          doorSales: true,
          starts: '',
          ends: '',
          ticketVisibility: true,  // false, hide ticket when max is reached,
          autoHideDate:'',
          ticketsPerOrder: {
            min: 1,
            max: 10
          }
        },
        {
          sortId: getRandomInt(),
          ticketName : 'General Assembly',
          quantity: 1,
          price: 1,
          ticketDescription: '',
          showDescriptionOnEventPage: true, //default false
          onlineSales: true,
          doorSales: true,
          starts: '',
          ends: '',
          ticketVisibility: true,  // false, hide ticket when max is reached,
          autoHideDate:'',
          ticketsPerOrder: {
            min: 1,
            max: 10
          }
        },
        {
          sortId: getRandomInt(),
          ticketName : 'VIP',
          quantity: 1,
          price: 1,
          ticketDescription: '',
          showDescriptionOnEventPage: true, //default false
          onlineSales: true,
          doorSales: true,
          starts: '',
          ends: '',
          ticketVisibility: true,  // false, hide ticket when max is reached,
          autoHideDate:'',
          ticketsPerOrder: {
            min: 1,
            max: 10
          }
        },
        
      ],
    additionalSettings: { 
    currency: {
      "label": "US Dollar - USD",
      "symbol": "$",
      "currency": "US Dollar"
    }}
}

const formSteps = ['Event Details', 'Create Ticket', 'Additional Settings'];

export const AddEventFormContext = createContext({
  eventForm: defaultEventForm,
  setEventForm: (form) => form,
  currentFormStep: 'Event Details',
  formSteps,
  setCurrentFormStep: (step) => step
    
})



export const useAddEventFormContext = () => useContext(AddEventFormContext)