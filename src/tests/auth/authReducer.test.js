//const state = {
//   name: Paola,
// logged: true
//}

const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe('Pruebas en authReducer', () => {

     test('debe de retornar el estado por defecto ', () => {
          const state = authReducer({logged: false}, {}); 
          expect (state).toEqual({logged: false});
     }); 

     test('debe de autenticar y colocar el name del usuario', () => {
     const action= {
          type: types.login, 
          payload: {
               name: 'Paola'
          }
     }      

          const state = authReducer({logged: false},action); 
          expect (state).toEqual({
               logged: true, 
               name: 'Paola'
          });
     }); 

     test('debe de borrar el name drl usuario y logget en false', () => {
          const action= {
               type: types.logout
          }      
     
               const state = authReducer({
                    logged: true, 
                    name: 'Paola'
               },action); 
               expect (state).toEqual({logged: false});
     }); 
     
     
})
