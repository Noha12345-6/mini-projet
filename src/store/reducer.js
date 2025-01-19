const initialState = {
    user: {
      nom: '',
      prenom: '',
      age: '',
      admin: false,
      MotDePasse: '',
      pseudo: '',
      couleur: '',
      Devise: '',
      Pays: '',
      avatar: '',
      email: '',
      photo: '', 
      id: '',
    },
    activeSection: null
  };
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: { ...state.user, ...action.payload } };
      case 'CLEAR_USER':
        return initialState;
      case 'CHANGE_COLOR':
        return { ...state, user: { ...state.user, couleur: action.payload } };
        case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload,}
      default:
        return state;
    }
  };
  
  export default userReducer;
  