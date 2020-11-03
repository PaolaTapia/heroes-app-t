import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

describe('Pruebas en Navbar', () => {

     const historiMock = {
          push: jest.fn(),
          replace: jest.fn(),
          listen: jest.fn(),
          createHref: jest.fn(),
          location: {},
     }
     const contextValue={
          dispatch: jest.fn(), 
          user: {
               logged: true, 
               name: 'Paola'
          }
    }

    const wrapper = mount(         
     <AuthContext.Provider value={contextValue}>
          <MemoryRouter>
               <Router history={historiMock}>
                    <Navbar />
               </Router>
          </MemoryRouter>
     </AuthContext.Provider>     
    ); 
    afterEach(() => {
         jest.clearAllMocks(); 
    }
    ); 

     test('debe de mostrarse correctamente', () => {
          expect(wrapper).toMatchSnapshot(); 
          expect((wrapper).find('.text-info').text().trim()).toBe('Paola'); 
     }); 

     test('debe de llamar el logout y usar history', () => {
          wrapper.find('button').prop('onClick')(); 
          expect(contextValue.dispatch).toHaveBeenCalledWith({
               type: types.logout,
               payload: {
                 name: ''
               }
          }); 

          expect(historiMock.replace).toHaveBeenCalledWith('/login'); 

     }); 
     
     
})
