 
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const clearUser = () => ({
    type: 'CLEAR_USER',
  });
  
  export const changeColor = (color) => ({
    type: 'CHANGE_COLOR',
    payload: color,
  });
  export const setActiveSection = (section) => {
    return {
      type: 'SET_ACTIVE_SECTION',
      payload: section,
    };
  };
 