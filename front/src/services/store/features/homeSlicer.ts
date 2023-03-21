import {createSlice} from '@reduxjs/toolkit'
import product from '../../../assets/images/product.jpg'
export interface iProduct {filename:string,_id:number,price:number
    ,product_name:string,quantity:number,liked:boolean}

    export interface iSavedProduct  extends iProduct {count:number,saved:boolean}
    export interface AllPages {[key:number]:iProduct[]}
    export interface iInitial {
        all_pages:AllPages,current_page:iProduct[] |null,
        likes:number[],savedProducts:iSavedProduct[][],saved:number[],
        page:number
    }

let initials:iInitial={
    all_pages:[
     
    ]
    ,current_page:[]
    ,likes:[],saved:[],savedProducts:[],page:1

}
export const homeSlicer:any=createSlice({
    name:'Products',
    initialState:initials,
    reducers:{
        setProducts:(state,action)=>{
            state.all_pages[action.payload.page]=action.payload.data
            state.page=action.payload.page
        },
   
        setLike:(state,action)=>{

            if(!state.likes.includes(action.payload)) {
                state.all_pages[state.page]?.forEach(ele=>{
                    if(ele._id === action.payload) {
                        ele.liked=true
                    }
                })
                state.likes.push(action.payload)
                
            }
        },
        setUnlike:(state,action)=>{
            if(state.likes.includes(action.payload)) {
                let newLikes=state.likes.filter(ele=>ele!==action.payload)
                 state.all_pages[state.page]?.forEach(ele=>{
                    if(ele._id === action.payload) {
                        ele.liked=false
                    }
                })
                state.likes=newLikes
            }
        },
        addToCart:(state,action)=>{
            if (!state.saved.includes(action.payload._id)) {

                let entered=false
                state.saved.push(action.payload._id)
                state.savedProducts.map (ele=>{
                    if (ele.length <=10) {
                        ele.push({...action.payload})
                        entered=true
                    }
                })
                if (!entered) {
                    state.savedProducts.push([{...action.payload}])
                }
            }
           
        },
        
        addOne:(state,action)=>{

                let product= state.savedProducts[state.page-1]
                .filter(ele=>ele._id ===action.payload)[0]
        
                if (product && product.count +1 <= product.quantity) {
                    product.count +=1
                }
            
            
        },
        subOne:(state,action)=>{

                let product= state.savedProducts[state.page-1]
                .filter(ele=>ele._id ===action.payload)[0]
                if (product && product.count -1 >=0) {
                    product.count -=1
                }
            
        },
        setCurrentPage:(state,action)=>{
            state.page=action.payload
        },
        removeFromCart:(state,action)=>{
          state.savedProducts[state.page-1]= state.savedProducts[state.page-1].filter(ele=>ele._id !==action.payload)
          state.saved=state.saved.filter(ele=> ele !== action.payload)
        }
        
    }
})
export const {setLike,setProducts
    ,setUnlike,addOne,addToCart,subOne,
    setCurrentPage
}=homeSlicer.actions
export default homeSlicer.reducer