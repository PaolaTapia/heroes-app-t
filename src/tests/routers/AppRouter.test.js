import { mount } from 'enzyme';
import React from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';


describe('pruebas en AppRouter', () => {
const contextValue={
      dispatch: jest.fn(), 
      user: {
           logged: false
      }
}

     test('debe de mostrar el login si no está autenticado ', () => {
          const wrapper= mount(
               <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
               </AuthContext.Provider>
          ); 

          expect(wrapper).toMatchSnapshot(); 
     }); 
     test('debe de mostrar el componente marvel si está autenticado', () => {
          const contextValue={
               dispatch: jest.fn(), 
               user: {
                    logged: true, 
                    name: 'Paola'
               }
         }


          const wrapper= mount(
               <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
               </AuthContext.Provider>
          ); 
          
          expect(wrapper.find('.navbar').exists()).toBe(true); 
     }); 
     
     
})
