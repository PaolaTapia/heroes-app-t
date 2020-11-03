import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en HeroScreen', () => {
     const historyMock={
          length: 10, 
          push: jest.fn(),
          goBack: jest.fn()

     }
     const wrapper=mount(
          <MemoryRouter initialEntries={['/hero']}>
               <HeroScreen history={historyMock}/>
          </MemoryRouter>
     ); 

     test('Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
         expect(wrapper.find('Redirect').exists()).toBe(true); 
     }); 
     
     test('debe de mostrar un hero si el parametro existe y se encuentra', () => {
          const wrapper= mount(
          <MemoryRouter initialEntries={['/hero/marvel-spider']}>
          <Route path="/hero/:heroeId" component={HeroScreen}/>          
          </MemoryRouter>
          );     
          expect(wrapper.find('.row').exists()).toBe(true); 
     });

     test('debe de regresar a la pantalla anterior con PUSH', () => {
          const historyMock = {
               length: 1, 
               push: jest.fn(),
               goBack: jest.fn()
          }

          const wrapper= mount(
               <MemoryRouter initialEntries={['/hero/marvel-spider']}>
               <Route
                path="/hero/:heroeId"
                component={(props) => <HeroScreen history={historyMock}/> 
                }
                />          
               </MemoryRouter>
               );     
               wrapper.find('button').prop('onClick')(); 

               expect(historyMock.push).toHaveBeenCalledWith('/'); 
               expect(historyMock.goBack).not.toHaveBeenCalled(); 

     }); 
     
       test('debe de regresar a la pantalla anterior GOBACK', () => {
          const historyMock = {
               length: 3, 
               push: jest.fn(),
               goBack: jest.fn()
          }

          const wrapper= mount(
               <MemoryRouter initialEntries={['/hero/marvel-spider']}>
               <Route
                path="/hero/:heroeId"
                component={(props) => <HeroScreen history={historyMock}/> 
                }
                />          
               </MemoryRouter>
               );     
               wrapper.find('button').prop('onClick')(); 

               expect(historyMock.goBack).toHaveBeenCalled(); 
               expect(historyMock.push).toHaveBeenCalledTimes(0); 

     }); 

     test('debe de llamar el REDIRECT si el hero no existe ', () => {

          const wrapper= mount(
               <MemoryRouter initialEntries={['/hero/m5584der']}>
               <Route
                path="/hero/:heroeId"
                component={(props) => <HeroScreen history={historyMock}/> 
                }
                />          
               </MemoryRouter>
               ); 

               expect(wrapper.text()).toBe(''); 
          
     })
     
     
})
