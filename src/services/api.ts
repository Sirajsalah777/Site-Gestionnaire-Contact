import axios from 'axios';
import type { Contact, ApiResponse } from '../types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchContacts = async (): Promise<ApiResponse<Contact[]>> => {
  try {
    const response = await api.get('/contacts');
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const createContact = async (contact: Contact): Promise<ApiResponse<Contact>> => {
  try {
    const response = await api.post('/contacts', contact);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

export const updateContact = async (contact: Contact): Promise<ApiResponse<Contact>> => {
  try {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

export const deleteContact = async (id: number): Promise<ApiResponse<void>> => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};