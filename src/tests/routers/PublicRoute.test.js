import React from 'react';
import { mount } from 'enzyme';
import { PublicRoute } from '../../routers/PublicRoute';
import { MemoryRouter } from 'react-router-dom';

describe('pruebas en  PublicRoute', () => {
     const props ={
          location: {
               pathname: '/'
          }
     }


     Storage.prototype.setItem=jest.fn(); 

     test('debe de mostrar el componente si está autenticado y guardar localStorage', () => {

          const wrapper = mount(
            <MemoryRouter>
              <PublicRoute
                isAuthenticated={false}
                component={() => <span>Listo!</span>}
                {...props}
              />
            </MemoryRouter>
          ); 
          
          expect(wrapper.find('span').exists()).toBe(true); 
 
     });     
     
     test('debe de bloquear el componente si no está autenticado ', () => {

          
          const wrapper = mount(
               <MemoryRouter>
                 <PublicRoute
                   isAuthenticated={true}
                   component={() => <span>Listo!</span>}
                   {...props}
                 />
               </MemoryRouter>
             ); 
             
             expect(wrapper.find('span').exists()).toBe(false); 
        
     });     
     
})