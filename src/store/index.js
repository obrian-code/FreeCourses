import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  
  state: {
    courses:[],
  },

  mutations: {
    
    SET_POSTS(state, coursesAcction) { //ENVIAR LOS VALORES A OBTENIDOS A LA VARIABLE COURSES
          state.courses = coursesAcction
    },

  },

  actions: {

    //OBTENER LOS CURSOS DE LA API REST

    obtenerCouses: async function({ commit }){

        const response = 
        await axios.get('https://freecourses-node-production.up.railway.app/courses')

              if(response.status==200){//VERFICAR SI RESPONDIO LA API REST BIEN
                commit('SET_POSTS',response.data) //ENVIA LOS VALORES OBTENIDOS A LA VARIABLE COURSE
              }else{// SI PRODUCE UN ERROR SE IMPRIME EN CONSOLA
                console.log(response);
              }
              // console.log("object",process.env.API);
    },

//AGREGAR UN CURSO EN LA  API REST

    addCourses:async function( { commit },new_Courses) {

          const response = await axios.post(`https://freecourses-node-production.up.railway.app/courses`,new_Courses)

              if(response.status==200){//VERFICAR SI RESPONDIO LA API REST BIEN
                  const obtener = await axios.get('https://freecourses-node-production.up.railway.app/courses')//SE VUELE PEDIR DE NUEVO LOS DATOS   
                  commit('SET_POSTS',obtener.data)//ENVIA LOS VALORES OBTENIDOS A LA VARIABLE COURSE  
              }else{// SI PRODUCE UN ERROR SE IMPRIME EN CONSOLA
                  console.log(response);
              }
                
    },

//ACTULIZAR UN CURSO EN LA  API REST
    putCourses:async function( { commit },new_Courses) {

        const response = await axios.put('https://freecourses-node-production.up.railway.app/courses',new_Courses)

            if(response.status==200){//VERFICAR SI RESPONDIO LA API REST BIEN
                const obtener = await axios.get('https://freecourses-node-production.up.railway.app/courses') //SE VUELE PEDIR DE NUEVO LOS DATOS    
                commit('SET_POSTS',obtener.data)//ENVIA LOS VALORES OBTENIDOS A LA VARIABLE COURSE 
            }else{// SI PRODUCE UN ERROR SE IMPRIME EN CONSOLA
                console.log(response);
            }
        
    },
//ELIMINAR UN CURSO EN LA  API REST
    deleleteCourses:async function( { commit },id) {
// https://freecourses-node-production.up.railway.app/courses
      const response = await axios.delete(`https://freecourses-node-production.up.railway.app/courses/?id=${id}`)

          if(response.status==200){//VERFICAR SI RESPONDIO LA API REST BIEN
            const obtener = await axios.get('https://freecourses-node-production.up.railway.app/courses') //SE VUELE PEDIR DE NUEVO LOS DATOS    
            commit('SET_POSTS',obtener.data)//ENVIA LOS VALORES OBTENIDOS A LA VARIABLE COURSE 
          }else{// SI PRODUCE UN ERROR SE IMPRIME EN CONSOLA
            console.log(response);
          }  

    }

  },
  
})



