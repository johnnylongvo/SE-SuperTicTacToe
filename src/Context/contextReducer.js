export default function contextReducer(state, action) {
    switch (action.type) {
      case "SET":
        return {
            ...state,...action.payload
        };
        
        case "RESET":
            
        return {
            ...state
        };
  
    //   case "GET":
    //     return {
    //        state
    //     };
  
      default:
        return state;
    }
  };